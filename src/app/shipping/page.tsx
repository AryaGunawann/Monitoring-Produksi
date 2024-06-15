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
} from "@mantine/core";
import AddShippingModal from "../../components/modal/ShippingModal";

const ShippingPage = () => {
  const [shippings, setShippings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    color: "blue" | "red" | "yellow" | "green";
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/shipping");
      setShippings(response.data);
    } catch (error) {
      setError("Error fetching shippings: " + error);
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

  const handleStatusChange = async (shipping) => {
    if (shipping.status === "Proses") {
      // Update status to "Dikirim"
      try {
        await axios.put(`/api/shipping/${shipping.id}`, { status: "Dikirim" });
        setShippings((prevShippings) =>
          prevShippings.map((item) =>
            item.id === shipping.id ? { ...item, status: "Dikirim" } : item
          )
        );
        showNotification(
          "Status pengiriman diperbarui menjadi Dikirim",
          "green"
        );
      } catch (error) {
        console.error("Error updating shipping status:", error);
        showNotification("Gagal memperbarui status pengiriman", "red");
      }
    } else {
      // Open confirmation modal
      setSelectedShipping(shipping);
      setConfirmationModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedShipping) {
      try {
        await axios.delete(`/api/shipping/${selectedShipping.id}`);
        setShippings((prevShippings) =>
          prevShippings.filter((item) => item.id !== selectedShipping.id)
        );
        showNotification("Pengiriman berhasil dihapus!", "green");
      } catch (error) {
        console.error("Error deleting shipping:", error);
        showNotification("Gagal menghapus pengiriman!", "red");
      } finally {
        setConfirmationModalOpen(false);
        setSelectedShipping(null);
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
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shippings.map((shipping) => (
                  <tr key={shipping.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {shipping.nama}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        variant="light"
                        onClick={() => handleStatusChange(shipping)}
                      >
                        {shipping.status === "Proses" ? "Proses" : "Dikirim"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      <Modal
        opened={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <Text>Apakah pengiriman ini sudah selesai?</Text>
        <div className="flex justify-end mt-4 space-x-4">
          <Button
            variant="outline"
            onClick={() => setConfirmationModalOpen(false)}
          >
            Batal
          </Button>
          <Button color="red" onClick={handleConfirmDelete}>
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
