import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import objectRouter from "./object/index.js";
import todoRouter from "./toDo/index.js";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Server opened"));

app.use(cors());

app.use(express.json({ extended: true }));

/** 라우터 집합 */
app.use("/api/object", objectRouter);
app.use("/api/todo", todoRouter);
/** 라우터 집합 */

const port = 8080;
const handleListen = () => console.log(`start server`);
app.listen(port, handleListen);
