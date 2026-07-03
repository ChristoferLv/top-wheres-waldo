import { prisma } from "../lib/prisma.js";
import jwt from 'jsonwebtoken';


async function listMaps(req, res) {
    try {
        const maps = await prisma.maps.findMany();
        return res.status(200).json({
            success: true,
            data: maps
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ success: false });
    }
}

async function startGame(req, res) {
    const mapId = parseInt(req.params.mapId);
    const charactersOnMap = await prisma.character_on_map.findMany({ where: { mapId: mapId }, select: { character: true } });
    const jwtStates = {};
    const clientStates = [];
    for (const character of charactersOnMap) {
        clientStates.push({ ...character.character, found: false });
        jwtStates[character.character.name] = false;
    }

    try {
        const payload = {
            time: Date.now(),
            map: mapId,
            characters: jwtStates
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            characters: clientStates,
            token: `Bearer ${token}`
        });
    } catch (err) {
        res.status(500).send({ success: false });
        console.log(err)
    }
}

async function makeGuess(req, res) {
    try {
        const mapId = parseInt(req.user.map);
        const { coords, characterId } = req.body;
        const mapData = await prisma.character_on_map.findUnique({ where: { mapId_characterId: { mapId: mapId, characterId: parseInt(characterId) } }, include: { character: true } });
        const selectedBBox = mapData.coords;
        if (selectedBBox.tlx <= coords.x && coords.x <= selectedBBox.brx && selectedBBox.tly <= coords.y && coords.y <= selectedBBox.bry) {
            const newState = { ...req.user, characters: { ...req.user.characters, [mapData.character.name]: true } };
            const token = jwt.sign(newState, process.env.JWT_SECRET);
            const finished = Object.values(newState.characters).every((char) => char);
            res.status(200).send({ success: true, hit: true, token: `Bearer ${token}`, finished: finished, boundingBox: selectedBBox });
        } else {
            res.status(200).send({ success: true, hit: false });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ success: false });
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