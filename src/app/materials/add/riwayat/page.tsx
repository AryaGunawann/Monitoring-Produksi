"use client";

export interface Riwayat {
  id: number;
  deskripsi: string;
  jenis: string;
  createAt: Date;
  updateAt: Date;
}

import { useEffect, useState } from "react";
import axios from "axios";
import { Title, Text, Loader, Alert, Paper } from "@mantine/core";

const Riwayats = () => {
  const [riwayats, setRiwayats] = useState<Riwayat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/riwayat");
        // Filter riwayat produk
        const filteredRiwayats = response.data.filter(
          (riwayat) => riwayat.jenis !== "Produk Bertambah"
        );
        setRiwayats(filteredRiwayats);
      } catch (error) {
        setError("Error fetching riwayat: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Title order={1} align="center">
        Riwayat
      </Title>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="grid gap-4">
          {riwayats.map((riwayat) => (
            <Paper key={riwayat.id} shadow="xs" padding="lg">
              <Title order={3}>{riwayat.jenis}</Title>
              <Text>{riwayat.deskripsi}</Text>
              <Text size="sm">Created At: {riwayat.createdAt}</Text>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default Riwayats;
