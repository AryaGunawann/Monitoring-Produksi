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
  Notification,
  Modal,
  Pagination,
} from "@mantine/core";
import AddPegawaiModal from "../../components/modal/pegawaiModal";
import Link from "next/link";

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
    console.log("Modal closed");
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
    console.log("New Employee:", newEmployee);
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
      <div className="flex justify-between mb-6 text-black">
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
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIK
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jabatan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedPegawai.map((pegawai, index) => (
                    <tr key={pegawai.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1 + (activePage - 1) * itemsPerPage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pegawai.nik}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pegawai.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pegawai.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pegawai.Jabatan?.nama_jabatan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                        <Link href={`/pegawai/${pegawai.id}`} passHref>
                          <Button component="a" color="blue">
                            Detail
                          </Button>
                        </Link>
                        <Button
                          color="red"
                          onClick={() => openDeleteConfirmation(pegawai.id)}
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
          {pegawaiList.length > itemsPerPage && (
            <Pagination
              page={activePage}
              onChange={setActivePage}
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
