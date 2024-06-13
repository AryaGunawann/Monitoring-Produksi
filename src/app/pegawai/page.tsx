"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Loader, Alert, Title, Button, Container } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import AddPegawaiModal from "../../components/modal/pegawaiModal";
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

  const handleAddEmployee = (newEmployee: any) => {
    setPegawaiList((prevList) => [...prevList, newEmployee]);
    showNotification({
      title: "Success",
      message: "Pegawai berhasil ditambahkan",
      color: "green",
    });
    closeModal();
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await axios.delete(`/api/pegawai/${id}`);
      setPegawaiList((prevList) =>
        prevList.filter((pegawai) => pegawai.id !== id)
      );
      showNotification({
        title: "Success",
        message: "Pegawai berhasil dihapus",
        color: "green",
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Error deleting employee: " + error);
      showNotification({
        title: "Error",
        message: "Gagal menghapus pegawai",
        color: "red",
      });
    }
  };

  return (
    <Container className="mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Daftar Pegawai</Title>
        <Button onClick={openModal}>Tambah Pegawai</Button>
        <AddPegawaiModal
          visible={isModalOpen}
          onClose={closeModal}
          onAdd={handleAddEmployee}
        />
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
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jabatan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pegawaiList.map((pegawai) => (
                  <tr key={pegawai.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {pegawai.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pegawai.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pegawai.Jabatan.nama_jabatan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                      <Link href={`/pegawai/${pegawai.id}`} passHref>
                        <Button component="a" color="blue">
                          Detail
                        </Button>
                      </Link>
                      <Button
                        color="red"
                        onClick={() => handleDeleteEmployee(pegawai.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default PegawaiPage;
