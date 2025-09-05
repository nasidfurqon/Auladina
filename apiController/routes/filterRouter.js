const express = require("express");
const router = express.Router();
const db = require("../db");
const {verifyToken} = require("../middleware/authMiddleware");

//elemen berdasarkan dimensi
router.get("/dimensi/:id/elemen", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM elemen WHERE id_dimensi = ?", [
      req.params.id,
    ]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//sub elemen berdasarkan elemen
router.get("/elemen/:id/sub-elemen", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM sub_elemen WHERE id_elemen = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//capaian berdasarkan fase dan sub elemen
router.get("/capaian", verifyToken, async (req, res) => {
  const { id_fase, id_sub_elemen } = req.query;
  try {
    const [rows] = await db.query(
      "SELECT * FROM capaian WHERE id_fase = ? AND id_sub_elemen = ?",
      [id_fase, id_sub_elemen]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//assessment berdasarkan capaian
router.get("/capaian/:id/assessment", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM assessment WHERE id_capaian = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//jumlah kelas yang diampu guru
router.get("/guru/:id/jumlah-kelas", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(DISTINCT id_kelas) AS jumlah_kelas FROM pengampu WHERE id_guru = ?",
      [req.params.id]
    );
    res.json({ success: true, jumlah_kelas: rows[0].jumlah_kelas });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//jumlah siswa yang diajar guru
router.get("/guru/:id/jumlah-siswa", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT COUNT(DISTINCT siswa.id_siswa) AS jumlah_siswa
      FROM pengampu
      JOIN kelas ON pengampu.id_kelas = kelas.id_kelas
      JOIN siswa ON siswa.id_kelas = kelas.id_kelas
      WHERE pengampu.id_guru = ?
    `,
      [req.params.id]
    );

    res.json({ success: true, jumlah_siswa: rows[0].jumlah_siswa });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//nilai berdasarkan assessment
router.get("/assessment/:id/nilai", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM nilai WHERE id_assessment = ?",
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//nilai berdasarkan siswa
router.get("/siswa/:id/nilai", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM nilai WHERE id_siswa = ?", [
      req.params.id,
    ]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//nilai berdasarkan assessment dan siswa
router.get("/nilai", verifyToken, async (req, res) => {
  const { id_assessment, id_siswa } = req.query;

  if (!id_assessment || !id_siswa) {
    return res.status(400).json({
      success: false,
      message: "Parameter id_assessment dan id_siswa wajib diisi",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM nilai WHERE id_assessment = ? AND id_siswa = ?",
      [id_assessment, id_siswa]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nilai tidak ditemukan untuk kombinasi yang diberikan",
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//nilai berdasarkan siswa dan capaian
router.get(
  "/siswa/:id_siswa/capaian/:id_capaian/nilai",
  verifyToken,
  async (req, res) => {
    const { id_siswa, id_capaian } = req.params;

    try {
      const [rows] = await db.query(
        `SELECT 
         n.id_nilai,
         n.nilai,
         n.tanggal_input,
         a.nama_assessment,
         a.deskripsi AS deskripsi_assessment,
         a.bobot
       FROM nilai n
       JOIN assessment a ON n.id_assessment = a.id_assessment
       WHERE n.id_siswa = ? AND a.id_capaian = ?`,
        [id_siswa, id_capaian]
      );

      res.json({ success: true, data: rows });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// GET by id_sekolah
router.get(
  "/capaian_kelas/sekolah/:id_sekolah",
  verifyToken,
  async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM Capaian_kelas WHERE id_sekolah = ?",
        [req.params.id_sekolah]
      );
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// GET by id_kelas
router.get("/capaian_kelas/kelas/:id_kelas", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM Capaian_kelas WHERE id_kelas = ?",
      [req.params.id_kelas]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET by id_sub_elemen AND id_fase
router.get(
  "/capaian_kelas/filter/:id_sub_elemen/:id_fase",
  verifyToken,
  async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM Capaian_kelas WHERE id_sub_elemen = ? AND id_fase = ?",
        [req.params.id_sub_elemen, req.params.id_fase]
      );
      res.json({ success: true, data: rows });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// Ambil 5 pengisian nilai terakhir berdasarkan id_guru
router.get("/history/:id_guru", async (req, res) => {
  try {
    const { id_guru } = req.params;
    const [rows] = await db.query(
      `SELECT n.* 
       FROM nilai n
       JOIN pengampu p ON n.id_pengampu = p.id_pengampu
       WHERE p.id_guru = ?
       ORDER BY n.tanggal_input DESC 
       LIMIT 5`,
      [id_guru]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/assessment/guru/:id_guru", verifyToken, async (req, res) => {
  try {
    const { id_guru } = req.params;

    const [rows] = await db.query(
      `SELECT DISTINCT a.* 
       FROM assessment a
       JOIN nilai n ON a.id_assessment = n.id_assessment
       JOIN pengampu p ON n.id_pengampu = p.id_pengampu
       WHERE p.id_guru = ?`,
      [id_guru]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found for this teacher",
      });
    }

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
});

// GET guru by user_id
router.get("/guru/user/:user_id", verifyToken, async (req, res) => {
  try {
    const { user_id } = req.params;

    // join users dan guru
    const [rows] = await db.query(
      `SELECT g.*, u.* 
       FROM guru g
       INNER JOIN users u ON g.user_id = u.id
       WHERE g.user_id = ?`,
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Guru not found for this user_id" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET capaian_kelas by id_sub_elemen
router.get("/capaian_kelas/sub_elemen/:id_sub_elemen", verifyToken, async (req, res) => {
  try {
    const { id_sub_elemen } = req.params;

    const [rows] = await db.query(
      `SELECT ck.* 
       FROM capaian_kelas ck
       INNER JOIN capaian c ON ck.id_capaian = c.id_capaian
       WHERE c.id_sub_elemen = ?`,
      [id_sub_elemen]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "No capaian_kelas found for this id_sub_elemen" });
    }

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.get("/guru/userEmail", verifyToken,async (req, res) => {
    try {
      const { email } = req.query;

      const [rows] = await db.query(
        `SELECT * from guru where email = ?`,
        [email]
      );

      if (rows.length === 0) {
        return res
          .status(404)
          .json({
            success: false,
            message: "No guru found for this email",
          });
      }

      res.json({ success: true, data: rows });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);


module.exports = router;
