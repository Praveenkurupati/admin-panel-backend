const jwt = require("jsonwebtoken");

exports.generateToken = (userId, roleId) => {
  return jwt.sign({ userId, roleId }, "12345", {
    expiresIn: "1h",
  });
};
