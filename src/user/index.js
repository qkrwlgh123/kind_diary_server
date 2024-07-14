import express from "express";
import { handleCreateUser } from "./create.js";
import { handleLoginUser } from "./login.js";
import { handleValidateToken } from "./validate.js";

const userRouter = express.Router();

userRouter.post("/create", handleCreateUser);
userRouter.post("/login", handleLoginUser);
userRouter.post("/validate", handleValidateToken);

export default userRouter;
