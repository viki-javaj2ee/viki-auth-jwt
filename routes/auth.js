const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senEmail = require("../utils/sendEmail");

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser)
      return res
        .status(200)
        .send({ success: false, message: "User Already Registered" });

    const password = req.body.password;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    const result = await newuser.save();
    await senEmail(result, "verify-email");
    res
      .status(200)
      .send({ success: true, message: "User Registered Successfully." });
  } catch (err) {
    console.log("Error in auth -- ", error);
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const passwordMatched = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordMatched) {
        const dataToBeSentToFrontend = {
          _id: user.id,
          email: user.email,
          name: user.name,
        };
        const token = jwt.sign(dataToBeSentToFrontend, "VIKI", {
          expiresIn: 60 * 60,
        });
        res.status(200).send({
          success: true,
          message: "User Login successfull.",
          data: token,
        });
      } else {
        res.status(200).send({
          success: false,
          message: "Incorrect password",
        });
      }
    } else {
      res
        .status(200)
        .send({ success: false, message: "User does not exist.", data: null });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
