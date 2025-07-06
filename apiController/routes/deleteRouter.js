const express = require("express");
const router = express.Router();
const db = require("../db");

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
  
module.exports = router;