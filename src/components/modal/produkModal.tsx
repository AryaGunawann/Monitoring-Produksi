// Import dependencies
import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Title, Notification } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

interface Material {
  id: number;
  nama: string;
  satuan: string;
  jumlah: number;
}

interface AddProdukModalProps {
  visible: boolean;
  onClose: () => void;
  onProdukAdded: () => void;
}

// Define the component
const AddProductModal = ({
  visible,
  onClose,
  onProdukAdded,
}: AddProdukModalProps) => {
  // Define state variables
  const [nama, setNama] = useState("");
  const [berat, setBerat] = useState("");
  const [jumlahTotal, setJumlahTotal] = useState("");
  const [materialPendukung, setMaterialPendukung] = useState<
    { materialId: number; jumlah_material: number }[]
  >([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("/api/materials");
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Check if a product with the same name already exists
      const existingProductResponse = await axios.get(
        `/api/produk?nama=${nama}`
      );
      if (existingProductResponse.data.length > 0) {
        showNotification({
          title: "Duplikasi Produk",
          message:
            "Produk dengan nama ini sudah ada. Silahkan Hapus Terlebih Dahulu",
          color: "red",
          autoClose: 5000,
        });
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/produk", {
        nama,
        berat: parseInt(berat),
        jumlah_total: parseInt(jumlahTotal),
        material_pendukung: materialPendukung.map((mp) => ({
          id: mp.materialId,
          jumlah: mp.jumlah_material,
        })),
      });

      if (response.status === 201 || response.status === 200) {
        showNotification({
          title: "Sukses",
          message: "Produk berhasil ditambahkan!",
          color: "green",
          autoClose: 5000,
        });
        onProdukAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error adding produk:", error);
      showNotification({
        title: "Gagal",
        message: "Gagal membuat Produk!",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  // Handle adding new material
  const handleAddMaterial = () => {
    setMaterialPendukung((prevMaterials) => [
      ...prevMaterials,
      { materialId: 0, jumlah_material: 0 },
    ]);
  };

  const handleInputChange = (
    index: number,
    field: keyof (typeof materialPendukung)[0],
    value: string
  ) => {
    const newMaterials = [...materialPendukung];
    newMaterials[index][field] = parseInt(value);
    setMaterialPendukung(newMaterials);
  };

  return (
    <Modal opened={visible} onClose={onClose}>
      <Title order={1} className="text-black text-center">
        Tambah Produk Baru
      </Title>
      <div className="max-w-md mx-auto mt-6">
        <TextInput
          value={nama}
          onChange={(event) => setNama(event.currentTarget.value)}
          placeholder="Nama Produk"
          label="Nama Produk"
          required
        />
        <TextInput
          value={berat}
          onChange={(event) => setBerat(event.currentTarget.value)}
          placeholder="Berat"
          label="Berat (gram)"
          type="number"
          required
        />
        <TextInput
          value={jumlahTotal}
          onChange={(event) => setJumlahTotal(event.currentTarget.value)}
          placeholder="Jumlah Total"
          label="Jumlah yang akan dibuat"
          type="number"
          required
        />
        <div className="mt-4">
          {materialPendukung.map((mp, index) => (
            <div key={index} className="mb-4">
              <select
                value={mp.materialId}
                onChange={(e) =>
                  handleInputChange(index, "materialId", e.target.value)
                }
                required
              >
                <option value="">Pilih Material</option>
                {materials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.nama}
                  </option>
                ))}
              </select>

              <TextInput
                value={mp.jumlah_material}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "jumlah_material",
                    e.currentTarget.value
                  )
                }
                placeholder="Jumlah"
                label={`Jumlah Material ${index + 1}`}
                type="number"
                required
              />
            </div>
          ))}
        </div>
        <Button onClick={handleAddMaterial}>Tambah Material</Button>
        <div className="mt-4">
          <Button onClick={handleSubmit} loading={loading}>
            Simpan
          </Button>
          <Button onClick={onClose} variant="light" className="ml-2">
            Batal
          </Button>
        </div>
        {error && (
          <Notification color="red" className=" w-44">
            {error}
          </Notification>
        )}{" "}
      </div>
    </Modal>
  );
};

// Export the component
export default AddProductModal;
