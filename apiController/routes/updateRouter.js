const express = require("express");
const router = express.Router();
const db = require("../db");
const round = 10;
const bcrypt = require('bcrypt');

router.post("/guru/:id", async(req, res)=>{
    const {id} = req.params;

    try{
        const [existingData] = await db.query("SELECT * FROM guru where id_guru = ?", [id])
        if(existingData.length === 0){
          return res
            .status(404)
            .json({success: false, message: "Guru not found"});
        }
        const id_sekolah = req.body.id_sekolah ?? existingData[0].id_sekolah ;
        const nama = req.body.nama ?? existingData[0].nama;
        const email = req.body.email ?? existingData[0].email;
        const nip = req.body.nip ?? existingData[0].nip;
        const password_hash = req.body.password_hash ?? existingData[0].password_hash;
        const id_role = req.body.id_role ?? existingData[0].id_role;
        
        const hashed = req.body.password_hash
          ? await bcrypt.hash(password_hash, round)
          : password_hash;

        const [result] = await db.query("UPDATE guru set id_sekolah = ?, nama = ?, email =  ?, nip = ?, password_hash =  ?, id_role =  ? WHERE id_guru = ?",
        [id_sekolah, nama, email, nip, hashed, id_role, id]);
        res.status(200).json({success: true, message: "Successfully update guru", affectedRows: result.affectedRows});
    }
    catch(error){
        console.error(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
});

router.post("/role/:id", async (req, res) => {
    const { id } = req.params;

    try {
    const [existingData] = await db.query(
        "SELECT * FROM role where id_role = ?",
        [id]
    );
    if (existingData.length === 0) {
        return res
        .status(404)
        .json({ success: false, message: "role not found" });
    }
    const nama_role = req.body.nama_role ?? existingData[0].nama_role;

    const [result] = await db.query(
        "UPDATE role set nama_role = ? WHERE id_role = ?",
        [nama_role, id]
    );
    res
        .status(200)
        .json({
        success: true,
        message: "Successfully update role",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post("/sekolah/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM sekolah where id_sekolah = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "sekolah not found" });
        }
        const nama_sekolah = req.body.nama_sekolah ?? existingData[0].nama_sekolah;
        const alamat = req.body.alamat ?? existingData[0].alamat;
        const jenjang = req.body.jenjang ?? existingData[0].jenjang;
        const npsn = req.body.npsn ?? existingData[0].npsn;

        const [result] = await db.query(
        "UPDATE sekolah set nama_sekolah = ?, alamat = ?, jenjang = ?, npsn = ? WHERE id_sekolah = ?",
        [nama_sekolah, alamat, jenjang, npsn, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update sekolah",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


router.post("/siswa/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM sisw where id_siswa = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "sekolah not found" });
        }
        const id_kelas = req.body.id_kelas ?? existingData[0].id_kelas;
        const id_sekolah = req.body.id_sekolah ?? existingData[0].id_sekolah;
        const nama = req.body.nama ?? existingData[0].nama;
        const nisn = req.body.nisn ?? existingData[0].nisn;
        const tanggal_lahir = req.body.tanggal_lahir ?? existingData[0].tanggal_lahir;
        const jenis_kelamin = req.body.jenis_kelamin ?? existingData[0].jenis_kelamin;


        const [result] = await db.query(
        "UPDATE siswa set id_kelas = ?, id_sekolah = ?, nama = ?, nisn = ?, tanggal_lahir = ?, jenis_kelamin = ? WHERE id_siswa = ?",
        [id_kelas, id_sekolah, nama, nisn, tanggal_lahir, jenis_kelamin, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update siswa",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
  

module.exports = router;