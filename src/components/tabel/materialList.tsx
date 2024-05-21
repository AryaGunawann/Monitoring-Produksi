"use client";
import React from "react";
import {
  Container,
  Table,
  Button,
  Group,
  Text,
  Modal,
  Input,
} from "@mantine/core";
import { FaFilter } from "react-icons/fa";
import { MaterialItem } from "../data/material";

interface Props {
  data: MaterialItem[];
}

const MaterialList: React.FC<Props> = ({ data }) => {
  const [isAddMaterialModalOpen, setIsAddMaterialModalOpen] =
    React.useState(false);
  const [isStockMaterialModalOpen, setIsStockMaterialModalOpen] =
    React.useState(false);
  const [newMaterialName, setNewMaterialName] = React.useState("");
  const [newMaterialSatuan, setNewMaterialSatuan] = React.useState("");
  const [newMaterialStock, setNewMaterialStock] = React.useState<number>(0);

  const handleAddMaterial = () => {
    console.log(
      `Adding new material: ${newMaterialName}, Satuan: ${newMaterialSatuan}, Stock: ${newMaterialStock}`
    );
    setIsAddMaterialModalOpen(false);
  };

  const handleAddStockMaterial = () => {
    console.log(`Adding stock: ${newMaterialStock} to existing material`);
    setIsStockMaterialModalOpen(false);
  };

  return (
    <Container className="bg-[#3E3B64] p-6 rounded-lg">
      <Group position="apart" mb="lg">
        <Text className="text-2xl font-semibold text-white">Material List</Text>
        <div>
          <Button
            leftSection={<FaFilter />}
            variant="light"
            className="bg-blue-500 text-white mr-2"
            onClick={() => console.log("Filter Clicked")}
          >
            Filter
          </Button>
          <Button
            variant="light"
            className="bg-green-500 text-white mr-2"
            onClick={() => setIsAddMaterialModalOpen(true)}
          >
            Add Material
          </Button>
        </div>
      </Group>
      <div className="overflow-x-auto">
        <Table
          striped
          highlightOnHover
          className="bg-[#3E3B64] text-white rounded-lg"
        >
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6">No.</th>
              <th className="py-3 px-6">Nama Material</th>
              <th className="py-3 px-6">Satuan</th>
              <th className="py-3 px-6">Stok</th>
              <th className="py-3 px-6">Last Update</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item.NamaBarang}</td>
                <td className="py-3 px-6">{item.Satuan}</td>
                <td className="py-3 px-6">{item.Stok}</td>
                <td className="py-3 px-6">{item.lastUpdate}</td>
                <td className="py-3 px-6">
                  <Button
                    variant="light"
                    className="bg-blue-500 text-white mr-2"
                  >
                    Lihat Detail
                  </Button>
                  <Button
                    variant="light"
                    className="bg-yellow-500 text-white"
                    onClick={() => setIsStockMaterialModalOpen(true)}
                  >
                    + Stock Material
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal
        opened={isAddMaterialModalOpen}
        onClose={() => setIsAddMaterialModalOpen(false)}
        title="Add Material"
        size="sm"
      >
        <Input
          value={newMaterialName}
          onChange={(event) => setNewMaterialName(event.currentTarget.value)}
          placeholder="Material Name"
          mb="sm"
        />
        <Input
          value={newMaterialSatuan}
          onChange={(event) => setNewMaterialSatuan(event.currentTarget.value)}
          placeholder="Satuan"
          mb="sm"
        />
        <Input
          value={newMaterialStock}
          onChange={(event) =>
            setNewMaterialStock(Number(event.currentTarget.value))
          }
          placeholder="Stock"
          mb="sm"
        />
        <Button onClick={handleAddMaterial}>Add Material</Button>
      </Modal>
      <Modal
        opened={isStockMaterialModalOpen}
        onClose={() => setIsStockMaterialModalOpen(false)}
        title="+ Stock Material"
        size="sm"
      >
        <Input
          value={newMaterialStock}
          onChange={(event) =>
            setNewMaterialStock(Number(event.currentTarget.value))
          }
          placeholder="Add Stock"
          mb="sm"
        />
        <Button onClick={handleAddStockMaterial}>Add Stock</Button>
      </Modal>
    </Container>
  );
};

export default MaterialList;
