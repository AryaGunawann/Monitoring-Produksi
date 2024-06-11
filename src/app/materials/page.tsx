"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Material } from "../../interfaces/material";
import { Card, Loader, Alert, Title, Button, Container } from "@mantine/core";
import AddMaterialModal from "../../components/modal/materialModal";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get<Material[]>("/api/materials");
      const sortedMaterials = response.data.sort(
        (a: Material, b: Material) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setMaterials(sortedMaterials);
    } catch (error) {
      setError("Error fetching materials: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleModalVisibility = (isVisible: boolean) => {
    setModalVisible(isVisible);
  };

  return (
    <Container className=" mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Daftar Material</Title>
        <Button onClick={() => handleModalVisibility(true)}>
          Tambah Material
        </Button>
        <AddMaterialModal
          visible={modalVisible}
          onClose={() => handleModalVisibility(false)}
          onMaterialAdded={fetchMaterials}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <Card shadow="sm" className="border rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Material
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satuan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {materials.map((material) => {
                  const updatedAt = new Date(material.updatedAt);
                  const formattedDate = updatedAt.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  const formattedTime = updatedAt.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });

                  return (
                    <tr
                      key={material.id}
                      className={material.jumlah === 0 ? "bg-red-100" : ""}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {material.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.satuan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.jumlah}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {`${formattedDate} ${formattedTime}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default MaterialsPage;
