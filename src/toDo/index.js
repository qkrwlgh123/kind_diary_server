import express from "express";
import { handleAddTodo } from "./add.js";
import { handleCompleteTodo } from "./complete.js";

const todoRouter = express.Router();

todoRouter.post("/add", handleAddTodo);

todoRouter.put("/complete", handleCompleteTodo);

export default todoRouter;
