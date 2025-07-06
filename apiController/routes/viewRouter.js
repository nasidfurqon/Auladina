const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/guru/:id", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM guru WHERE id_guru = ?", [
        req.params.id,
      ]);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }

      res.json({
        success: true,
        data: rows[0],  
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
});
module.exports = router;
