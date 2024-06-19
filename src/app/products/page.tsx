"use client";
import { useEffect, useState } from "react";
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
import AddProductModal from "../../components/modal/produkModal";
import { Product } from "../../interfaces/product";

const ProductsPage = () => {
  const [produk, setProduk] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [latestNewProduct, setLatestNewProduct] = useState<Product | null>(
    null
  );
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
      const response = await axios.get("/api/produk");
      setProduk(response.data);
      identifyLatestNewProduct(response.data);
    } catch (error) {
      console.error("Error fetching produk: " + error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteConfirmModal = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirmModal(true);
  };

  const closeDeleteConfirmModal = () => {
    setProductToDelete(null);
    setDeleteConfirmModal(false);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`/api/produk/tambah/${productToDelete.id}`);
        fetchData();
        closeDeleteConfirmModal();
      } catch (error) {
        console.error("Error deleting product:", error);
        closeDeleteConfirmModal();
      }
    }
  };

  const isNewProduct = (createdAt: string): boolean => {
    const productCreatedAt = new Date(createdAt);
    const now = new Date();
    const differenceInDays = Math.ceil(
      (now.getTime() - productCreatedAt.getTime()) / (1000 * 3600 * 24)
    );
    return differenceInDays <= 7;
  };

  const identifyLatestNewProduct = (products: Product[]): void => {
    const latestNewProductMap: Record<string, Product> = {};

    products.forEach((product) => {
      if (!latestNewProductMap[product.nama]) {
        latestNewProductMap[product.nama] = product;
      } else {
        const existingProduct = latestNewProductMap[product.nama];
        if (new Date(existingProduct.createdAt) < new Date(product.createdAt)) {
          latestNewProductMap[product.nama] = product;
        }
      }
    });

    let latestNew: Product | null = null;
    Object.values(latestNewProductMap).forEach((product) => {
      if (isNewProduct(product.createdAt)) {
        if (
          !latestNew ||
          new Date(latestNew.createdAt) < new Date(product.createdAt)
        ) {
          latestNew = product;
        }
      }
    });

    setLatestNewProduct(latestNew);
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

  const sortedProducts = [...produk].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const displayedProducts = sortedProducts.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container className="mx-auto py-8">
      <section className="flex justify-between mb-6 text-black">
        <Title order={1}>Product List</Title>
        <Button onClick={openModal}>Buat Product</Button>
        <AddProductModal
          visible={isModalOpen}
          onClose={closeModal}
          onProdukAdded={fetchData}
          showNotification={showNotification}
        />
      </section>
      <Card shadow="sm" className="border rounded-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID | Nama Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Berat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material Yang Digunakan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedProducts.map((p: Product) => {
                const updatedAt = new Date(p.createdAt);
                const formattedDate = updatedAt.toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const formattedTime = updatedAt.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
                return (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {p.id} - {p.nama}
                      {latestNewProduct && latestNewProduct.nama === p.nama && (
                        <span className="inline-block bg-green-500 text-white text-xs uppercase font-semibold px-2 py-1 rounded-md ml-2">
                          NEW
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.berat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.jumlah_total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <ul className="list-disc list-inside">
                        {p.material_pendukung.map((mp) => (
                          <li key={mp.id}>{mp.nama}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${formattedDate} (${formattedTime})`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        onClick={() => openDeleteConfirmModal(p)}
                        size="xs"
                        color="red"
                        variant="outline"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {produk.length > itemsPerPage && (
        <Pagination
          page={activePage}
          onChange={setActivePage}
          total={totalPages}
          className="mt-4"
        />
      )}
      <Modal
        opened={deleteConfirmModal}
        onClose={closeDeleteConfirmModal}
        title="Konfirmasi Penghapusan"
      >
        <Text>Apakah Anda yakin ingin menghapus produk ini?</Text>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={closeDeleteConfirmModal}
            className="mr-2"
          >
            Batal
          </Button>
          <Button color="red" onClick={handleDeleteProduct}>
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

export default ProductsPage;
