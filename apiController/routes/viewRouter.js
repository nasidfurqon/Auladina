const express = require("express");
const router = express.Router();
const db = require("../db");
const {verifyToken} = require("../middleware/authMiddleware");

//1
router.get("/guru/:id", verifyToken, async (req, res) => {
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

router.get("/users/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id_user = ?", [
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

//2
router.get("/role/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM role WHERE id_role = ?", [
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

//3
router.get("/sekolah/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM sekolah WHERE id_sekolah = ?", [
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

//4
router.get("/siswa/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM siswa WHERE id_siswa = ?", [
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

//5
router.get("/kelas/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM kelas WHERE id_kelas = ?", [
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

//6
router.get("/pengampu/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM pengampu WHERE id_pengampu = ?", [
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

//7
router.get("/fase/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM fase WHERE id_fase = ?", [
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

//8
router.get("/dimensi/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM dimensi WHERE id_dimensi = ?", [
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

//9
router.get("/elemen/:id", verifyToken, async (req, res) => {
    try { 
      const [rows] = await db.query("SELECT * FROM elemen WHERE id_elemen = ?", [
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

//10
router.get("/sub_elemen/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM sub_elemen WHERE id_sub_elemen = ?", [
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
    }
    catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
});

//11
router.get("/capaian/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM capaian WHERE id_capaian = ?", [
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

//12
router.get("/assessment/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM assessment WHERE id_assessment = ?", [
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

//13
router.get("/nilai/:id", verifyToken, async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM nilai WHERE id_nilai = ?", [
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

router.get("/capaian_kelas/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM capaian_kelas WHERE id = ?", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Data not found" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
