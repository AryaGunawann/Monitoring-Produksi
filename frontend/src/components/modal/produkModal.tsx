import { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  TextInput,
  Title,
  Button,
  Notification,
  useMantineTheme,
} from "@mantine/core";

interface Material {
  id: number;
  nama: string;
  jumlah: number;
}

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
  const theme = useMantineTheme();
  const [nama, setNama] = useState("");
  const [berat, setBerat] = useState("");
  const [beratPerItem, setBeratPerItem] = useState<number | null>(null);
  const [jumlahTotal, setJumlahTotal] = useState<number | null>(null);
  const [materialPendukung, setMaterialPendukung] = useState<
    MaterialPendukung[]
  >([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disableSimpan, setDisableSimpan] = useState(true);
  const [isNamaValid, setIsNamaValid] = useState(true); // State untuk validasi nama

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

  useEffect(() => {
    const isValid = () => {
      if (!nama || !berat || !jumlahTotal) return false;
      if (
        materialPendukung.some(
          (mp) => mp.materialId === 0 || mp.jumlah_material === 0
        )
      )
        return false;
      for (const mp of materialPendukung) {
        const material = materials.find((m) => m.id === mp.materialId);
        if (material && mp.jumlah_material > material.jumlah) {
          return false;
        }
      }
      return true;
    };

    setDisableSimpan(!isValid());
  }, [nama, berat, jumlahTotal, materialPendukung, materials]);

  useEffect(() => {
    setIsNamaValid(!nama.includes(" "));
  }, [nama]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/produk", {
        nama,
        berat: parseInt(berat),
        jumlah_total: parseInt(jumlahTotal!.toString()),
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
    if (beratPerItem && jumlahTotal) {
      const totalBerat = beratPerItem * jumlahTotal;
      setMaterialPendukung((prevMaterials) => [
        ...prevMaterials,
        { materialId: 0, jumlah_material: totalBerat },
      ]);
    } else {
      setMaterialPendukung((prevMaterials) => [
        ...prevMaterials,
        { materialId: 0, jumlah_material: 0 },
      ]);
    }
  };

  const handleJumlahTotalChange = (value: string) => {
    const jumlah = parseInt(value);
    setJumlahTotal(jumlah);

    if (beratPerItem) {
      const totalBerat = beratPerItem * jumlah;
      const newMaterials = materialPendukung.map((mp) => ({
        ...mp,
        jumlah_material: totalBerat,
      }));
      setMaterialPendukung(newMaterials);
    }
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
          error={
            nama && !isNamaValid
              ? "Nama produk tidak boleh mengandung spasi"
              : undefined
          }
        />
        <TextInput
          value={berat}
          onChange={(event) => setBerat(event.currentTarget.value)}
          placeholder="Berat"
          label="Berat"
          type="number"
          required
          onBlur={(event) =>
            setBeratPerItem(parseFloat(event.currentTarget.value))
          }
        />
        <TextInput
          value={jumlahTotal?.toString() || ""}
          onChange={(event) =>
            handleJumlahTotalChange(event.currentTarget.value)
          }
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
                    {material.nama} - {material.jumlah}
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
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={disableSimpan || !isNamaValid}
          >
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
