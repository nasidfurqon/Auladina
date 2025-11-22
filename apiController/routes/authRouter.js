const express = require("express");
require("dotenv").config();
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const round = 10;
const sendVerificationEmail = require("../utils/mail");
const { verifyTokenNIP } = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    if (!email || !password_hash) {
      return res
        .status(400)
        .json({ success: false, message: "email, password cant be empty" });
    }
        
    const [guru] = await db.query("SELECT * FROM guru WHERE email = ?", [email]);
    if (guru.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email tidak terdaftar di data guru" });
    }

    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "email already exist" });
    }

    const hashed = await bcrypt.hash(password_hash, round);
    const [result] = await db.query(
      "INSERT INTO users (email, password_hash, is_verified, created_at, id_role) VALUES (?, ?, ?, ?, ?)",
      [email, hashed, 0, new Date(), 2]
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await sendVerificationEmail(email, token);

    res
      .status(200)
      .json({
        success: true,
        message: "Registratsi is Successfull",
        id: result.insertId,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;

    await db.execute("UPDATE users SET is_verified = ? WHERE email = ?", [
      1,
      email,
    ]);
    res.send("Email successfully verified!");
  } catch (err) {
    res.status(400).send("Invalid or expired token.");
  }
});

router.post("/verify_nip", verifyTokenNIP, async (req, res) => {
  const { nip } = req.body;

  if (!nip) {
    return res.status(400).json({ success: false, message: "NIP is required" });
  }
  try {
    const { email } = req.user;

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];
    const [guru] = await db.query("SELECT * FROM guru WHERE nip = ?", [nip]);
    if (!guru.length) {
      return res
        .status(404)
        .json({ success: false, message: "NIP not found in guru table" });
    }

    await db.execute("UPDATE guru SET email = ? WHERE nip = ?", [email, nip]);

    await db.execute("UPDATE users SET is_verified_nip = ? WHERE email = ?", [
      1,
      email,
    ]);

    const token = jwt.sign(
      {
        id: user.id_user,
        email: user.email,
        is_verified: 1,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Successfully Verified",
      token: token,
    });
  } catch (err) {
    res.status(400).send("Invalid or expired token," + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "email not found" });
    }

    const user = users[0];
    if (user.is_verified != 1)
      return res.status(403).json({ message: "Please verify your email" });

    const valid = await bcrypt.compare(password_hash, user.password_hash);
    if (!valid) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });
    }
    const token = jwt.sign(
      {
        id: user.id_user,
        email: user.email,
        is_verified: user.is_verified,
        id_role: user.id_role // tambahkan id_role ke payload
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login Successfull",
      token: token,
      id_role: user.id_role // tambahkan id_role ke response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
