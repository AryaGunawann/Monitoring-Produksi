"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Alert, Title, Card } from "@mantine/core";
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
        <Title order={1}>Produk</Title>
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
                    Updated At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produk.map((p) => {
                  const updatedAt = new Date(p.updatedAt);

                  const formattedDate = updatedAt.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  const formattedTime = updatedAt.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  return (
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
                        {`${formattedDate} ${formattedTime}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductsPage;
