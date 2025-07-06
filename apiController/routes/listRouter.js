const express = require("express");
const router = express.Router();
const db = require("../db");

//1
router.get("/guru", async(req, res)=>{
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
})

//2
router.get("/role", async (req, res) => {
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
router.get("/sekolah", async (req, res) => {
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
router.get("/siswa", async (req, res) => {
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
router.get("/pengampu", async (req, res) => {
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
router.get("/fase", async (req, res) => {
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
router.get("/dimensi", async (req, res) => {  
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
router.get("/elemen", async (req, res) => {
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
router.get("/sub_elemen", async (req, res) => {
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
router.get("/capaian", async (req, res) => {
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
router.get("/assesment", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM assesment");
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
router.get("/nilai", async (req, res) => {  
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
router.get("/kelas", async (req, res) => {
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
module.exports = router;