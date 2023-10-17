const express = require("express");
const { userModel } = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();


//signup route
userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const users = await userModel.findOne({ email });

  if (users) {
    res.send("Already have Account");
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send(err);
      } else {
        const newUser = new userModel({ ...req.body, password: hash });
        await newUser.save();
        res.send("signip Successfull");
      }
    });
  }
});

//login route

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = jwt.sign(
          { name: user.name, userId: user._id },
          "password",
          { expiresIn: "7d" }
        );
        res.send({ mag: "Login Successfull", token });
      } else {
        res.send(err);
      }
    });
  } else {
    res.send("wrong credentials");
  }
});
