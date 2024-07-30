const chatController = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send_message", (data) => {
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default chatController;
