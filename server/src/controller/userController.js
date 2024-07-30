import userSchema from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      name: user.name,
    },
    "secretkey"
  );

  res.status(200).json({
    message: "User successfully login",
    status: "success",
    token: token,
  });
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find(); 
    res.status(200).json({
      message: "Users fetched successfully",
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      status: "error",
      error: err.message,
    });
  }
};