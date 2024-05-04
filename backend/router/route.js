const express = require("express");
const User = require("../models/User");
const router = express.Router();
const fs = require('fs');
const {generateQRCode}=require('../utils/QrCode')

const QRCode = require('qrcode');

router.post("/register", async (req, res) => {
  try {
    const { name, email, uid } = req.body;

    const userFound = await User.findOne({ uid });
    if (userFound) {
      return res.status(422).json({ error: "User already exists!" });
    } else {
      const newUser = new User({
        name,
        uid,
        email
      });
      const registerUser = await newUser.save();

      res.status(201).json({ message: "User registered successfully!!" });
    }
  } catch (error) {
    console.log(`error occured : ${error.message}`);
  }
});

router.get("/api/qr-code", async (req, res) => {
  const username = req.query.username;
  try {
      const qrCodeBuffer = await generateQRCode(`http://localhost:5173/${username}`);
    console.log()

    const WithQRImage = {
      qrCodeImage: qrCodeBuffer
    };

    res.status(201).json(WithQRImage);
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
