import express from "express";
import { handleAddTodo } from "./add.js";
import { handleCompleteTodo } from "./complete.js";
import { handleUpdateTodo } from "./update.js";
import { handleDeleteTodo } from "./delete.js";
import { handleUncompleteTodo } from "./unComplete.js";

const todoRouter = express.Router();

todoRouter.post("/add", handleAddTodo);

todoRouter.put("/complete", handleCompleteTodo);

todoRouter.put("/unComplete", handleUncompleteTodo);

todoRouter.put("/update", handleUpdateTodo);

todoRouter.delete("/delete", handleDeleteTodo);

export default todoRouter;
