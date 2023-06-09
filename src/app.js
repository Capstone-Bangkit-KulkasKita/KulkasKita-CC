const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./app/user/route");
const authRouter = require("./app/auth/route");
const foodRouter = require("./app/food/route");
const historyRouter = require("./app/history/route");
const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res)=>{
    res.status(200).send("Server is currently running");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/food", foodRouter);
app.use("/history", historyRouter);

module.exports = app;
