"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Loader, Alert, Title, Button } from "@mantine/core";
import AddJabatanModal from "../../components/modal/jabatanModal";
import Link from "next/link";

interface Jabatan {
  id: number;
  nama_jabatan: string;
  gapok: number;
  tunjangan: number;
  uang_makan: number;
  createdAt: string;
  updatedAt: string;
}

interface Pegawai {
  id: number;
  nama: string;
  email: string;
  Jabatan: Jabatan;
}

const PegawaiPage = () => {
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/pegawai");
        setPegawaiList(response.data.data);
      } catch (error) {
        setError("Error fetching pegawai: " + error);
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
      <div className="flex justify-between mb-6">
        <Title order={1}>Daftar Pegawai</Title>
        <Button onClick={openModal}>Tambah Pegawai</Button>
        <AddJabatanModal visible={isModalOpen} onClose={closeModal} />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pegawaiList.map((pegawai) => (
            <Card
              key={pegawai.id}
              shadow="sm"
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div>
                <Title order={3}>{pegawai.nama}</Title>
                <p>Email: {pegawai.email}</p>
                <p>Jabatan: {pegawai.Jabatan.nama_jabatan}</p>
                <Link href={`/pegawai/${pegawai.id}`} passHref>
                  <Button component="a" color="blue">
                    Detail
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PegawaiPage;
