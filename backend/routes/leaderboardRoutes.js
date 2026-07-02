import { Router } from "express";
import { passport } from "../authUtils.js";
import { saveOnLeaderboard } from "../controllers/leaderboardController.js";

const leaderboardRouter = Router();

leaderboardRouter.post("/", passport.authenticate('jwt', { session: false }), saveOnLeaderboard);

export default leaderboardRouter;