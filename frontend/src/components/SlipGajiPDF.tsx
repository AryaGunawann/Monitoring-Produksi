import React from "react";
import { formatRupiah } from "../utils/rupiah";

interface SlipGajiPDFProps {
  pegawai: {
    nama: string;
    nik: string;
    Jabatan: {
      nama_jabatan: string;
      gapok: number;
      tunjangan: number;
      uang_makan: number;
    };
    tanggal_bergabung: string;
  };
  potongan: number;
  kasbon: number;
  onDownloadPDF: () => void;
}

const SlipGajiPDF: React.FC<SlipGajiPDFProps> = ({
  pegawai,
  potongan,
  kasbon,
  onDownloadPDF,
}) => {
  const bulanIni = new Date().toLocaleString("default", { month: "long" });
  const totalGaji =
    pegawai.Jabatan.gapok +
    pegawai.Jabatan.tunjangan +
    pegawai.Jabatan.uang_makan;
  const gajiBersih = totalGaji - potongan - kasbon;

  return (
    <div>
      <div className="p-3 bg-white shadow-md rounded-md" id="slip-gaji-content">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">PT. Tritek Indonesia</h2>
            <p className="text-sm text-gray-600">Jl. Contoh No. 123, Jakarta</p>
            <p className="text-sm text-gray-600">Telepon: (021) 12345678</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">Slip Gaji Bulan {bulanIni}</h2>
            <p className="text-sm text-gray-600">
              Periode: {new Date().getFullYear()}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">Informasi Pegawai</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-700">Nama:</p>
              <p className="text-lg font-bold">{pegawai.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">NIK:</p>
              <p className="text-lg font-bold">{pegawai.nik}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Jabatan:</p>
              <p className="text-lg font-bold">
                {pegawai.Jabatan.nama_jabatan}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Tanggal Bergabung:</p>
              <p className="text-lg font-bold">{pegawai.tanggal_bergabung}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Rincian Gaji</h3>
          <table className=" w-full text-left table-auto mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-xs">Gaji Pokok</th>
                <th className="border px-2 py-1 text-xs">Tunjangan</th>
                <th className="border px-2 py-1 text-xs">Uang Makan</th>
                <th className="border px-2 py-1 text-xs">Potongan</th>
                <th className="border px-2 py-1 text-xs">Kasbon</th>
                <th className="border px-2 py-1 text-xs">Gaji Bersih</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1 text-xs">
                  {formatRupiah(pegawai.Jabatan.gapok)}
                </td>
                <td className="border px-2 py-1 text-xs">
                  {formatRupiah(pegawai.Jabatan.tunjangan)}
                </td>
                <td className="border px-2 py-1 text-xs">
                  {formatRupiah(pegawai.Jabatan.uang_makan)}
                </td>
                <td className="border px-2 py-1 text-xs">
                  {formatRupiah(potongan)}
                </td>
                <td className="border px-2 py-1 text-xs">
                  {formatRupiah(kasbon)}
                </td>
                <td className="border px-2 py-1 text-xs">
                  {formatRupiah(gajiBersih)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm mb-4">
          Slip Gaji Dikeluarkan Pada Bulan: {bulanIni}
        </p>

        <div className="mt-8 text-right">
          <p className="text-sm">TTD,</p>
          <p className="text-lg font-bold">Manajer HR</p>
        </div>

        <div className="mt-8 text-left">
          <p className="text-sm">
            Untuk pertanyaan lebih lanjut, silakan hubungi kami di (021)
            12345678 atau email ke hr@tritek.co.id.
          </p>
          <p className="text-sm mt-2">Hormat kami,</p>
          <p className="text-sm mt-1">Nama Manajer HR</p>
          <p className="text-sm">PT. Tritek Indonesia</p>
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
