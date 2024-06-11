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
} from "@mantine/core";
import AddPackingModal from "../../components/modal/PackingModal";
import { Packing } from "../../interfaces/packing";

const PackingPage = () => {
  const [packings, setPackings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [packingToDelete, setPackingToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/packing");
      const uniquePackings = Array.from(
        new Set(response.data.map((packing) => packing.nama))
      ).map((name) => response.data.find((packing) => packing.nama === name));
      setPackings(uniquePackings);
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

  const openDeleteConfirmModal = (packing) => {
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
        await axios.post("api/totalPacking/decrement", {
          nama: packingToDelete.nama,
          jumlah: packingToDelete.jumlah_total,
        });
        fetchData();
        closeDeleteConfirmModal();
      } catch (error) {
        console.error("Error deleting packing:", error);
        setError("Error");
        closeDeleteConfirmModal();
      }
    }
  };

  return (
    <Container className=" mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Packing List</Title>
        <Button onClick={openModal}>Tambah Packing</Button>
        <AddPackingModal
          visible={isModalOpen}
          onClose={closeModal}
          onPackingAdded={fetchData}
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
                    Updated At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packings.map((packing) => (
                  <tr key={packing.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {packing.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {packing.jumlah}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(packing.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        onClick={() => openDeleteConfirmModal(packing)}
                        size="xs"
                        color="red"
                        variant="outline"
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
