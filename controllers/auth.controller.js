const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const gravatar = require("gravatar");
const { HttpError, ctrlWrap, imageResize } = require("../helpers");
const { User } = require("../models/user.model");

const { SECRET_KEY } = process.env;
const avatarsPath = path.join(__dirname, "../", "public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {
    protocol: "https",
    s: "250",
    d: "robohash",
  });
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      password,
      avatarURL,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  if (user.token) throw HttpError(422, "Already logined");

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw HttpError(401, "Email or password is wrong");

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      password,
    },
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.json({ email, subscription });
};

const updAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await imageResize(tempUpload);
  const newFileName = `${_id}_${originalname}`;
  const avatarUploadPath = path.join(avatarsPath, newFileName);
  await fs.rename(tempUpload, avatarUploadPath);

  const avatarURL = path.join("avatars", newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = {
  signup: ctrlWrap(signup),
  signin: ctrlWrap(signin),
  signout: ctrlWrap(signout),
  getCurrent: ctrlWrap(getCurrent),
  updSubscription: ctrlWrap(updSubscription),
  updAvatar: ctrlWrap(updAvatar),
};
