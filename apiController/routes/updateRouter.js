const express = require("express");
const router = express.Router();
const db = require("../db");
const round = 10;
const bcrypt = require('bcrypt');

//1
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

//2
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

//3
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

//4
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
  
//5
router.post("/kelas/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM kelas WHERE id_kelas = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "kelas not found" });
        }
        const id_sekolah = req.body.id_sekolah ?? existingData[0].id_sekolah;
        const id_fase = req.body.id_fase ?? existingData[0].id_fase;
        const nama_kelas = req.body.nama_kelas ?? existingData[0].nama_kelas;
        const tingkat = req.body.tingkat ?? existingData[0].tingkat;
        const tahun_ajaran = req.body.tahun_ajaran ?? existingData[0].tahun_ajaran;
        const id_wali_kelas = req.body.id_wali_kelas ?? existingData[0].id_wali_kelas;

        const [result] = await db.query(
        "UPDATE kelas SET id_sekolah = ?, id_fase = ?, nama_kelas = ?, tingkat = ?, tahun_ajaran = ?, id_wali_kelas = ? WHERE id_kelas = ?",
        [id_sekolah, id_fase, nama_kelas, tingkat, tahun_ajaran, id_wali_kelas, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update kelas",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//6
router.post("/pengampu/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM pengampu WHERE id_pengampu = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "pengampu not found" });
        }
        const id_guru = req.body.id_guru ?? existingData[0].id_guru;
        const id_kelas = req.body.id_kelas ?? existingData[0].id_kelas;
        const tahun_ajaran = req.body.tahun_ajaran ?? existingData[0].tahun_ajaran;

        const [result] = await db.query(
        "UPDATE pengampu SET id_guru = ?, id_kelas = ?, tahun_ajaran = ? WHERE id_pengampu = ?",
        [id_guru, id_kelas, tahun_ajaran, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update pengampu",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//7
router.post("/fase/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM fase WHERE id_fase = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "fase not found" });
        }
        const nama_fase = req.body.nama_fase ?? existingData[0].nama_fase;
        const keterangan = req.body.keterangan ?? existingData[0].keterangan;

        const [result] = await db.query(
        "UPDATE fase SET nama_fase = ?, keterangan = ? WHERE id_fase = ?",
        [nama_fase, keterangan, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update fase",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//8
router.post("/dimensi/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM dimensi WHERE id_dimensi = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "dimensi not found" });
        }
        const nama_dimensi = req.body.nama_dimensi ?? existingData[0].nama_dimensi;

        const [result] = await db.query(
        "UPDATE dimensi SET nama_dimensi = ? WHERE id_dimensi = ?",
        [nama_dimensi, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update dimensi",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//9
router.post("/elemen/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM elemen WHERE id_elemen = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "elemen not found" });
        }
        const id_dimensi = req.body.id_dimensi ?? existingData[0].id_dimensi;
        const nama_elemen = req.body.nama_elemen ?? existingData[0].nama_elemen;

        const [result] = await db.query(
        "UPDATE elemen SET id_dimensi = ?, nama_elemen = ? WHERE id_elemen = ?",
        [id_dimensi, nama_elemen, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update elemen",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//10
router.post("/sub_elemen/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM sub_elemen WHERE id_sub_elemen = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "sub_elemen not found" });
        }
        const id_elemen = req.body.id_elemen ?? existingData[0].id_elemen;
        const nama_sub_elemen = req.body.nama_sub_elemen ?? existingData[0].nama_sub_elemen;

        const [result] = await db.query(
        "UPDATE sub_elemen SET id_elemen = ?, nama_sub_elemen = ? WHERE id_sub_elemen = ?",
        [id_elemen, nama_sub_elemen, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update sub_elemen",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//11
router.post("/capaian/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM capaian WHERE id_capaian = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "capaian not found" });
        }
        const id_sub_elemen = req.body.id_sub_elemen ?? existingData[0].id_sub_elemen;
        const id_fase = req.body.id_fase ?? existingData[0].id_fase;
        const deskripsi = req.body.deskripsi ?? existingData[0].deskripsi;

        const [result] = await db.query(
        "UPDATE capaian SET id_sub_elemen = ?, id_fase = ?, deskripsi = ? WHERE id_capaian = ?",
        [id_sub_elemen, id_fase, deskripsi, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update capaian",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//12
router.post("/assessment/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM assessment WHERE id_assessment = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "assessment not found" });
        }
        const id_capaian = req.body.id_capaian ?? existingData[0].id_capaian;
        const nama_assessment = req.body.nama_assessment ?? existingData[0].nama_assessment;
        const deskripsi = req.body.deskripsi ?? existingData[0].deskripsi;
        const bobot = req.body.bobot ?? existingData[0].bobot;

        const [result] = await db.query(
        "UPDATE assessment SET id_capaian = ?, nama_assessment = ?, deskripsi = ?, bobot = ? WHERE id_assessment = ?",
        [id_capaian, nama_assessment, deskripsi, bobot, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update assessment",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//13
router.post("/nilai/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [existingData] = await db.query(
        "SELECT * FROM nilai WHERE id_nilai = ?",
        [id]
        );
        if (existingData.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "nilai not found" });
        }
        const id_siswa = req.body.id_siswa ?? existingData[0].id_siswa;
        const id_pengampu = req.body.id_pengampu ?? existingData[0].id_pengampu;
        const id_assesment = req.body.id_assesment ?? existingData[0].id_assesment;
        const nilai = req.body.nilai ?? existingData[0].nilai;
        const tanggal_input = req.body.tanggal_input ?? existingData[0].tanggal_input;

        const [result] = await db.query(
        "UPDATE nilai SET id_siswa = ?, id_pengampu = ?, id_assesment = ?, nilai = ?, tanggal_input = ? WHERE id_nilai = ?",
        [id_siswa, id_pengampu, id_assesment, nilai, tanggal_input, id]
        );
        res.status(200).json({
        success: true,
        message: "Successfully update nilai",
        affectedRows: result.affectedRows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
module.exports = router;