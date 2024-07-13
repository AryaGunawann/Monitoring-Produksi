"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Loader,
  Alert,
  Title,
  Button,
  Container,
  Modal,
  Pagination,
  Table,
} from "@mantine/core";
import AddPegawaiModal from "../../components/modal/pegawaiModal";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";

interface Jabatan {
  id: number;
  nama_jabatan: string;
  gapok: number;
  tunjangan: number;
  uang_makan: string;
  createdAt: string;
  updatedAt: string;
}

interface Pegawai {
  id: number;
  nama: string;
  email: string;
  Jabatan: Jabatan;
  nik: number;
}

const PegawaiPage = () => {
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    color: "blue" | "red" | "yellow" | "green";
  } | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

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
  }, [notification]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const showNotification = (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => {
    setNotification({ message, color });
  };

  const handleAddEmployee = (newEmployee: Pegawai) => {
    setPegawaiList((prevList) => [...prevList, newEmployee]);
    closeModal();
  };

  const openDeleteConfirmation = (id: number) => {
    setSelectedEmployeeId(id);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setSelectedEmployeeId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await axios.delete(`/api/pegawai/${id}`);

      setPegawaiList((prevList) =>
        prevList.filter((pegawai) => pegawai.id !== id)
      );
    } catch (error) {
      setError("Error deleting employee: " + error);
    } finally {
      closeDeleteConfirmation();
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(pegawaiList.length / itemsPerPage);
  const displayedPegawai = pegawaiList.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container className="mx-auto py-8">
      <div className="flex justify-between mb-6">
        <Title order={1}>Daftar Pegawai</Title>
        <Button onClick={openModal}>Tambah Pegawai</Button>
        <AddPegawaiModal
          visible={isModalOpen}
          onClose={closeModal}
          onAdd={handleAddEmployee}
          showNotification={showNotification}
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
              <Table striped withColumnBorders className="min-w-full">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No.
                    </Table.Th>
                    <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIK
                    </Table.Th>
                    <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </Table.Th>
                    <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </Table.Th>
                    <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jabatan
                    </Table.Th>
                    <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {displayedPegawai.map((pegawai, index) => (
                    <Table.Tr key={pegawai.id}>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1 + (activePage - 1) * itemsPerPage}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pegawai.nik}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pegawai.nama}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pegawai.email}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pegawai.Jabatan?.nama_jabatan}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                        <Link href={`/pegawai/${pegawai.id}`} passHref>
                          <Button component="a" color="blue">
                            <MdPersonSearch />
                          </Button>
                        </Link>
                        <Button
                          color="red"
                          onClick={() => openDeleteConfirmation(pegawai.id)}
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
          {pegawaiList.length > itemsPerPage && (
            <Pagination
              value={activePage}
              onChange={(page: number) => setActivePage(page)}
              total={totalPages}
              className="mt-4"
            />
          )}
        </>
      )}
      {selectedEmployeeId && (
        <Modal
          opened={deleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
          title="Konfirmasi Penghapusan"
          size="sm"
        >
          <div>
            <p>Apakah Anda yakin ingin menghapus pegawai ini?</p>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => {
                  handleDeleteEmployee(selectedEmployeeId);
                  closeDeleteConfirmation();
                }}
                variant="outline"
                color="red"
                size="xs"
              >
                Ya, Hapus
              </Button>
              <Button onClick={closeDeleteConfirmation} className="ml-4">
                Batal
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default PegawaiPage;
