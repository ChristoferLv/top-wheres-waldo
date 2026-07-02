import { prisma } from "../lib/prisma.js";
import jwt from 'jsonwebtoken';


async function listMaps(req, res) {
    const maps = await prisma.maps.findMany();
    return res.status(200).json({
        success: true,
        data: maps
    });
}

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

async function makeGuess(req, res) {
    console.log(req.user, "req user");
    const levelId = parseInt(req.params.mapId);
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
}

export {
    listMaps,
    startGame,
    makeGuess
}





// console.log(req.headers.authorization)
// var decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
// console.log(decoded) // bar