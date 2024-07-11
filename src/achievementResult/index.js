import express from "express";
import { handleGeneralResult } from "./generalResult.js";
import { handleEachObjectsResult } from "./eachObjectsResult.js";

const achievementResultRouter = express.Router();

achievementResultRouter.post("/general", handleGeneralResult);

achievementResultRouter.post("/each", handleEachObjectsResult);

export default achievementResultRouter;
