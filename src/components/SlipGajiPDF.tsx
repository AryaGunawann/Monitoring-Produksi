import React from "react";

const SlipGajiPDF = ({ pegawai, potongan, kasbon, onDownloadPDF }) => {
  const bulanIni = new Date().toLocaleString("default", { month: "long" });
  const totalGaji =
    pegawai.Jabatan.gapok +
    pegawai.Jabatan.tunjangan +
    pegawai.Jabatan.uang_makan;
  const gajiBersih = totalGaji - potongan - kasbon;

  return (
    <div>
      <div className="p-8 bg-white shadow-md rounded-md" id="slip-gaji-content">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold">PT. Tritek Indonesia</h2>
            <p className="text-sm text-gray-600">Jl. Contoh No. 123, Jakarta</p>
            <p className="text-sm text-gray-600">Telepon: (021) 12345678</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Slip Gaji Bulan {bulanIni}</h2>
            <p className="text-sm text-gray-600">
              Periode: {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Informasi Pegawai */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">Informasi Pegawai</h3>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <p className="text-sm text-gray-700">Nama:</p>
              <p className="text-lg font-bold">{pegawai.nama}</p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm text-gray-700">NIK:</p>
              <p className="text-lg font-bold">{pegawai.nik}</p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm text-gray-700">Jabatan:</p>
              <p className="text-lg font-bold">
                {pegawai.Jabatan.nama_jabatan}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm text-gray-700">Tanggal Bergabung:</p>
              <p className="text-lg font-bold">{pegawai.tanggal_bergabung}</p>
            </div>
          </div>
        </div>

        {/* Tabel Rincian Gaji */}
        <div>
          <h3 className="text-lg font-bold mb-2">Rincian Gaji</h3>
          <div className="flex flex-row border-b border-gray-300 mb-2">
            <p className="w-1/6 text-sm font-bold">Gaji Pokok</p>
            <p className="w-1/6 text-sm font-bold">Tunjangan</p>
            <p className="w-1/6 text-sm font-bold">Uang Makan</p>
            <p className="w-1/6 text-sm font-bold">Potongan</p>
            <p className="w-1/6 text-sm font-bold">Kasbon</p>
            <p className="w-1/6 text-sm font-bold">Gaji Bersih</p>
          </div>
          <div className="flex flex-row border-b border-gray-300 mb-2">
            <p className="w-1/6 text-sm">
              {pegawai.Jabatan.gapok.toLocaleString()}
            </p>
            <p className="w-1/6 text-sm">
              {pegawai.Jabatan.tunjangan.toLocaleString()}
            </p>
            <p className="w-1/6 text-sm">
              {pegawai.Jabatan.uang_makan.toLocaleString()}
            </p>
            <p className="w-1/6 text-sm">{potongan.toLocaleString()}</p>
            <p className="w-1/6 text-sm">{kasbon.toLocaleString()}</p>
            <p className="w-1/6 text-sm">{gajiBersih.toLocaleString()}</p>
          </div>
        </div>

        {/* TTD */}
        <div className="mt-8">
          <p className="text-sm text-right">TTD,</p>
          <p className="text-lg font-bold text-right">Manajer HR</p>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          id="download-pdf-btn"
          onClick={onDownloadPDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default SlipGajiPDF;
