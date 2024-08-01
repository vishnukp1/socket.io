import userSchema from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chatModel from "../model/chatModel.js";
import cloudinary from "../config/couldinary.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userSchema({
    username: username,
    email: email,
    password: hashedPassword,
  });

  await user.save();
  res.status(200).json({
    message: "Successfully user registered",
    status: "success",
    data: user,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    res.status(400).json("user is not available");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json("Invalid Password");
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    "secretkey"
  );

  res.status(200).json({
    message: "User successfully login",
    status: "success",
    token: token,
    ownerId: user._id,
  });
};

  export const getAllUsers = async (req, res) => {
    const loggedUser = req.userId;

    const users = await userSchema.find();
  
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastChat = await chatModel
          .findOne({
            $or: [
              { $and: [{ sender: loggedUser }, { receiver: user._id }] },
              { $and: [{ sender: user._id }, { receiver: loggedUser }] },
            ],
          })
          .sort({ createdAt: -1 });
  
        return {
          ...user._doc,
          lastMessage: lastChat ? lastChat.text : "Say Hi",
          lastMessageDate: lastChat ? lastChat.createdAt : null,
        };
      })
    );
  
    res.status(200).json({
      message: "Users fetched successfully",
      status: "success",
      data: usersWithLastMessage,
    });
  };


  export const uploadProfilePhoto = async (req, res) => {
   
      const  userId  = req.params.userId;
      const file = req.file;

     
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${userId}_profile`, 
      });
      console.log("file",cloudinary.uploader.upload);

      const imageUrl = result.secure_url;
  
   
      await userSchema.findByIdAndUpdate(userId, { image: imageUrl });
  
      res.status(200).json({
        message: 'Profile photo updated successfully',
        status: 'success',
        data: { image: imageUrl },
      });
    } 
