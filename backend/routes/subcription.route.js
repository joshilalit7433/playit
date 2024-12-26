import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createSubscription,
  getAllSubscriptions,
} from "../controllers/subcription.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createSubscription);
router.route("/get-all-subscription").get(isAuthenticated, getAllSubscriptions);

export default router;
