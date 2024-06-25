import express from "express";
import { handleAddObject } from "./add.js";
import { handleObjectList } from "./list.js";

const objectRouter = express.Router();

objectRouter.post("/add", handleAddObject);

objectRouter.post("/list", handleObjectList);

export default objectRouter;
