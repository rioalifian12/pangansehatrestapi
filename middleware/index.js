var express = require("express");
var auth = require("./auth");
var router = express.Router();
var verifikasi = require("./verifikasi");

// daftarkan menu registrasi
router.post("/api/v1/register", auth.registerUser);
router.post("/api/v1/login", auth.loginUser);

// alamat yang perlu otorisasi
router.get("/api/v1/rahasia", verifikasi(), auth.halamanRahasia);

module.exports = router;
