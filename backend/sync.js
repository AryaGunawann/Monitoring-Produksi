// Import model-model yang akan disinkronkan dengan database
const db = require("./database");
const Produk = require("./models/produk");
const Material = require("./models/material");
const Riwayat = require("./models/riwayat");
const Jabatan = require("./models/jabatan");
const SlipGaji = require("./models/slipGaji");
const Employee = require("./models/employee");
const Packing = require("./models/packing");
const Shipping = require("./models/shipping");

// Fungsi untuk menyinkronkan model-model dengan database
const syncModels = async () => {
  try {
    // Drop tables in reverse order of their dependencies
    await Employee.drop();
    await Jabatan.drop();
    await SlipGaji.drop();
    await Riwayat.drop();
    await Produk.drop();
    await Material.drop();
    await Packing.drop();
    await Shipping.drop();

    // Sync models again
    await db.sync({ force: true }); // force: true akan menghapus tabel yang sudah ada jika ada perubahan pada model
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while synchronizing models:", error);
  } finally {
    // Tutup koneksi ke database setelah selesai
    await db.close();
    console.log("Database connection closed.");
  }
};

// Panggil fungsi untuk menyinkronkan model dengan database
syncModels();
