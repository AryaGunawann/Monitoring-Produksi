// components/modal/ShippingModal.js
import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Title, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Product } from "../../interfaces/product";

interface AddShippingModalProps {
  visible: boolean;
  onClose: () => void;
  onShippingAdded: () => void;
  showNotification: (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => void;
}

const AddShippingModal = ({
  visible,
  onClose,
  onShippingAdded,
  showNotification,
}: AddShippingModalProps) => {
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    color: "blue" | "red" | "yellow" | "green";
  } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/api/totalPacking");
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [visible]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/shipping", {
        nama: selectedProduct,
        jumlah: parseInt(jumlah),
      });

      if (response.status === 201) {
        setNotification({
          message: "Material berhasil ditambahkan!",
          color: "green",
        });
        onShippingAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error adding shipping:", error);
      setNotification({ message: "Gagal menambahkan material!", color: "red" });
      showNotification("Gagal menambahkan material!", "red");
      onClose();
    }
  };

  return (
    <Modal opened={visible} onClose={onClose}>
      <div className="p-8">
        <Title order={1} className="text-center mb-8 text-black">
          Tambah Pengiriman
        </Title>
        <div className="space-y-4">
          <div>
            <label htmlFor="product">Pilih Produk:</label>
            <Select
              id="product"
              data={Array.from(
                new Set(productList.map((product) => product.nama))
              ).map((nama) => ({
                value: nama,
                label: nama,
              }))}
              value={selectedProduct}
              onChange={(value) => setSelectedProduct(value as string)}
              placeholder="Pilih Produk"
            />
          </div>
          <TextInput
            id="jumlah"
            value={jumlah}
            onChange={(event) => setJumlah(event.currentTarget.value)}
            placeholder="Jumlah"
            label="Jumlah"
            type="number"
            required
          />
        </div>
        <div className="flex justify-end mt-8 space-x-4">
          <Button onClick={onClose} variant="light">
            Batal
          </Button>
          <Button onClick={handleSubmit}>Tambah Pengiriman</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddShippingModal;
