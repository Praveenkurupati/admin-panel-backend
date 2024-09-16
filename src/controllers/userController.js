const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "User updated", user });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "User deleted" });
};
