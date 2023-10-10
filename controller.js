"use strict";

var response = require("./res");
var connection = require("./koneksi");
var mysql = require("mysql");
var md5 = require("md5");

exports.index = function (req, res) {
  response.ok("Aplikasi REST API berjalan!", res);
};

// menampilkan semua data user
exports.getAllUser = function (req, res) {
  connection.query("SELECT * FROM user", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// menampilkan semua data user by id
exports.getUserById = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM user WHERE id_user = ?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

// menambahkan data user
// exports.createNewUser = function (req, res) {
//   var nama = req.body.nama;
//   var email = req.body.email;
//   var umur = req.body.umur;

//   connection.query(
//     "INSERT INTO user (nama, email, umur) VALUES (?,?,?)",
//     [nama, email, umur],
//     function (error, rows, fields) {
//       if (error) {
//         console.log(error);
//       } else {
//         response.ok("Berhasil menambahkan data!", res);
//       }
//     }
//   );
// };

// mengubah data user by id
exports.editUser = function (req, res) {
  var id = req.body.id_user;
  var nama = req.body.nama;
  var email = req.body.email;
  var password = md5(req.body.password);
  var umur = req.body.umur;
  var role = req.body.role;
  var tanggal_daftar = new Date();

  connection.query(
    "UPDATE user SET nama=?, email=?, password=?, umur=?, role=?, tanggal_daftar=? WHERE id_user=?",
    [nama, email, password, umur, role, tanggal_daftar, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil mengubah data user!", res);
      }
    }
  );
};

// menghapus data user by id
exports.deleteUser = function (req, res) {
  var id = req.body.id_user;
  connection.query(
    "DELETE FROM user WHERE id_user=?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil menghapus data user!", res);
      }
    }
  );
};

// menampilkan nama layanan group
exports.showGroupNamaLayanan = function (req, res) {
  connection.query(
    "SELECT user.id_user, user.nama, user.email, user.password, user.umur, user.role, user.tanggal_daftar, layanan.nama_layanan, layanan.harga FROM pengajuan JOIN layanan JOIN user WHERE pengajuan.id_layanan = layanan.id_layanan AND pengajuan.id_user = user.id_user ORDER BY user.id_user;",
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.oknested(rows, res);
      }
    }
  );
};
