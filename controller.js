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
    "SELECT * FROM user WHERE id = ?",
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
  var id = req.body.id;
  var nama = req.body.nama;
  var email = req.body.email;
  var umur = req.body.umur;

  connection.query(
    "UPDATE user SET nama=?, email=?, umur=? WHERE id=?",
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
  var id = req.body.id;
  connection.query(
    "DELETE FROM user WHERE id=?",
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
