const { User, Food, Reminder } = require("../../models");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

// TODO USER LOGIN
async function postLoginHandler(req, res) {
  const { email, password } = req.body;

  const {
    accessTokenSecret: accessSecret,
    refreshTokenSecret: refreshSecret,
    accessTokenLife: accessExpiresIn,
    refreshTokenLife: refreshExpiresIn,
  } = config.jwt;

  try {
    const response = await User.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: Food,
        },
      ],
    });

    // if (!response.Food || response.Food.length === 0) {
    //   return res.status(404).json({
    //     error: true,
    //     msg: "No food items found for the user",
    //   });
    // }

    const Match = await bcrypt.compare(password, response.password);
    if (!Match)
      return res
        .status(400)
        .json({ error: true, msg: "Password doesn't match" });

    const payloadUser = {
      user_id: response.user_id,
      email: response.email,
      username: response.username,
    };

    const accessToken = jwt.sign(payloadUser, accessSecret, {
      expiresIn: accessExpiresIn,
    });

    const refreshToken = jwt.sign(payloadUser, refreshSecret, {
      expiresIn: refreshExpiresIn,
    });

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          user_id: response.user_id,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.json({
      error: false,
      msg: "Login success",
      loginResult: {
        user_id: response.user_id,
        username: response.username,
        token: accessToken,
        food: response.Food,
      },
    });
    
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: true, msg: `User with email : ${email} not found` });
  }
}

// TODO USER LOGOUT
async function getLogoutHandler(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(403).json({ error: true, msg: "Please login first" });
  try {
    const singleUser = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!singleUser)
      return res.status(403).json({ error: true, msg: "User not found" });
    await User.update(
      { refresh_token: null },
      {
        where: {
          user_id: singleUser.user_id,
        },
      }
    );

    res.clearCookie("refreshToken");

    res.status(200).json({ error: false, msg: "Logout Success" });
  } catch (error) {
    console.log(error.message);
  }
}

// TODO GENERATE ACCESS TOKEN
async function generateAccessTokenHandler(req, res) {
  try {
    const {
      accessTokenSecret: accessSecret,
      refreshTokenSecret: refreshSecret,
      accessTokenLife: accessExpiresIn,
    } = config.jwt;

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(403).json({ error: true, msg: "Please login first" });

    const singleUser = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!singleUser)
      return res.status(404).json({ error: true, msg: "User not found" });

    const payloadUser = {
      user_id: singleUser.user_id,
      email: singleUser.email,
    };

    jwt.verify(refreshToken, refreshSecret, (err, decode) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(payloadUser, accessSecret, {
        expiresIn: accessExpiresIn,
      });

      res.json({ error: false, accessToken: accessToken });
    });
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
    postLoginHandler,
    generateAccessTokenHandler,
    getLogoutHandler,
};