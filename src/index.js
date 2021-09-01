require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 4000;

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

// app.use((req, res, next) => {
//   res.status(503).send("Maintenance mode...");
// });

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "fakeId" }, "thisismysigningstring", { expiresIn: "7 days" });
//   console.log(token);

//   const data = jwt.verify(token, "thisismysigningstring");
//   console.log(data);
// };

// myFunction();

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("611a6e489b2c67382eceab02");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("611a6d6dc1e78037d3b6046d");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();
