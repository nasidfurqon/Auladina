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


//assessment berdasarkan capaian
router.get("/capaian_kelas/:id/assessment", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM assessment WHERE id_capaian_kelas = ?",
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
router.get("/siswa/:id_siswa/capaian_kelas/:id_capaian_kelas/nilai", verifyToken, async (req, res) => {
    const { id_siswa, id_capaian_kelas } = req.params;

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
         WHERE n.id_siswa = ? 
           AND a.id_capaian_kelas = ?`,
        [id_siswa, id_capaian_kelas]
      );

      res.json({ success: true, data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
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
       INNER JOIN users u ON g.user_id = u.id_user
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

// GET capaian_kelas by id_sub_elemen dan id_kelas
router.get("/capaian_kelas/:id_sub_elemen/:id_kelas", verifyToken, async (req, res) => {
  try {
    const { id_sub_elemen, id_kelas } = req.params;

    const [rows] = await db.query(
      `SELECT ck.*, se.nama_sub_elemen, k.nama_kelas
       FROM capaian_kelas ck
       INNER JOIN sub_elemen se ON ck.id_sub_elemen = se.id_sub_elemen
       INNER JOIN kelas k ON ck.id_kelas = k.id_kelas
       WHERE ck.id_sub_elemen = ? AND ck.id_kelas = ?`,
      [id_sub_elemen, id_kelas]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "No capaian_kelas found for this sub_elemen and kelas" });
    }

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.get("/guru/siswa-belum-dinilai/:id_guru", verifyToken, async (req, res) => {
  try {
    const { id_guru } = req.params;

    // Query untuk menghitung siswa belum dinilai
    const [rows] = await db.query(
      `SELECT 
          (total_siswa_semua_assessment - total_nilai_sudah_ada) as siswa_belum_dinilai
       FROM (
          SELECT 
              (SELECT COUNT(*) 
               FROM nilai n 
               INNER JOIN pengampu p ON n.id_pengampu = p.id_pengampu 
               WHERE p.id_guru = ?) as total_siswa_semua_assessment,
              (SELECT COUNT(*) 
               FROM nilai n 
               INNER JOIN pengampu p ON n.id_pengampu = p.id_pengampu 
               WHERE nilai != '-' AND p.id_guru = ?) as total_nilai_sudah_ada
       ) counts`,
      [id_guru, id_guru]
    );

    res.json({ 
      success: true, 
      data: {
        siswa_belum_dinilai: rows[0].siswa_belum_dinilai,
        id_guru: id_guru
      }
    });

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
