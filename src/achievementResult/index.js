import express from "express";
import { handleGeneralResult } from "./generalResult.js";
import { handleEachObjectsResult } from "./eachObjectsResult.js";

const achievementResultRouter = express.Router();

achievementResultRouter.get("/general", handleGeneralResult);

achievementResultRouter.get("/each", handleEachObjectsResult);

export default achievementResultRouter;
