const express = require("express");
const router = express.Router();
const db = require("../db");
const round = 10;
const bcrypt = require('bcrypt');
const {verifyToken} = require("../middleware/authMiddleware");

//1

router.post("/guru", verifyToken, async (req, res) => {
  try {
    const guruList = Array.isArray(req.body) ? req.body : [req.body];

    const values = [];
    for (const guru of guruList) {
      const id_sekolah = guru.id_sekolah ?? null;
      const nama = guru.nama ?? null;
      const nip = guru.nip ?? null;
      const id_role = guru.id_role ?? null;
      values.push([id_sekolah, nama, nip, id_role]);
    }

    const [result] = await db.query(
      "INSERT INTO guru (id_sekolah, nama, nip, id_role) VALUES ?",
      [values]
    );

    res.status(200).json({
      success: true,
      message: "Successfully add guru",
      insertedCount: result.affectedRows,
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/users", verifyToken, async(req, res)=>{
    try{
        const email = req.body.email ?? null;
        const password_hash = req.body.password_hash ?? null;
        const created_at = new Date();

        const hashed = req.body.password_hash ? await bcrypt.hash(password_hash, round) : null;

        const [result] = await db.query("INSERT INTO guru (email, password_hash, created_at) VALUES (?, ?, ?)",
        [email, hashed, created_at]);

        res.status(200).json({
          success: true,  
          message: "Successfully add users",
          insertedCount: result.affectedRows,
          id: result.insertId
        });
    }
    catch(error){
        console.error(error); 
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

//2
router.post("/role", verifyToken, async (req, res) => {
  try {
    const nama_role = req.body.nama_role ?? null;

    const [result] = await db.query(
      "INSERT INTO role (nama_role) VALUES (?)",
      [nama_role]
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

//3
router.post("/sekolah", verifyToken, async (req, res) => {
  try {
    const nama_sekolah = req.body.nama_sekolah ?? null;
    const alamat = req.body.alamat ?? null;
    const jenjang = req.body.jenjang ?? null;
    const npsn = req.body.npsn ?? null;

    const [result] = await db.query(
      "INSERT INTO sekolah (nama_sekolah, alamat, jenjang, npsn) VALUES (?, ?, ?, ?)",
      [nama_sekolah, alamat, jenjang, npsn]
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

//4
router.post("/siswa", verifyToken, async (req, res) => {
  try {
    const siswaList = Array.isArray(req.body) ? req.body: [req.body];
    
    const values = [];
    for(const siswa of siswaList){
      const id_kelas = siswa.id_kelas ?? null;
      const id_sekolah = siswa.id_sekolah ?? null;
      const nama = siswa.nama ?? null;
      const nisn = siswa.nisn ?? null;
      const tanggal_lahir = siswa.tanggal_lahir ?? null;
      const jenis_kelamin = siswa.jenis_kelamin ?? null;
      values.push([id_kelas, id_sekolah, nama, nisn, tanggal_lahir, jenis_kelamin]);  
    }

    const [result] = await db.query(
      "INSERT INTO siswa (id_kelas, id_sekolah, nama, nisn, tanggal_lahir, jenis_kelamin) VALUES ?",
      [values]
    );
    res.status(200).json({
      success: true,
      message: "Successfully add siswa",
      insertedCount: result.affectedRows,
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//5
router.post("/kelas", verifyToken, async(req, res)=>{
    try{
        const id_sekolah = req.body.id_sekolah ?? null;
        const id_fase = req.body.id_fase ?? null;
        const nama_kelas = req.body.nama_kelas ?? null;
        const tingkat = req.body.tingkat ?? null;
        const tahun_ajaran = req.body.tahun_ajaran ?? null;
        const id_wali_kelas = req.body.id_wali_kelas ?? null;

        const [result] = await db.query("INSERT INTO kelas (id_sekolah, id_fase, nama_kelas, tingkat, tahun_ajaran, id_wali_kelas) VALUES (?, ?, ?, ?, ?, ?)",
        [id_sekolah, id_fase, nama_kelas, tingkat, tahun_ajaran, id_wali_kelas]);
        res.status(200).json({
          success: true, 
          message: "Successfully add kelas", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

//6
router.post("/pengampu", verifyToken, async(req, res)=>{
    try{
        const id_guru = req.body.id_guru ?? null;
        const id_kelas = req.body.id_kelas ?? null;
        const tahun_ajaran = req.body.tahun_ajaran ?? null;

        const [result] = await db.query("INSERT INTO pengampu (id_guru, id_kelas, tahun_ajaran) VALUES (?, ?, ?)",
        [id_guru, id_kelas, tahun_ajaran]);
        res.status(200).json({
          success: true, 
          message: "Successfully add pengampu", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

//7
router.post("/fase", verifyToken, async(req, res)=>{
    try{
        const nama_fase = req.body.nama_fase ?? null;
        const keterangan = req.body.keterangan ?? null;

        const [result] = await db.query("INSERT INTO fase (nama_fase, keterangan) VALUES (?, ?)",
        [nama_fase, keterangan]);
        res.status(200).json({
          success: true, 
          message: "Successfully add fase", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

//8
router.post("/dimensi", verifyToken, async(req, res)=>{
    try{
        const nama_dimensi = req.body.nama_dimensi ?? null;

        const [result] = await db.query("INSERT INTO dimensi (nama_dimensi) VALUES (?)",
        [nama_dimensi]);
        res.status(200).json({
          success: true, 
          message: "Successfully add dimensi", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

//9
router.post("/elemen", verifyToken, async(req, res)=>{
    try{
        const id_dimensi = req.body.id_dimensi ?? null;
        const nama_elemen = req.body.nama_elemen ?? null;

        const [result] = await db.query("INSERT INTO elemen (id_dimensi, nama_elemen) VALUES (?, ?)",
        [id_dimensi, nama_elemen]);
        res.status(200).json({
          success: true, 
          message: "Successfully add elemen", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

//10
router.post("/sub_elemen", verifyToken, async(req, res)=>{
    try{
        const id_elemen = req.body.id_elemen ?? null;
        const nama_sub_elemen = req.body.nama_sub_elemen ?? null;

        const [result] = await db.query("INSERT INTO sub_elemen (id_elemen, nama_sub_elemen) VALUES (?, ?)",
        [id_elemen, nama_sub_elemen]);
        res.status(200).json({
          success: true, 
          message: "Successfully add sub_elemen", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});



//12
router.post("/assessment", verifyToken, async(req, res)=>{
    try{
        const id_capaian_kelas = req.body.id_capaian_kelas ?? null;
        const nama_assessment = req.body.nama_assessment ?? null;
        const deskripsi = req.body.deskripsi ?? null;
        const bobot = req.body.bobot ?? null;

        const [result] = await db.query("INSERT INTO assessment (id_capaian_kelas, nama_assessment, deskripsi, bobot) VALUES (?, ?, ?, ?)",
        [id_capaian_kelas, nama_assessment, deskripsi, bobot]);
        res.status(200).json({
          success: true, 
          message: "Successfully add assessment", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

//13
router.post("/nilai", verifyToken, async(req, res)=>{
    try{
        const id_siswa = req.body.id_siswa ?? null;
        const id_pengampu = req.body.id_pengampu ?? null;
        const id_assessment = req.body.id_assessment ?? null;
        const nilai = req.body.nilai ?? null;
        const tanggal_input = req.body.tanggal_input ?? null;

        const [result] = await db.query("INSERT INTO nilai (id_siswa, id_pengampu, id_assessment, nilai, tanggal_input) VALUES (?, ?, ?, ?, ?)",
        [id_siswa, id_pengampu, id_assessment, nilai, tanggal_input]);
        res.status(200).json({
          success: true, 
          message: "Successfully add nilai", 
          id: result.insertId
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

router.post("/capaian_kelas", verifyToken, async (req, res) => {
  try {
    const { kode_ck, nama_ck, id_kelas, id_capaian, id_sekolah } = req.body;

    const [result] = await db.query(
      `INSERT INTO capaian_kelas (kode_ck, nama_ck, id_kelas, id_capaian, id_sekolah) 
       VALUES (?, ?, ?, ?, ?)`,
      [kode_ck, nama_ck, id_kelas, id_capaian, id_sekolah]
    );

    res.status(200).json({
      success: true,
      message: "Successfully added capaian_kelas",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;