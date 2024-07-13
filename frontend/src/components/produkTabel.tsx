"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader, Alert, Title, Card } from "@mantine/core";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface Produk {
  id: string;
  nama: string;
  jumlah_total: number;
  normalizedNama?: string;
  lastUpdated?: string;
}

const ProductTabel = () => {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const prevProdukRef = useRef<Produk[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/produk");
        const fetchedData: Produk[] = response.data;

        // Normalisasi dan gabungkan produk
        const normalizedProduk = combineAndNormalizeProducts(fetchedData);

        setProduk((prevProduk) => {
          const updatedProduk = normalizedProduk.map((product) => {
            const prevProduct = prevProduk.find(
              (prev) => prev.id === product.id
            );
            if (prevProduct) {
              return {
                ...product,
                lastUpdated: prevProduct.lastUpdated, // Copy lastUpdated from prevProduct if exists
              };
            }
            return {
              ...product,
              lastUpdated: new Date().toISOString(), // Set current time for new products
            };
          });
          prevProdukRef.current = updatedProduk; // Update prevProdukRef setelah state diubah
          return updatedProduk;
        });
      } catch (error) {
        setError("Error fetching total: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const combineAndNormalizeProducts = (products: Produk[]): Produk[] => {
    const productMap: { [key: string]: Produk } = {};

    products.forEach((product) => {
      // Normalisasi nama produk untuk memperhitungkan variasi
      const normalizedNama = product.nama.trim().toLowerCase();

      // Cari apakah sudah ada produk dengan nama yang sudah dinormalisasi
      let existingProduct = Object.values(productMap).find(
        (p) => p.normalizedNama === normalizedNama
      );

      if (!existingProduct) {
        // Jika produk belum ada, tambahkan dengan nama yang sudah dinormalisasi
        product.normalizedNama = normalizedNama;
        productMap[normalizedNama] = {
          ...product,
          lastUpdated: new Date().toISOString(),
        }; // Set initial lastUpdated time
      } else {
        // Jika sudah ada, tambahkan jumlah_total ke produk yang sudah ada
        existingProduct.jumlah_total += product.jumlah_total;
      }
    });

    // Konversi nilai dari productMap kembali ke dalam array
    return Object.values(productMap);
  };

  const getJumlahDifference = (
    current: number,
    previous: number | undefined
  ) => {
    if (previous === undefined) {
      return current;
    }
    return current - previous;
  };

  const isWithinOneDay = (dateString: string | undefined) => {
    if (!dateString) return false;
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 1;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-2 text-black">
        <Title order={3}>Total Produk</Title>
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
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Produk
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
                {produk.map((p, index) => {
                  const updatedAt = new Date(p.lastUpdated || "");
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

                  const prevProduct = prevProdukRef.current.find(
                    (prev) => prev.id === p.id
                  );
                  const jumlahDifference = prevProduct
                    ? getJumlahDifference(
                        p.jumlah_total,
                        prevProduct.jumlah_total
                      )
                    : 0;

                  console.log(
                    `Product ID: ${
                      p.id
                    }, Difference: ${jumlahDifference}, Last Updated: ${
                      p.lastUpdated
                    }, Is Within One Day: ${isWithinOneDay(p.lastUpdated)}`
                  );

                  return (
                    <tr key={p.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.jumlah_total}
                        {jumlahDifference > 0 &&
                          isWithinOneDay(p.lastUpdated) && (
                            <span className="ml-1 text-green-500">
                              <FaArrowUp />
                            </span>
                          )}
                        {jumlahDifference < 0 &&
                          isWithinOneDay(p.lastUpdated) && (
                            <span className="ml-1 text-red-500">
                              <FaArrowDown />
                            </span>
                          )}
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

export default ProductTabel;
