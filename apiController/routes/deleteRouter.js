const express = require("express");
const router = express.Router();
const db = require("../db");

//1
router.post("/guru/:id", async(req, res)=>{
    try{
        const [result] = await db.query("DELETE FROM guru WHERE id_guru = ?", [
            req.params.id,
        ]);
        if(result.affectedRows === 0){
            return res
            .status(404)
            .json({ success: false, message: "Failed Delete Guru: guru not found"});
        }
        res.json({ success: true, message: "Guru successfully deleted"});
    } 
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
});

//2
router.post("/role/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM role WHERE id_role = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete role: role not found",
        });
    }
    res.json({ success: true, message: "role successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//3
router.post("/sekolah/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM sekolah WHERE id_sekolah = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete sekolah: sekolah not found",
        });
    }
    res.json({ success: true, message: "sekolah successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
  
//4
router.post("/siswa/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM siswa WHERE id_siswa = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete siswa: siswa not found",
        });
    }
    res.json({ success: true, message: "siswa successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
  
kelas
pengampu
fase
dimensi
elemen
sub_elemen
capaian
assesment
nilai
//5
router.post("/kelas/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM kelas WHERE id_kelas = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete kelas: kelas not found",
        });
    }
    res.json({ success: true, message: "kelas successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//6
router.post("/pengampu/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM pengampu WHERE id_pengampu = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete pengampu: pengampu not found",
        });
    }
    res.json({ success: true, message: "pengampu successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//7
router.post("/fase/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM fase WHERE id_fase = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete fase: fase not found",
        });
    }
    res.json({ success: true, message: "fase successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//8
router.post("/dimensi/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM dimensi WHERE id_dimensi = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete dimensi: dimensi not found",
        });
    }
    res.json({ success: true, message: "dimensi successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//9
router.post("/elemen/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM elemen WHERE id_elemen = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete elemen: elemen not found",
        });
    }
    res.json({ success: true, message: "elemen successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//10
router.post("/sub_elemen/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM sub_elemen WHERE id_sub_elemen = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete sub_elemen: sub_elemen not found",
        });
    }
    res.json({ success: true, message: "sub_elemen successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//11
router.post("/capaian/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM capaian WHERE id_capaian = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete capaian: capaian not found",
        });
    }
    res.json({ success: true, message: "capaian successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//12
router.post("/assesment/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM assesment WHERE id_assesment = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete assesment: assesment not found",
        });
    }
    res.json({ success: true, message: "assesment successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//13
router.post("/nilai/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM nilai WHERE id_nilai = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete nilai: nilai not found",
        });
    }
    res.json({ success: true, message: "nilai successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;