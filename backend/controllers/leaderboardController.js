import { prisma } from "../lib/prisma.js";

async function saveOnLeaderboard(req, res) {
    try {
        const { username } = req.body;
        const foundAll = Object.values(req.user.characters).every((status) => status == true);
        if (!foundAll) {
            return res.status(401).send({ success: false, message: "You havent finished the game!" });
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
        res.status(200).send({ success: true, data: result });
    } catch (e) {
        console.log(e);
        res.status(500).send({ success: false });
    }
}

async function getLeaderboardForMap(req, res) {
    const mapId = parseInt(req.params.mapId);
    try {

        const result = await prisma.leaderboard.findMany({
            where: { mapId: mapId },
            orderBy:{time:"asc"}
        });
        res.status(200).send({ success: true, data: result });
    } catch (e) {
        console.log(e);
        res.status(500).send({ success: false });
    }
}



export {
    saveOnLeaderboard,
    getLeaderboardForMap
}