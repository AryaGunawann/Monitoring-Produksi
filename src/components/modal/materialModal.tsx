import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextInput,
  Title,
  Select,
  Notification,
} from "@mantine/core";
import axios from "axios";
import { Material } from "../../interfaces/material";

interface AddMaterialModalProps {
  visible: boolean;
  onClose: () => void;
  onMaterialAdded: () => void;
  showNotification: (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => void;
}

const AddMaterialModal = ({
  visible,
  onClose,
  onMaterialAdded,
  showNotification,
}: AddMaterialModalProps) => {
  const [satuan, setSatuan] = useState<string>("");
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [materialList, setMaterialList] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState<string>("");
  const [showNewMaterialInput, setShowNewMaterialInput] =
    useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    color: "blue" | "red" | "yellow" | "green";
  } | null>(null);

  useEffect(() => {
    if (visible) {
      fetchMaterials();
    }
  }, [visible]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get<Material[]>("/api/materials");
      setMaterialList(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      let response;

      const existingMaterial = materialList.find(
        (material) => material.nama === selectedMaterial
      );

      if (showNewMaterialInput || !existingMaterial) {
        response = await axios.post("/api/materials", {
          nama: newMaterial || selectedMaterial,
          satuan,
          jumlah: parseInt(jumlah),
        });
      } else {
        response = await axios.put(
          `/api/materials/tambah/${existingMaterial.id}`,
          {
            jumlah: parseInt(jumlah),
          }
        );
      }

      if (response.status === 201 || response.status === 200) {
        setNotification({
          message: "Material berhasil ditambahkan!",
          color: "green",
        });
        onMaterialAdded();
        showNotification("Material berhasil ditambahkan!", "green");
        onClose();
      }
    } catch (error) {
      console.error("Error adding/updating material:", error);
      setNotification({ message: "Gagal menambahkan material!", color: "red" });
      showNotification("Gagal menambahkan material!", "red");
    }
  };

  const handleMaterialChange = (material: string) => {
    if (material === "new") {
      setShowNewMaterialInput(true);
      setSelectedMaterial("");
      setSatuan("");
    } else {
      setShowNewMaterialInput(false);
      setSelectedMaterial(material);
      const existingMaterial = materialList.find(
        (mat) => mat.nama === material
      );
      if (existingMaterial) {
        setSatuan(existingMaterial.satuan);
      }
    }
  };

  const handleNewMaterialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMaterial(event.currentTarget.value);
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <Modal opened={visible} onClose={onClose}>
      <div className="p-8">
        <Title order={1} className="text-center mb-8 text-black">
          Tambah Material Baru
        </Title>
        <div className="space-y-4">
          <div>
            <label htmlFor="material">Pilih Material:</label>
            <Select
              id="material"
              data={[
                ...materialList.map((material) => ({
                  value: material.nama,
                  label: material.nama,
                })),
                { value: "new", label: "Material tidak ada dalam daftar" },
              ]}
              value={selectedMaterial}
              onChange={(value) => handleMaterialChange(value as string)}
              placeholder="Pilih Material"
            />
          </div>
          {showNewMaterialInput && (
            <div>
              <TextInput
                id="new-material"
                value={newMaterial}
                onChange={handleNewMaterialChange}
                placeholder="Nama Material Baru"
                label="Nama Material Baru"
                required
              />
            </div>
          )}
          <TextInput
            id="satuan"
            value={satuan}
            onChange={(event) => setSatuan(event.currentTarget.value)}
            placeholder="Satuan"
            label="Satuan"
            required={!showNewMaterialInput}
            disabled={!showNewMaterialInput && !!selectedMaterial}
          />
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
          <Button onClick={handleSubmit}>Tambah Material</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMaterialModal;
