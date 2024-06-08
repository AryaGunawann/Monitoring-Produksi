"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Alert, Title } from "@mantine/core";
import { Produk } from "../interfaces/product";

const ProductsPage = () => {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/produk");
        const fetchedProducts = response.data;

        const produkMap = new Map();
        fetchedProducts.forEach((p) => {
          let totalMaterial = 0;

          if (p.material_pendukung) {
            p.material_pendukung.forEach((material) => {
              totalMaterial += material.jumlah;
            });
          }

          if (totalMaterial > 0) {
            if (produkMap.has(p.nama)) {
              const existingProduct = produkMap.get(p.nama);
              existingProduct.jumlah_total += p.jumlah_total;
              existingProduct.totalMaterial += totalMaterial;
              existingProduct.updatedAt =
                new Date(existingProduct.updatedAt) > new Date(p.updatedAt)
                  ? existingProduct.updatedAt
                  : p.updatedAt;
            } else {
              produkMap.set(p.nama, { ...p, totalMaterial });
            }
          }
        });

        const combinedProduk = Array.from(produkMap.values());
        setProduk(combinedProduk);
      } catch (error) {
        setError("Error fetching produk: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 text-black">
        <Title order={1}>Daftar Produk</Title>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Nama Produk
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Berat
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Jumlah
                </th>

                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {produk.map((p) => (
                <tr key={p.id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {p.nama}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {p.berat}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {p.jumlah_total}
                  </td>

                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(p.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
