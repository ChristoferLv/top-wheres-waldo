import { Router } from "express";
import { passport } from "../authUtils.js";
import { getLeaderboardForMap, saveOnLeaderboard } from "../controllers/leaderboardController.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/:mapId", getLeaderboardForMap);
leaderboardRouter.post("/", passport.authenticate('jwt', { session: false }), saveOnLeaderboard);

export default leaderboardRouter;