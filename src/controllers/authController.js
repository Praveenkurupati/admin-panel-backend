const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", user);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.roleId);
    res.status(200).json({ token, role: user.roleId });
  } catch (error) {
    console.error("Server error  login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password, roleId } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, roleId });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error durinregistration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await User.findOne({ email, roleId: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin  email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new User({
      name,
      email,
      password: hashedPassword,
      roleId: "admin",
    });

    await adminUser.save();

    const token = generateToken(adminUser._id, adminUser.roleId);

    res.status(201).json({
      message: "Admin registerev successfully!",
      adminUser: {
        id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
        roleId: adminUser.roleId,
      },
      token,
    });
  } catch (error) {
    console.error("Error admin registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
