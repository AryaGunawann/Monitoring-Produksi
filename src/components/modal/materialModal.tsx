import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Title, Select } from "@mantine/core";
import axios from "axios";
import { Material } from "../../interfaces/material";

interface AddMaterialModalProps {
  visible: boolean;
  onClose: () => void;
  onMaterialUpdated: () => void; // Tambahkan prop ini untuk memberitahu parent component
}

const AddMaterialModal = ({
  visible,
  onClose,
  onMaterialUpdated,
}: AddMaterialModalProps) => {
  const [satuan, setSatuan] = useState<string>("");
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [materialList, setMaterialList] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState<string>("");
  const [showNewMaterialInput, setShowNewMaterialInput] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState<boolean>(false);

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
      let response;

      // Mencari material yang dipilih dalam daftar material
      const existingMaterial = materialList.find(
        (material) => material.nama === selectedMaterial
      );

      // Jika menggunakan material baru atau material belum ada dalam daftar
      if (showNewMaterialInput || !existingMaterial) {
        response = await axios.post("/api/materials", {
          nama: newMaterial || selectedMaterial,
          satuan,
          jumlah: parseInt(jumlah),
        });
      } else {
        // Jika menggunakan material yang sudah ada dalam daftar, tambahkan jumlah baru
        response = await axios.put(
          `/api/materials/tambah/${existingMaterial.id}`,
          {
            jumlah: parseInt(jumlah), // Hanya tambahkan jumlah baru
          }
        );
      }

      if (response.status === 201 || response.status === 200) {
        onMaterialUpdated(); // Beritahu parent component bahwa material telah diperbarui
        onClose();
        setAlertMessage("Material berhasil ditambahkan atau diperbarui!");
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Error adding/updating material:", error);
      setAlertMessage(
        "Terjadi kesalahan saat menambahkan atau memperbarui material."
      );
      setAlertVisible(true);
    }
  };

  const handleMaterialChange = (material: string) => {
    if (material === "new") {
      setShowNewMaterialInput(true);
      setSelectedMaterial("");
      setSatuan(""); // Reset satuan jika memilih material baru
    } else {
      setShowNewMaterialInput(false);
      setSelectedMaterial(material);

      // Set satuan sesuai dengan material yang dipilih
      const selected = materialList.find((m) => m.nama === material);
      if (selected) {
        setSatuan(selected.satuan);
      }
    }
  };

  const handleNewMaterialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMaterial(event.currentTarget.value);
  };

  return (
    <>
      {alertVisible && (
        <div className="alert alert-success">
          {alertMessage}
          <Button onClick={() => setAlertVisible(false)}>Close</Button>
        </div>
      )}
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
              required={!selectedMaterial || showNewMaterialInput}
              disabled={!showNewMaterialInput && !!selectedMaterial} // Disable input jika material sudah ada
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
    </>
  );
};

export default AddMaterialModal;
