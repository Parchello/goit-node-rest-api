const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const authRouter = require("./routes/authRouter.js");
const contactsRouter = require("./routes/contactsRouter.js");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
dotenv.config();

const { DB_HOST, PORT } = process.env;
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connect success");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
