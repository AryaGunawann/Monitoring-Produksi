import React, { useState } from "react";

const SlipGaji = ({ pegawai, potongan, kasbon }) => {
  const [showPreview, setShowPreview] = useState(false);
  const bulanIni = new Date().toLocaleString("default", { month: "long" });
  const totalGaji =
    pegawai.Jabatan.gapok +
    pegawai.Jabatan.tunjangan +
    pegawai.Jabatan.uang_makan;
  const gajiBersih = totalGaji - potongan - kasbon;

  return (
    <div className="p-8 bg-gray-100 font-sans">
      <div className="flex justify-between mb-8">
        <h2 className="text-lg font-bold">PT. Tritek Indonesia</h2>
        <h2 className="text-lg font-bold">Slip Gaji Bulan {bulanIni}</h2>
      </div>

      {/* Informasi Pegawai */}
      <div>
        <h3 className="text-lg font-bold mb-2">Informasi Pegawai</h3>
        <p>Nama: {pegawai.nama}</p>
        <p>Jabatan: {pegawai.Jabatan.nama_jabatan}</p>
        <p>NIK: {pegawai.nik}</p>
        <p>Tanggal Bergabung: {pegawai.tanggal_bergabung}</p>
        <p className="text-lg font-bold">Total Gaji Bersih: {gajiBersih}</p>
      </div>

      {/* Tabel Rincian Gaji */}
      <div>
        <h3 className="text-lg font-bold mb-2">Rincian Gaji</h3>
        <div className="flex flex-row border-b border-gray-500">
          <p className="w-1/6 font-bold">Gaji Pokok</p>
          <p className="w-1/6 font-bold">Tunjangan</p>
          <p className="w-1/6 font-bold">Uang Makan</p>
          <p className="w-1/6 font-bold">Potongan</p>
          <p className="w-1/6 font-bold">Kasbon</p>
          <p className="w-1/6 font-bold">Gaji Bersih</p>
        </div>
        <div className="flex flex-row border-b border-gray-500">
          <p className="w-1/6">{pegawai.Jabatan.gapok}</p>
          <p className="w-1/6">{pegawai.Jabatan.tunjangan}</p>
          <p className="w-1/6">{pegawai.Jabatan.uang_makan}</p>
          <p className="w-1/6">{potongan}</p>
          <p className="w-1/6">{kasbon}</p>
          <p className="w-1/6">{gajiBersih}</p>
        </div>
      </div>
    </div>
  );
};

export default SlipGaji;
