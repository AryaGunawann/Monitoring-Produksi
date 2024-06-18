import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextInput,
  Title,
  Select,
  Container,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Product } from "../../interfaces/product";

interface AddPackingModalProps {
  visible: boolean;
  onClose: () => void;
  onPackingAdded: () => void;
}

const AddPackingModal = ({
  visible,
  onClose,
  onPackingAdded,
}: AddPackingModalProps) => {
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/api/produk");
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFetchError("Error fetching products");
      }
    };

    fetchProducts();
  }, [visible]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/packing", {
        produkId: parseInt(selectedProduct),
        jumlah: parseInt(jumlah),
      });

      if (response.status === 201) {
        showNotification({
          title: "Berhasil",
          message: "Produk berhasil dikemas!",
          color: "green",
          autoClose: 5000,
        });
        onPackingAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error adding packing:", error);
      showNotification({
        title: "Gagal",
        message: "Gagal melakukan pengemasan produk!",
        color: "red",
        autoClose: 5000,
      });
      onClose();
    }
  };

  return (
    <Modal opened={visible} onClose={onClose}>
      <div className="p-8">
        <Title order={1} className="text-center mb-8 text-black">
          Tambah Packing
        </Title>
        <div className="space-y-4">
          {fetchError ? (
            <div className="text-red-500">{fetchError}</div>
          ) : (
            <div>
              <label htmlFor="product">Pilih Produk:</label>
              <Select
                id="product"
                data={productList.map((product) => ({
                  value: product.id.toString(),
                  label: `${product.id} - ${product.nama} - Jumlah ${product.jumlah_total} `,
                }))}
                value={selectedProduct}
                onChange={(value) => setSelectedProduct(value as string)}
                placeholder="Pilih Produk"
              />
            </div>
          )}
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
          <Button onClick={handleSubmit}>Tambah Packing</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPackingModal;
