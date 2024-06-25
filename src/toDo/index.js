import express from "express";
import { handleAddTodo } from "./add.js";

const todoRouter = express.Router();

todoRouter.post("/add", handleAddTodo);

export default todoRouter;
