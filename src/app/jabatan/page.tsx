"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Loader, Alert, Title, Button } from "@mantine/core";
import AddJabatanModal from "../../components/modal/jabatanModal";

interface Jabatan {
  id: number;
  nama_jabatan: string;
  gapok: number;
  tunjangan: number;
  uang_makan: number;
}

const JabatanPage = () => {
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/jabatan");
        setJabatanList(response.data.data);
      } catch (error) {
        setError("Error fetching jabatan: " + error);
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-6 text-white">
        <Title order={1}>Daftar Jabatan</Title>

        <Button onClick={openModal}>Tambah Jabatan</Button>

        <AddJabatanModal visible={isModalOpen} onClose={closeModal} />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jabatanList.map((jabatan) => (
            <Card key={jabatan.id} shadow="sm" className="border rounded-lg">
              <Title order={2}>{jabatan.nama_jabatan}</Title>
              <p>Gaji Pokok: {jabatan.gapok}</p>
              <p>Tunjangan: {jabatan.tunjangan}</p>
              <p>Uang Makan: {jabatan.uang_makan}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JabatanPage;
