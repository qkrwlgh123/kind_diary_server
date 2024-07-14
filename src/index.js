import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import objectRouter from "./object/index.js";
import todoRouter from "./toDo/index.js";
import achievementResultRouter from "./achievementResult/index.js";
import userRouter from "./user/index.js";
import handleDecodedToken from "./middlewares/auth.js";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Server opened"));

app.use(cors());

app.use(express.json({ extended: true }));

/** 인증 미들웨어 */
app.use(handleDecodedToken);

/** 라우터 집합 */
app.use("/api/user", userRouter);
app.use("/api/object", objectRouter);
app.use("/api/todo", todoRouter);
app.use("/api/achievement", achievementResultRouter);
/** 라우터 집합 */

const port = 3000;
const handleListen = () => console.log(`start server`);

app.listen(port, handleListen);
