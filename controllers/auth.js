const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, user: { name: user.name }, token });
};

const login = (req, res) => {
  res.send("user");
};

module.exports = { register, login };
