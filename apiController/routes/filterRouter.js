const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");

router.get("/dimensi/:id/elemen", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM elemen WHERE id_dimensi = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/elemen/:id/sub-elemen", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM sub_elemen WHERE id_elemen = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/capaian", verifyToken, async (req, res) => {
  const { id_fase, id_sub_elemen } = req.query;
  try {
    const [rows] = await db.query(
      "SELECT * FROM capaian WHERE id_fase = ? AND id_sub_elemen = ?",
      [id_fase, id_sub_elemen]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/capaian/:id/assessment", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM assessment WHERE id_capaian = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/guru/:id/jumlah-kelas", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(DISTINCT id_kelas) AS jumlah_kelas FROM pengampu WHERE id_guru = ?",
      [req.params.id]
    );
    res.json({ success: true, jumlah_kelas: rows[0].jumlah_kelas });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/guru/:id/jumlah-siswa", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(DISTINCT siswa.id_siswa) AS jumlah_siswa
      FROM pengampu
      JOIN kelas ON pengampu.id_kelas = kelas.id_kelas
      JOIN siswa ON siswa.id_kelas = kelas.id_kelas
      WHERE pengampu.id_guru = ?
    `, [req.params.id]);

    res.json({ success: true, jumlah_siswa: rows[0].jumlah_siswa });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
module.exports = router;

router.get("/assessment/:id/nilai", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM nilai WHERE id_assessment = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/siswa/:id/nilai", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM nilai WHERE id_siswa = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});