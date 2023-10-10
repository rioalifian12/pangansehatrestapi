// agar code js tetap tertata saat ada salah penulisan
"use strict";

exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end();
};

// response untuk nested layanan
exports.oknested = function (values, res) {
  // lakukan akumulasi
  const hasil = values.reduce((akumulasikan, item) => {
    // tentukan key group
    if (akumulasikan[item.nama]) {
      // buat variabel group nama user
      const group = akumulasikan[item.nama];
      // cek jika isi array adalah nama layanan
      if (Array.isArray(group.nama_layanan, group.harga)) {
        // tambahkan value kedalam group nama layanan
        group.nama_layanan.push(item.nama_layanan),
          group.harga.push(item.harga);
      } else {
        (group.nama_layanan = [group.nama_layanan, , item.nama_layanan]),
          (group.harga = [group.harga, , item.harga]);
      }
    } else {
      akumulasikan[item.nama] = item;
    }
    return akumulasikan;
  }, {});

  var data = {
    status: 200,
    values: hasil,
  };

  res.json(data);
  res.end;
};
