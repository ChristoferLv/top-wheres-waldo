import { Router } from "express"
import { listMaps, makeGuess, startGame } from "../controllers/mapsController.js";
import { passport } from "../authUtils.js";


const mapsRouter = Router();

mapsRouter.get("/", listMaps)
mapsRouter.get("/:mapId/start", startGame)
mapsRouter.post("/:mapId/guess",passport.authenticate('jwt', { session: false }), makeGuess)




export default mapsRouter;