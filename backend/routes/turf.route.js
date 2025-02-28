import express from "express";
import {
  getTurfs,
  postTurf,
  getPendingTurfs,
  getTurfById,
  approveTurf,
  rejectTurf,
} from "../controllers/turf.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/postTurf").post(postTurf);
router.route("/getTurf").get(getTurfs);
router.route("/getPendingTurfs").get(getPendingTurfs);
router.route("/turf/:id").get(getTurfById);
router.route("/approveTurf/:id").patch(approveTurf);
router.route("/rejectTurf/:id").delete(rejectTurf);

export default router;
