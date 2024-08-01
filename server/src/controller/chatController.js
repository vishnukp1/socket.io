import chat from "../model/chatModel.js";

export const sendmessage = async (req, res) => {
  const { sender, receiver, text, replyTo } = req.body;

  const newchat = new chat({ sender, receiver, text, replyTo });
  await newchat.save();

  res
    .status(201)
    .json({ message: "sent message successfully", status: "success" });
};

export const getChatHistory = async (req, res) => {
  const userId = req.params.userId;
  const loggedInUser = req.userId;

  const chats = await chat.find({
    $or: [
      { $and: [{ sender: loggedInUser }, { receiver: userId }] },
      { $and: [{ sender: userId }, { receiver: loggedInUser }] },
    ],
  }).populate('replyTo')


  res.json({
    message: "chat history got sucessfully",
    data: chats,
    status: "success",
  });
};
