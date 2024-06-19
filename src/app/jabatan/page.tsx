"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Loader,
  Title,
  Button,
  Container,
  Notification,
  Pagination,
} from "@mantine/core";
import AddJabatanModal from "../../components/modal/jabatanModal";

interface Jabatan {
  id: number;
  nama_jabatan: string;
  gapok: number;
  tunjangan: number;
  uang_makan: number;
  createdAt: string;
  updatedAt: string;
}

const JabatanPage = () => {
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    color: "blue" | "red" | "yellow" | "green";
  } | null>(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/jabatan/${id}`);
      setJabatanList(jabatanList.filter((jabatan) => jabatan.id !== id));
      setNotification({ message: "Jabatan berhasil dihapus.", color: "green" });
    } catch (error) {
      setError("Error deleting jabatan: " + error);
      setNotification({
        message: "Terjadi kesalahan saat menghapus jabatan.",
        color: "red",
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const updateJabatanList = () => {
    fetchData();
  };

  // Pagination logic
  const totalPages = Math.ceil(jabatanList.length / itemsPerPage);
  const displayedJabatan = jabatanList.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container className="mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Daftar Jabatan</Title>
        <Button onClick={openModal}>Tambah Jabatan</Button>
        <AddJabatanModal
          visible={isModalOpen}
          onClose={closeModal}
          updateJabatanList={updateJabatanList}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <>
          <Card shadow="sm" className="border rounded-lg p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gaji Pokok
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tunjangan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uang Makan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedJabatan.map((jabatan) => (
                    <tr key={jabatan.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {jabatan.nama_jabatan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {jabatan.gapok}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {jabatan.tunjangan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {jabatan.uang_makan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          onClick={() => handleDelete(jabatan.id)}
                          variant="outline"
                          color="red"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          {jabatanList.length > itemsPerPage && (
            <Pagination
              page={activePage}
              onChange={setActivePage}
              total={totalPages}
              className="mt-4"
            />
          )}
        </>
      )}
      {notification && (
        <Notification
          color={notification.color}
          onClose={handleNotificationClose}
          className="absolute bottom-4 right-4"
        >
          {notification.message}
        </Notification>
      )}
    </Container>
  );
};

export default JabatanPage;
