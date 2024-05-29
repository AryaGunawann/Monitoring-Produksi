"use client";
import { useState } from "react";
import axios from "axios";
import { Button, TextInput, Title } from "@mantine/core";

const AddMaterialPage = () => {
  const [nama, setNama] = useState("");
  const [satuan, setSatuan] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/materials", {
        nama,
        satuan,
        jumlah: parseInt(jumlah),
      });
      console.log("Material added:", response.data);
      // Setelah berhasil menambahkan, Anda bisa melakukan navigasi ke halaman lain, atau menampilkan pesan sukses
    } catch (error) {
      setError("Error adding material: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 text-white">
      <Title order={1} className="text-white text-center">
        Tambah Material Baru
      </Title>
      <div className="max-w-md mx-auto mt-6">
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
        {error && <div className="text-red-500">{error}</div>}
        <Button
          className="mt-4"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Tambah Material
        </Button>
      </div>
    </div>
  );
};

export default AddMaterialPage;
