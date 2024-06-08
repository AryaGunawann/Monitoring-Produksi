"use client";
import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Title, Select } from "@mantine/core";
import { Material } from "../../interfaces/material";
import axios from "axios";

interface AddMaterialModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddMaterialModal = ({ visible, onClose }: AddMaterialModalProps) => {
  const [satuan, setSatuan] = useState<string>("");
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [materialList, setMaterialList] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState<string>("");
  const [showNewMaterialInput, setShowNewMaterialInput] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get<Material[]>("/api/materials");
        setMaterialList(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/materials", {
        nama: showNewMaterialInput ? newMaterial : selectedMaterial,
        satuan,
        jumlah: parseInt(jumlah),
      });
      if (response.status === 201) {
        onClose();
      }
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  const handleMaterialChange = (material: string) => {
    if (material === "new") {
      setShowNewMaterialInput(true);
      setSelectedMaterial("");
    } else {
      setShowNewMaterialInput(false);
      setSelectedMaterial(material);
    }
  };

  const handleNewMaterialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMaterial(event.currentTarget.value);
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
              data={[
                ...materialList.map((material) => ({
                  value: material.nama,
                  label: material.nama,
                })),
                { value: "new", label: "Material tidak ada dalam daftar" },
              ]}
              value={selectedMaterial}
              onChange={(value) => handleMaterialChange(value)}
              placeholder="Pilih Material"
            />
          </div>
          {showNewMaterialInput && (
            <div>
              <TextInput
                value={newMaterial}
                onChange={handleNewMaterialChange}
                placeholder="Nama Material Baru"
                label="Nama Material Baru"
                required
              />
            </div>
          )}
          <TextInput
            value={satuan}
            onChange={(event) => setSatuan(event.currentTarget.value)}
            placeholder="Satuan"
            label="Satuan"
            required
          />
          <TextInput
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
