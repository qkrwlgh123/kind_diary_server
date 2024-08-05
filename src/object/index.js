import express from "express";
import { handleAddObject } from "./add.js";
import { handleObjectList } from "./list.js";
import { handleUpdateObjectName } from "./update.js";
import { handleDeleteObject } from "./delete.js";

const objectRouter = express.Router();

objectRouter.post("/add", handleAddObject);

objectRouter.patch("/update", handleUpdateObjectName);

objectRouter.delete("/delete", handleDeleteObject);

objectRouter.get("/list", handleObjectList);

export default objectRouter;
