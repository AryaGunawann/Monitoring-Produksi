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
  Table,
} from "@mantine/core";
import AddJabatanModal from "../../components/modal/jabatanModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatRupiah } from "../../utils/rupiah";

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
        <Notification color="red">{error}</Notification>
      ) : (
        <>
          <Card shadow="sm" className="border rounded-lg p-4">
            <div className="overflow-x-auto">
              <Table
                striped
                withColumnBorders
                className="min-w-full divide-y divide-gray-200"
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Nama</Table.Th>
                    <Table.Th>Gaji Pokok</Table.Th>
                    <Table.Th>Tunjangan</Table.Th>
                    <Table.Th>Uang Makan</Table.Th>
                    <Table.Th>Aksi</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {displayedJabatan.map((jabatan) => (
                    <Table.Tr key={jabatan.id}>
                      <Table.Td>{jabatan.nama_jabatan}</Table.Td>
                      <Table.Td>{formatRupiah(jabatan.gapok)}</Table.Td>
                      <Table.Td>{formatRupiah(jabatan.tunjangan)}</Table.Td>
                      <Table.Td>{formatRupiah(jabatan.uang_makan)}</Table.Td>
                      <Table.Td>
                        <Button
                          onClick={() => handleDelete(jabatan.id)}
                          color="red"
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
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
