import express from "express";
import http from "http";
import mongoose from "mongoose";
import userRoutes from "./src/routes/userRoutes.js";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import chatController from "./src/controller/chatController.js";
const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
const server = http.createServer(app);
const io = new SocketIOServer(server);

chatController(io);

mongoose
  .connect("mongodb://127.0.0.1:27017/chat-app")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", userRoutes);

const port = 3033;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
