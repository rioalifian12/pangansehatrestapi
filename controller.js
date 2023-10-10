"use strict";

var response = require("./res");
var connection = require("./koneksi");

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
exports.createNewUser = function (req, res) {
  var nama = req.body.nama;
  var email = req.body.email;
  var umur = req.body.umur;

  connection.query(
    "INSERT INTO user (nama, email, umur) VALUES (?,?,?)",
    [nama, email, umur],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil menambahkan data!", res);
      }
    }
  );
};

// mengubah data user by id
exports.editUser = function (req, res) {
  var id = req.body.id_user;
  var nama = req.body.nama;
  var email = req.body.email;
  var umur = req.body.umur;

  connection.query(
    "UPDATE user SET nama=?, email=?, umur=? WHERE id_user=?",
    [nama, email, umur, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil mengubah data!", res);
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
        response.ok("Berhasil menghapus data!", res);
      }
    }
  );
};

// menampilkan nama layanan group
exports.showGroupNamaLayanan = function (req, res) {
  connection.query(
    "SELECT user.id_user, user.nama, user.email, user.umur, layanan.nama_layanan, layanan.harga FROM pengajuan JOIN layanan JOIN user WHERE pengajuan.id_layanan = layanan.id_layanan AND pengajuan.id_user = user.id_user ORDER BY user.id_user;",
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.oknested(rows, res);
      }
    }
  );
};
