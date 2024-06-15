import { useState, useEffect } from "react";
import axios from "axios";
import { Material } from "../../interfaces/material";
import { Modal, TextInput, Title, Button, Notification } from "@mantine/core";

interface MaterialPendukung {
  materialId: number;
  jumlah_material: number;
}

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onProdukAdded: () => void;
  showNotification: (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => void;
}

const AddProductModal = ({
  visible,
  onClose,
  onProdukAdded,
  showNotification,
}: AddProductModalProps) => {
  const [nama, setNama] = useState("");
  const [berat, setBerat] = useState("");
  const [jumlahTotal, setJumlahTotal] = useState("");
  const [materialPendukung, setMaterialPendukung] = useState<
    MaterialPendukung[]
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
        showNotification("Produk berhasil ditambahkan!", "green");
        onProdukAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error adding produk:", error);
      showNotification("Gagal menambahkan produk!", "red");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = () => {
    setMaterialPendukung((prevMaterials) => [
      ...prevMaterials,
      { materialId: 0, jumlah_material: 0 },
    ]);
  };

  const handleInputChange = (
    index: number,
    field: keyof MaterialPendukung,
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
          <Notification color="red" className="absolute bottom-4 right-4">
            {error}
          </Notification>
        )}
      </div>
    </Modal>
  );
};

export default AddProductModal;
