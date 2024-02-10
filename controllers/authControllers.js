const dotenv = require("dotenv");
const {
  registerSchema,
  loginSchema,

  User,
} = require("../schemas/usersSchemas.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();
const HttpError = require("../helpers/HttpError.js");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Ivalid password or email");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Ivalid password or email");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({ token, email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Loggout success" });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
