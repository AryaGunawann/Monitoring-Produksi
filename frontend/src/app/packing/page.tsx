"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Loader,
  Alert,
  Title,
  Button,
  Modal,
  Text,
  Container,
  Notification,
  Pagination,
  Table,
} from "@mantine/core";
import AddPackingModal from "../../components/modal/PackingModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../utils/date";
import { FaPlus } from "react-icons/fa";

interface IPacking {
  id: number;
  Produk: {
    nama: string;
  } | null;
  jumlah: number;
  updatedAt: string;
}

const PackingPage = () => {
  const [packings, setPackings] = useState<IPacking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<boolean>(false);
  const [packingToDelete, setPackingToDelete] = useState<IPacking | null>(null);
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
      const response = await axios.get<IPacking[]>("/api/packing");
      setPackings(response.data);
    } catch (error) {
      setError("Error fetching packings: " + error);
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

  const openDeleteConfirmModal = (packing: IPacking) => {
    setPackingToDelete(packing);
    setDeleteConfirmModal(true);
  };

  const closeDeleteConfirmModal = () => {
    setPackingToDelete(null);
    setDeleteConfirmModal(false);
  };

  const handleDeletePacking = async () => {
    if (packingToDelete) {
      try {
        await axios.delete(`/api/packing/${packingToDelete.id}`);
        fetchData();
        showNotification("Packing berhasil dihapus!", "green");
        closeDeleteConfirmModal();
      } catch (error) {
        console.error("Error deleting packing:", error);
        setError("Error deleting packing");
        showNotification("Gagal menghapus packing!", "red");
        closeDeleteConfirmModal();
      }
    }
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

  // Pagination logic
  const totalPages = Math.ceil(packings.length / itemsPerPage);
  const displayedPackings = packings.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const renderTableRows = () => {
    return displayedPackings.map((packing, index) => (
      <Table.Tr key={packing.id}>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1 + (activePage - 1) * itemsPerPage}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {`${packing.id} - ${packing.Produk?.nama || "nama tidak ditemukan"}`}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {packing.jumlah}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(new Date(packing.updatedAt))}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <Button
            onClick={() => openDeleteConfirmModal(packing)}
            size="xs"
            color="red"
          >
            <RiDeleteBin6Line />
          </Button>
        </Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <Container className="mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Packing List</Title>
        <Button onClick={openModal}>
          <FaPlus />
        </Button>
        <AddPackingModal
          visible={isModalOpen}
          onClose={closeModal}
          onPackingAdded={fetchData}
          showNotification={showNotification}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <Card shadow="sm" className="border rounded-lg p-4">
          <div className="overflow-x-auto">
            <Table
              striped
              withColumnBorders
              className="min-w-full divide-y divide-gray-200"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID | Nama
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{renderTableRows()}</Table.Tbody>
            </Table>
          </div>
        </Card>
      )}
      {packings.length > itemsPerPage && (
        <Pagination
          value={activePage}
          onChange={(page: number) => setActivePage(page)}
          total={totalPages}
          className="mt-4"
        />
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
      <Modal
        opened={deleteConfirmModal}
        onClose={closeDeleteConfirmModal}
        title="Konfirmasi Penghapusan"
      >
        <Text>Apakah Anda yakin ingin menghapus packing ini?</Text>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={closeDeleteConfirmModal}
            className="mr-2"
          >
            Batal
          </Button>
          <Button color="red" onClick={handleDeletePacking}>
            Hapus
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default PackingPage;
