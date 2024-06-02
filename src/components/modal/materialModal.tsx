"use client";
import { useState } from "react";
import { Button, Modal, TextInput, Title } from "@mantine/core";
import axios from "axios";

const AddMaterialModal = ({ visible, onClose }) => {
  const [nama, setNama] = useState("");
  const [satuan, setSatuan] = useState("");
  const [jumlah, setJumlah] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/materials", {
        nama,
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

  return (
    <Modal opened={visible} onClose={onClose}>
      <div className="p-8">
        <Title order={1} className="text-center mb-8 text-black">
          Tambah Material Baru
        </Title>
        <div className="space-y-4">
          <TextInput
            value={nama}
            onChange={(event) => setNama(event.currentTarget.value)}
            placeholder="Nama Material"
            label="Nama Material"
            required
          />
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
