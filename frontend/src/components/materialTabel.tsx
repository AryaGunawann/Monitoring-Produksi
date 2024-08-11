"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Material } from "../utils/interfaces";
import { Loader, Alert, Title, Card, Table, Container } from "@mantine/core";

const MaterialsTabel = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/materials");
        setMaterials(response.data);
      } catch (error) {
        setError("Error fetching materials: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="c mx-auto py-8">
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <Card shadow="sm" className="border rounded-lg p-4">
          <div className="overflow-x-auto">
            <Table
              striped
              withColumnBorders
              className="min-w-full divide-y divide-gray-200"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Material
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satuan
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </Table.Th>
                  <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody className="bg-white divide-y divide-gray-200">
                {materials.map((material, index) => {
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
                    <Table.Tr key={material.id}>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {material.nama}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.satuan}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {material.jumlah}
                      </Table.Td>
                      <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {`${formattedDate} ${formattedTime}`}
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default MaterialsTabel;
