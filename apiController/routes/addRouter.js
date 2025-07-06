const express = require("express");
const router = express.Router();
const db = require("../db");
const round = 10;
const bcrypt = require('bcrypt');

router.post("/guru", async(req, res)=>{
    try{
        const id_sekolah = req.body.id_sekolah ?? null;
        const nama = req.body.nama ?? null;
        const email = req.body.email ?? null;
        const nip = req.body.nip ?? null;
        const password_hash = req.body.password_hash ?? null;
        const id_role = req.body.id_role ?? null;

        const hashed = req.body.password_hash ? await bcrypt.hash(password_hash, round) : null  ;

        const [result] = await db.query("INSERT INTO guru (id_sekolah, nama, email, nip, password_hash, id_role) VALUES (?, ?, ?, ?, ?, ?)",
        [id_sekolah, nama, email, nip, hashed, id_role]);
        res.status(200).json({success: true, message: "Successfully add guru", id: result.insertId});
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

router.post("/role", async (req, res) => {
  try {
    const nama_role = req.body.nama_role ?? null;

    const [result] = await db.query(
      "INSERT INTO role (nama_role) VALUES (?)",
      [id_role, nama_role]
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully add role",
        id: result.insertId,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/sekolah", async (req, res) => {
  try {
    const nama_sekolah = req.body.nama_sekolah ?? null;
    const alamat = req.body.alamat ?? null;
    const jenjang = req.body.jenjang ?? null;
    const npsn = req.body.npsn ?? null;

    const [result] = await db.query(
      "INSERT INTO sekolah (nama_sekolah, alamat, jenjang, npsn) VALUES (?, ?, ?, ?)",
      [id_sekolah, nama_sekolah, alamat, jenjang, npsn]
    );
    res.status(200).json({
      success: true,
      message: "Successfully add sekolah",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/siswa", async (req, res) => {
  try {
    const id_kelas = req.body.id_kelas ?? null;
    const id_sekolah = req.body.id_sekolah ?? null;
    const nama = req.body.nama ?? null;
    const nisn = req.body.nisn ?? null;
    const tanggal_lahir = req.body.tanggal_lahir ?? null;
    const jenis_kelamin = req.body.jenis_kelamin ?? null;

    const [result] = await db.query(
      "INSERT INTO siswa (id_kelas, id_sekolah, nama, nisn, tanggal_lahir, jenis_kelamin) VALUES (?, ?, ?, ?, ?, ?)",
      [id_kelas, id_sekolah, nama, nisn, tanggal_lahir, jenis_kelamin]
    );
    res.status(200).json({
      success: true,
      message: "Successfully add siswa",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;