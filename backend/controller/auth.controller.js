import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password, profileImageUrl, adminJoinCode } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isAlreadyExist = await User.findOne({ email });
  if (isAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  let role = "user";
  if (adminJoinCode === process.env.ADMIN_JOIN_CODE) {
    role = "admin";
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    profileImageUrl,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
