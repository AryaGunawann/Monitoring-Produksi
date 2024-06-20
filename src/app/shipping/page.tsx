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
} from "@mantine/core";
import AddShippingModal from "../../components/modal/shippingModal";

// Interface definitions
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

interface NotificationType {
  message: string;
  color: "blue" | "red" | "yellow" | "green";
  autoClose: boolean;
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
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
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
        console.error("Error deleting shipping:", error);
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

  const handleConfirmStatusChange = (id: number) => {
    const selected = shippings.find((shipping) => shipping.id === id);
    if (selected) {
      setSelectedShipping(selected);
      setConfirmationModalOpen(true);
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
    setNotification({ message, color, autoClose });
  };

  // Pagination logic
  const totalPages = Math.ceil(shippings.length / itemsPerPage);
  const displayedShippings = shippings.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container className="mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Daftar Pengiriman</Title>
        <Button onClick={openModal}>Tambah Pengiriman</Button>
        <AddShippingModal
          visible={isModalOpen}
          onClose={closeModal}
          onShippingAdded={fetchData}
          showNotification={showNotification}
        />
      </div>

      <Card shadow="sm" className="border rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID | Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedShippings.map((shipping, index) => (
                <tr key={shipping.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1 + (activePage - 1) * itemsPerPage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shipping.id} - {shipping.Packing?.Produk?.nama || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipping.jumlah}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipping.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(shipping.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    {shipping.status === "Proses" && (
                      <>
                        <Button
                          variant="outline"
                          color="blue"
                          onClick={() => handleConfirmStatusChange(shipping.id)}
                        >
                          Pending
                        </Button>
                        <Button
                          variant="outline"
                          color="blue"
                          onClick={() => handleConfirmStatusChange(shipping.id)}
                        >
                          Dikirim
                        </Button>
                      </>
                    )}
                    {shipping.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          color="blue"
                          onClick={() => handleConfirmStatusChange(shipping.id)}
                        >
                          Dikirim
                        </Button>
                      </>
                    )}

                    <Button
                      variant="outline"
                      color="red"
                      onClick={() => {
                        setSelectedShipping(shipping);
                        setDeleteConfirmationModalOpen(true);
                      }}
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

      {shippings.length > itemsPerPage && (
        <Pagination
          page={activePage}
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
