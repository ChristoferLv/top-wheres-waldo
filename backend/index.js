import 'dotenv/config';
import { join } from "node:path";
import express, { json, urlencoded } from "express";
import { passport } from "./authUtils.js";
import { prisma } from "./lib/prisma.js";
import cors from 'cors'
const dir = import.meta.dirname;
const assetsPath = join(dir, "public");

import jwt from 'jsonwebtoken';



const app = express();
app.set("views", join(dir, "views"));
app.use(express.static(assetsPath));
app.use(json());

const corsOptions = {
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  try {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url || req.originalUrl || 'unknown';
    console.log(`📝 ${timestamp} - ${method} ${url}`);
    console.log("   └req.body ->", req.body)
    //console.log(req.headers.cookie)
    next();
  } catch (error) {
    console.error("❌ Erro no middleware de log:", error);
    next(); // Continue mesmo com erro no log
  }
});

app.get("/maps", async (req, res) => {
  const maps = await prisma.maps.findMany();
  return res.status(200).json({
    success: true,
    data: maps
  });
})

async function startGame(req, res) {
  try {
    const payload = {
      time: Date.now(),
      map: 1,
      characters: {
        "Wenda": false,
        "Woof": false,
        "Wizard": false,
        "Odlaw": false
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      success: true,
      token: `Bearer ${token}`
    });
  } catch (err) {
    console.log(err)
  }
}

app.get("/start/:mapId", async (req, res) => {
  startGame(req, res);
})

const boxes = [{ id: 0, name: "Waldo", found: false, tlx: 498, tly: 222, brx: 511, bry: 243 },
{ id: 1, name: "Wenda", found: false, tlx: 624, tly: 240, brx: 633, bry: 253 },
{ id: 2, name: "Woof", found: false, tlx: 550, tly: 221, brx: 558, bry: 228 },
{ id: 3, name: "Wizard", found: false, tlx: 220, tly: 206, brx: 233, bry: 225 },
{ id: 4, name: "Odlaw", found: false, tlx: 92, tly: 208, brx: 102, bry: 229 }];

app.post("/leaderboard/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { username } = req.body;
  const foundAll = Object.values(req.user.characters).every((status) => status == true);
  if (!foundAll) {
    return res.send({ success: false, message: "You havent finished the game!" });
  }
  const startTime = req.user.time;
  const endTime = Date.now();
  const seconds = Math.floor((endTime - startTime) / 1000);
  const result = await prisma.leaderboard.create({
    data: {
      username: username,
      time: seconds,
      mapId: req.user.map
    }
  });
  res.send({ success: true, data: result });
});


app.get("/level/:id", (req, res) => {
  res.send({
    success: true, data: {
      boxes: boxes
    }
  });
});

app.post("/level/:id/guess", passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.user, "req user");
  const levelId = parseInt(req.params.id);
  const { coords, character } = req.body;
  const levelData = await prisma.character_on_map.findFirst({ where: { mapId: levelId, character: { name: character } }, include: { character: true } });
  console.log(levelData)
  // return res.send({ success: true, hit: false })
  const selectedBBox = levelData.coords;
  console.log(selectedBBox)
  if (selectedBBox.tlx <= coords.x && coords.x <= selectedBBox.brx && selectedBBox.tly <= coords.y && coords.y <= selectedBBox.bry) {
    console.log("hit")
    const newState = { ...req.user, characters: { ...req.user.characters, [character]: true } };
    const token = jwt.sign(newState, process.env.JWT_SECRET);
    const finished = Object.values(newState.characters).every((char) => char);
    res.send({ success: true, hit: true, token: `Bearer ${token}`, finished: finished, boundingBox: selectedBBox });
  } else {
    console.log("miss")
    res.send({ success: true, hit: false });
  }
});

app.use((err, req, res, next) => {
  console.log("******Global error midleware******")
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  console.log(err)
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
  console.log("http://localhost:3000");
});






// console.log(req.headers.authorization)
// var decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
// console.log(decoded) // bar