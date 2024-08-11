"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Title,
  Button,
  Modal,
  Text,
  Container,
  Notification,
  Pagination,
  Table,
} from "@mantine/core";
import AddShippingModal from "../../components/modal/shippingModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../utils/date";
import { FaPlus } from "react-icons/fa";

interface Shipping {
  id: number;
  Packing?: {
    Produk?: {
      nama: string;
    };
  };
  jumlah: number;
  status: string;
  updatedAt: string;
}

const ShippingPage = () => {
  const [shippings, setShippings] = useState<Shipping[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<Shipping | null>(
    null
  );
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
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
      const response = await axios.get("/api/shipping");
      setShippings(response.data);
    } catch (error) {
      console.error("Error fetching shippings:", error);
      showNotification("Error fetching shippings", "red", true);
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

  const handleConfirmDelete = async (confirmReceived: boolean) => {
    if (selectedShipping) {
      try {
        if (confirmReceived) {
          await axios.delete(`/api/shipping/${selectedShipping.id}`);
          setShippings((prevShippings) =>
            prevShippings.filter((item) => item.id !== selectedShipping.id)
          );
          showNotification("Pengiriman berhasil dihapus!", "green", false);
        } else {
          showNotification("Pengiriman tidak dihapus.", "blue", true);
        }
      } catch (error) {
        showNotification("Gagal menghapus pengiriman!", "red", true);
      } finally {
        setDeleteConfirmationModalOpen(false);
        setSelectedShipping(null);
      }
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.put(`/api/shipping/${id}/status`, { status });
      setShippings((prevShippings) =>
        prevShippings.map((shipping) =>
          shipping.id === id ? { ...shipping, status } : shipping
        )
      );
      showNotification(
        `Status berhasil diubah menjadi ${status}!`,
        "green",
        false
      );
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification("Gagal mengubah status!", "red", true);
    }
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const showNotification = (
    message: string,
    color: "blue" | "red" | "yellow" | "green",
    autoClose: boolean
  ) => {
    setNotification({ message, color });
  };

  // Pagination logic
  const totalPages = Math.ceil(shippings.length / itemsPerPage);
  const displayedShippings = shippings.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const renderTableRows = () => {
    return displayedShippings.map((shipping, index) => (
      <Table.Tr key={shipping.id}>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1 + (activePage - 1) * itemsPerPage}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {`${shipping.id} - ${shipping.Packing?.Produk?.nama || "N/A"}`}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {shipping.jumlah}
        </Table.Td>

        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(new Date(shipping.updatedAt))}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
          <Button
            color="red"
            onClick={() => {
              setSelectedShipping(shipping);
              setDeleteConfirmationModalOpen(true);
            }}
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
        <Title order={1}>Daftar Pengiriman</Title>
        <Button onClick={openModal}>
          <FaPlus />
        </Button>
        <AddShippingModal
          visible={isModalOpen}
          onClose={closeModal}
          onShippingAdded={fetchData}
          showNotification={showNotification}
        />
      </div>

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
                {/* <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </Table.Th> */}
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

      {shippings.length > itemsPerPage && (
        <Pagination
          value={activePage}
          onChange={setActivePage}
          total={totalPages}
          className="mt-4"
        />
      )}

      <Modal
        opened={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        title="Konfirmasi Ubah Status"
      >
        <Text>Apakah Anda ingin mengubah status pengiriman ini?</Text>
        <div className="flex justify-end mt-4 space-x-4">
          <Button
            variant="outline"
            onClick={() => setConfirmationModalOpen(false)}
          >
            Batal
          </Button>
          {selectedShipping?.status === "Proses" && (
            <>
              <Button
                color="blue"
                onClick={() => {
                  updateStatus(selectedShipping!.id, "pending");
                  setConfirmationModalOpen(false);
                }}
              >
                Pending
              </Button>
              <Button
                color="blue"
                onClick={() => {
                  updateStatus(selectedShipping!.id, "dikirim");
                  setConfirmationModalOpen(false);
                }}
              >
                Dikirim
              </Button>
            </>
          )}
          {selectedShipping?.status === "pending" && (
            <>
              <Button
                color="blue"
                onClick={() => {
                  updateStatus(selectedShipping!.id, "dikirim");
                  setConfirmationModalOpen(false);
                }}
              >
                Dikirim
              </Button>
            </>
          )}
        </div>
      </Modal>

      <Modal
        opened={deleteConfirmationModalOpen}
        onClose={() => setDeleteConfirmationModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <Text>Apakah Anda yakin ingin menghapus pengiriman ini?</Text>
        <div className="flex justify-end mt-4 space-x-4">
          <Button
            variant="outline"
            onClick={() => setDeleteConfirmationModalOpen(false)}
          >
            Batal
          </Button>
          <Button color="red" onClick={() => handleConfirmDelete(true)}>
            Hapus
          </Button>
        </div>
      </Modal>

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

export default ShippingPage;
