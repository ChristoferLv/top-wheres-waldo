import { prisma } from "../lib/prisma.js";

async function saveOnLeaderboard(req, res) {
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
}



export{
    saveOnLeaderboard
}