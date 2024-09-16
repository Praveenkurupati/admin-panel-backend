const User = require("../models/userModel");

exports.getProfiles = async (req, res) => {
  const profiles = await User.find({ roleId: "employee" });
  res.status(200).json(profiles);
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!profile || profile.roleId !== "employee")
    return res.status(404).json({ message: "Profile not found" });
  res.status(200).json({ message: "Profile updated", profile });
};
