import chat from "../model/chatModel.js";

export const sendmessage = async (req, res) => {
  console.log(req.body);
  const { sender, receiver, text, replyTo } = req.body;

  const newchat = new chat({ sender, receiver, text, replyTo });
  await newchat.save();

  res
    .status(201)
    .json({ message: "sent message successfully", status: "success" });
};

export const getChatHistory = async (req, res) => {
  const { userId } = req.params;

  const chats = await chat.find({
    $or: [{ sender: userId }, { receiver: userId }],
  });

  res.json({ data: chats, status: "success" });
};
