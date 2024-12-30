import express from "express";
import { getTurfs, postTurf } from "../controllers/turf.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/postTurf").post(isAuthenticated, postTurf);
router.route("/getTurf").get( getTurfs);


export default router;
