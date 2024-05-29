"use client";
import { useState } from "react";
import axios from "axios";
import { Button, Center, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

const AddProductPage = () => {
  const [nama, setNama] = useState("");
  const [berat, setBerat] = useState("");
  const [jumlahTotal, setJumlahTotal] = useState("");
  const [materialPendukung, setMaterialPendukung] = useState([
    { materialId: "", jumlah_material: "" },
  ]);
  const router = useRouter();

  const handleAddMaterial = () => {
    setMaterialPendukung([
      ...materialPendukung,
      { materialId: "", jumlah_material: "" },
    ]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newMaterials = [...materialPendukung];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setMaterialPendukung(newMaterials);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/produk", {
        nama,
        berat: parseInt(berat),
        jumlah_total: parseInt(jumlahTotal),
        material_pendukung: materialPendukung.map((mp) => ({
          materialId: parseInt(mp.materialId),
          jumlah_material: parseInt(mp.jumlah_material),
        })),
      });
      if (response.status === 201) {
        router.push("/products");
      }
    } catch (error) {
      console.error("Error adding produk:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 text-white">
      <Title order={1} className="text-center">
        Tambah Produk Baru
      </Title>
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto mt-6">
          <TextInput
            value={nama}
            onChange={(e) => setNama(e.currentTarget.value)}
            placeholder="Nama Produk"
            label="Nama Produk"
            required
          />
          <TextInput
            value={berat}
            onChange={(e) => setBerat(e.currentTarget.value)}
            placeholder="Berat"
            label="Berat"
            type="number"
            required
          />
          <TextInput
            value={jumlahTotal}
            onChange={(e) => setJumlahTotal(e.currentTarget.value)}
            placeholder="Jumlah Total"
            label="Jumlah Total"
            type="number"
            required
          />
          <div>
            <Title order={3}>Material Pendukung:</Title>
            {materialPendukung.map((mp, index) => (
              <div key={index}>
                <TextInput
                  value={mp.materialId}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "materialId",
                      e.currentTarget.value
                    )
                  }
                  placeholder="Material ID"
                  label="Material ID"
                  type="number"
                  required
                />
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
                  label="Jumlah"
                  type="number"
                  required
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddMaterial}
              className="mt-4"
            >
              Tambah Material
            </Button>
          </div>
          <Button type="submit" className="mt-4">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
