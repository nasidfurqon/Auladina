const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");

//1
router.get("/guru", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM guru");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/users", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//2
router.get("/role", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM role");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//3
router.get("/sekolah", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sekolah");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//4
router.get("/siswa", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM siswa");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//5
router.get("/pengampu", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM pengampu");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//6
router.get("/fase", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM fase");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//7
router.get("/dimensi", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM dimensi");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//8
router.get("/elemen", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM elemen");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//9
router.get("/sub_elemen", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sub_elemen");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//10
router.get("/capaian", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM capaian");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//11
router.get("/assessment", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM assessment");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//12
router.get("/nilai", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM nilai");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//13
router.get("/kelas", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM kelas");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/capaian_kelas", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Capaian_kelas");
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
