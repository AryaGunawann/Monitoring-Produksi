"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Loader, Alert, Title, Button } from "@mantine/core";
import { Produk } from "../../interfaces/product";
import Link from "next/link";

const ProductsPage = () => {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-6 text-white">
        <Title order={1}>Daftar Produk</Title>
        <Link href="/products/add">
          <Button>Add</Button>
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produk.map((p) => (
            <Card key={p.id} shadow="sm">
              <Title order={2}>{p.nama}</Title>
              <p>Berat: {p.berat}</p>
              <p>Jumlah Total: {p.jumlah_total}</p>
              <div className="py-7">
                <Title order={3}>Material Pendukung:</Title>
                <ul>
                  {p.material_pendukung.map((mp) => (
                    <li key={mp.id}>
                      Material: {mp.nama}, Jumlah: {mp.jumlah}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
