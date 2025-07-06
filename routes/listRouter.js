const express = require("express");
const router = express.Router();
const db = require("../db");

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

module.exports = router;