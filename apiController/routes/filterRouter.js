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

router.get("/nilai", verifyToken, async (req, res) => {
  const { id_assessment, id_siswa } = req.query;

  if (!id_assessment || !id_siswa) {
    return res.status(400).json({
      success: false,
      message: "Parameter id_assessment dan id_siswa wajib diisi",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM nilai WHERE id_assessment = ? AND id_siswa = ?",
      [id_assessment, id_siswa]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nilai tidak ditemukan untuk kombinasi yang diberikan",
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/siswa/:id_siswa/capaian/:id_capaian/nilai", verifyToken, async (req, res) => {
  const { id_siswa, id_capaian } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT 
         n.id_nilai,
         n.nilai,
         n.tanggal_input,
         a.nama_assessment,
         a.deskripsi AS deskripsi_assessment,
         a.bobot
       FROM nilai n
       JOIN assessment a ON n.id_assessment = a.id_assessment
       WHERE n.id_siswa = ? AND a.id_capaian = ?`,
      [id_siswa, id_capaian]
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
