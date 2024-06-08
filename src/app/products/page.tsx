"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Loader, Alert, Title, Button } from "@mantine/core";
import { Produk, Material } from "../../interfaces/product";
import AddProductModal from "../../components/modal/produkModal";

const ProductsPage = () => {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/produk");
        setProduk(response.data);
      } catch (error) {
        setError("Error fetching produk: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Filter material berdasarkan tanggal dan waktu pembuatan terbaru
  const filterLatestMaterial = (materials: Material[]) => {
    return materials.sort(
      (a: Material, b: Material) =>
        new Date(b.tanggal_dibuat).getTime() -
        new Date(a.tanggal_dibuat).getTime()
    );
  };

  const filterLatestProduk = (produk: Produk[]) => {
    const latestProduk: { [key: string]: Produk } = {};

    for (const p of produk) {
      const latestMaterial = filterLatestMaterial(p.material_pendukung);

      latestProduk[p.nama] = {
        ...p,
        material_pendukung: latestMaterial,
      };
    }

    return Object.values(latestProduk);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Daftar Produk</Title>
        <Button onClick={openModal}>Buat Produk</Button>
        <AddProductModal visible={isModalOpen} onClose={closeModal} />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <Card shadow="sm" className="border rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Produk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Berat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Dibuat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material Pendukung
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filterLatestProduk(produk).map((p: Produk) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {p.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.berat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.jumlah_total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <ul className="list-disc list-inside">
                        {p.material_pendukung.map((mp: Material) => (
                          <li key={mp.id}>
                            {mp.nama} (Jumlah: {mp.jumlah})
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductsPage;
