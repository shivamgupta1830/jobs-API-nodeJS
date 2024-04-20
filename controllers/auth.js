const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, user: { name: user.name }, token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

//Login

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Provide all credentials!" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found!" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Password not matched" });
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

module.exports = { register, login };
