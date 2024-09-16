const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/config");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const itemRoutes = require("./src/routes/itemRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

dotenv.config();
connectToDatabase("Admin_Panel");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/profiles", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
