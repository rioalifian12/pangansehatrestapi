var connection = require("../koneksi");
var response = require("../res");
var mysql = require("mysql");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// controller untuk registrasi
exports.registerUser = function (req, res) {
  var post = {
    nama: req.body.nama,
    email: req.body.email,
    password: md5(req.body.password),
    umur: req.body.umur,
    role: req.body.role,
    tanggal_daftar: new Date(),
  };

  var query = "SELECT email FROM ?? WHERE ??=?";
  var table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("Berhasil menambahkan data user!", res);
          }
        });
      } else {
        response.ok("Email sudah terdaftar!", res);
      }
    }
  });
};
