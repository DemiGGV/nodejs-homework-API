const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth.route");
const contactsRouter = require("./routes/api/contacts.route");
const { HttpError } = require("./helpers");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

// Error handler
app.use((req, res, next) => {
  next(HttpError(404));
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
