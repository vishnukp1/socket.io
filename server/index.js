import dotenv from 'dotenv';
import express from "express";
import http from "http";
import mongoose from "mongoose";
import userRoutes from "./src/routes/userRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js"
import { Server as SocketIOServer } from 'socket.io';
import cors from "cors";
import morgan from "morgan";

const app = express();

dotenv.config();

app.use(cors());
 
app.use(morgan("dev"));
app.use(express.json());
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('send_message', (data) => {
    io.to(data.receiver).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


mongoose
  .connect("mongodb://127.0.0.1:27017/chat-app")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
 
app.use("/", userRoutes);
app.use('/', chatRoutes);

server.listen(3033, () => {
  console.log('Server is running on port 3033');
});