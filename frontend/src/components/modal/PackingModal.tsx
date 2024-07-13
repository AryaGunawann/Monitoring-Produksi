import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextInput,
  Title,
  Select,
  Container,
} from "@mantine/core";
import axios from "axios";
import { Product } from "../../utils/interfaces";

interface AddPackingModalProps {
  visible: boolean;
  onClose: () => void;
  onPackingAdded: () => void;
  showNotification: (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => void;
}

const AddPackingModal = ({
  visible,
  onClose,
  onPackingAdded,
  showNotification,
}: AddPackingModalProps) => {
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [maxPackingAllowed, setMaxPackingAllowed] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/packing", {
        produkId: parseInt(selectedProduct),
        jumlah: parseInt(jumlah),
      });
      if (response.status === 201 || response.status === 200) {
        showNotification("Material berhasil ditambahkan!", "green");
        onPackingAdded();
        onClose();
      } else {
        showNotification("Gagal menambahkan material!", "red");
        onClose();
      }
    } catch (error) {
      console.error("Error adding/updating material:", error);
      showNotification("Gagal menambahkan material!", "red");
      onClose();
    }
  };

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

    if (visible) {
      fetchProducts();
    }
  }, [visible]);

  useEffect(() => {
    if (selectedProduct) {
      const product = productList.find(
        (prod) => prod.id.toString() === selectedProduct
      );
      if (product) {
        setMaxPackingAllowed(product.jumlah_total);
      }
    }
  }, [selectedProduct, productList]);

  const isJumlahValid = () => {
    if (!jumlah || !selectedProduct) return false;
    const parsedJumlah = parseInt(jumlah);
    return parsedJumlah > 0 && parsedJumlah <= maxPackingAllowed;
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
                  label: `${product.id} - ${product.nama} - Jumlah ${product.jumlah_total}`,
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
          {!isJumlahValid() && (
            <div className="text-red-500 text-sm">
              Jumlah packing harus lebih dari 0 dan tidak boleh melebihi jumlah
              total produk ({maxPackingAllowed}).
            </div>
          )}
        </div>
        <div className="flex justify-end mt-8 space-x-4">
          <Button onClick={onClose} variant="light">
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={!isJumlahValid()}>
            Tambah Packing
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPackingModal;
