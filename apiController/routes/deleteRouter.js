const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/authMiddleware");

//1
router.delete("/guru/:id", verifyToken, async(req, res)=>{
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
router.delete("/role/:id", verifyToken, async (req, res) => {
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
router.delete("/sekolah/:id", verifyToken, async (req, res) => {
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
router.delete("/siswa/:id", verifyToken, async (req, res) => {
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
  
// kelas
// pengampu
// fase
// dimensi
// elemen
// sub_elemen
// capaian
// assessment
// nilai
//5
router.delete("/kelas/:id", verifyToken, async (req, res) => {
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
router.delete("/pengampu/:id", verifyToken, async (req, res) => {
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
router.delete("/fase/:id", verifyToken, async (req, res) => {
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
router.delete("/dimensi/:id", verifyToken, async (req, res) => {
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
router.delete("/elemen/:id", verifyToken, async (req, res) => {
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
router.delete("/sub_elemen/:id", verifyToken, async (req, res) => {
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
router.delete("/capaian/:id", verifyToken, async (req, res) => {
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
router.delete("/assessment/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM assessment WHERE id_assessment = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Failed Delete assessment: assessment not found",
        });
    }
    res.json({ success: true, message: "assessment successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//13
router.delete("/nilai/:id", verifyToken, async (req, res) => {
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

router.delete("/capaian_kelas/:id", verifyToken, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM Capaian_kelas WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Capaian_kelas not found" });
    }

    res.json({ success: true, message: "Capaian_kelas successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;