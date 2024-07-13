"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Card,
  Title,
  Button,
  Container,
  Notification,
  Pagination,
  Table,
} from "@mantine/core";
import AddMaterialModal from "../../components/modal/materialModal";
import { Material } from "../../utils/interfaces";
import { FaPlus } from "react-icons/fa";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    color: "blue" | "red" | "yellow" | "green";
  } | null>(null);
  const [activePage, setActivePage] = useState<number>(1);

  const itemsPerPage = 10;

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

  const handleNotificationClose = () => {
    setNotification(null);
  };

  const showNotification = (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => {
    setNotification({ message, color });
  };

  const displayedMaterials = useMemo(() => {
    return materials.slice(
      (activePage - 1) * itemsPerPage,
      activePage * itemsPerPage
    );
  }, [materials, activePage, itemsPerPage]);

  return (
    <Container className="mx-auto py-8 relative">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Daftar Material</Title>
        <Button onClick={() => handleModalVisibility(true)}>
          <FaPlus />
        </Button>
        <AddMaterialModal
          visible={modalVisible}
          onClose={() => handleModalVisibility(false)}
          onMaterialAdded={fetchMaterials}
          showNotification={showNotification}
        />
      </div>
      <Card shadow="sm" className="border rounded-lg p-4 relative">
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
                  ID | Nama Material
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
              {displayedMaterials.map((material, index) => {
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
                  <Table.Tr
                    key={material.id}
                    className={material.jumlah === 0 ? "bg-red-100" : ""}
                  >
                    <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(activePage - 1) * itemsPerPage + index + 1}
                    </Table.Td>
                    <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className="text-gray-400 font-light">
                        {material.id}
                      </span>{" "}
                      | {material.nama}
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
      {materials.length > itemsPerPage && (
        <Pagination
          value={activePage}
          onChange={(page: number) => setActivePage(page)}
          total={Math.ceil(materials.length / itemsPerPage)}
          className="mt-6"
        />
      )}
      {notification && (
        <Notification
          color={notification.color}
          onClose={handleNotificationClose}
          className="absolute bottom-4 right-4"
        >
          {notification.message}
        </Notification>
      )}
    </Container>
  );
};

export default MaterialsPage;
