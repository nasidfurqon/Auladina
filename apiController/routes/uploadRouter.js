const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const db = require("../db");
const { verifyToken } = require("../middleware/authMiddleware");

// Pastikan folder uploads ada
const uploadDir = "./uploads/logos";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi Multer untuk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const idSekolah = req.params.id || req.body.id_sekolah;
    const ext = path.extname(file.originalname);
    const filename = `logo_${idSekolah}${ext}`;
    cb(null, filename);
  },
});

// Filter file - hanya terima gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diperbolehkan (jpeg, jpg, png, gif)"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
  fileFilter: fileFilter,
});

// ============================================
// API UPLOAD LOGO
// ============================================
// POST /api/sekolah/:id/logo
router.post("/sekolah/:id/logo", verifyToken, upload.single("logo"), async (req, res) => {
  try {
    const idSekolah = req.params.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File logo tidak ditemukan",
      });
    }

    // Cek apakah sekolah ada di database
    // Ganti dengan query database Anda
    const sekolah = await db.query("SELECT * FROM sekolah WHERE id_sekolah = ?", [
      idSekolah,
    ]);

    if (!sekolah || sekolah.length === 0) {
      // Hapus file yang sudah diupload jika sekolah tidak ditemukan
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    // Hapus logo lama jika ada
    if (sekolah[0].logo) {
      const oldLogoPath = path.join(uploadDir, sekolah[0].logo);
      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
    }

    // Update database dengan nama file baru
    const logoFilename = req.file.filename;
    await db.query("UPDATE sekolah SET logo = ? WHERE id_sekolah = ?", [
      logoFilename,
      idSekolah,
    ]);

    res.status(200).json({
      success: true,
      message: "Logo berhasil diupload",
      data: {
        id_sekolah: idSekolah,
        logo: logoFilename,
        url: `/api/sekolah/${idSekolah}/logo`,
      },
    });
  } catch (error) {
    // Hapus file jika terjadi error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Error upload logo:", error);
    res.status(500).json({
      success: false,
      message: "Gagal upload logo",
      error: error.message,
    });
  }
});

// ============================================
// API GET LOGO
// ============================================
// GET /api/sekolah/:id/logo
router.get("/sekolah/:id/logo", verifyToken, async (req, res) => {
  try {
    const idSekolah = req.params.id;

    // Ambil data sekolah dari database
    const [sekolah] = await db.query("SELECT logo FROM sekolah WHERE id_sekolah = ?", [
      idSekolah,
    ]);

    if (!sekolah || sekolah.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    if (!sekolah[0].logo) {
      return res.status(404).json({
        success: false,
        message: "Logo belum diupload",
      });
    }

    const logoPath = path.join('./uploads/logos', sekolah[0].logo);

    // Cek apakah file ada
    if (!fs.existsSync(logoPath)) {
      return res.status(404).json({
        success: false,
        message: "File logo tidak ditemukan",
      });
    }

    // Kirim file
    res.sendFile(path.resolve(logoPath));
  } catch (error) {
    console.error("Error get logo:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil logo",
      error: error.message,
    });
  }
});


// ============================================
// API GET LOGO FROM USER
// ============================================
// GET /api/user/:id/logo
router.get("/user/:id/logo", verifyToken, async (req, res) => {
  try {
    const idUser = req.params.id;

    // Ambil data user dari database
    const [sekolah] = await db.query("SELECT logo FROM sekolah WHERE id_sekolah = (SELECT idSekolah FROM users where id_user = ?)", [
      idUser,
    ]);

    if (!sekolah || sekolah.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    if (!sekolah[0].logo) {
      return res.status(404).json({
        success: false,
        message: "Logo belum diupload",
      });
    }

    const logoPath = path.join('./uploads/logos', sekolah[0].logo);

    // Cek apakah file ada
    if (!fs.existsSync(logoPath)) {
      return res.status(404).json({
        success: false,
        message: "File logo tidak ditemukan",
      });
    }

    // Kirim file
    res.sendFile(path.resolve(logoPath));
  } catch (error) {
    console.error("Error get logo:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil logo",
      error: error.message,
    });
  }
});

// ============================================
// API DELETE LOGO
// ============================================
// DELETE /api/sekolah/:id/logo
router.delete("/sekolah/:id/logo", verifyToken, async (req, res) => {
  try {
    const idSekolah = req.params.id;

    // Ambil data sekolah dari database
    const sekolah = await db.query("SELECT logo FROM sekolah WHERE id_sekolah = ?", [
      idSekolah,
    ]);

    if (!sekolah || sekolah.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sekolah tidak ditemukan",
      });
    }

    if (!sekolah[0].logo) {
      return res.status(404).json({
        success: false,
        message: "Logo belum ada",
      });
    }

    // Hapus file dari server
    const logoPath = path.join(uploadDir, sekolah[0].logo);
    if (fs.existsSync(logoPath)) {
      fs.unlinkSync(logoPath);
    }

    // Update database (set logo menjadi null)
    await db.query("UPDATE sekolah SET logo = NULL WHERE id_sekolah = ?", [idSekolah]);

    res.status(200).json({
      success: true,
      message: "Logo berhasil dihapus",
    });
  } catch (error) {
    console.error("Error delete logo:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menghapus logo",
      error: error.message,
    });
  }
});

module.exports = router;
