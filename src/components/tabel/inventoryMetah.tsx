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

const InventoryTable: React.FC<Props> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newMaterialName, setNewMaterialName] = React.useState("");
  const [newMaterialAmount, setNewMaterialAmount] = React.useState("");

  const handleAddMaterial = () => {
    console.log(`Adding ${newMaterialAmount} of ${newMaterialName}`);

    setIsModalOpen(false);
  };

  return (
    <Container className="bg-[#3E3B64] p-6 rounded-lg">
      <Group mb="lg">
        <Text className="text-2xl font-semibold text-white">
          Stok Barang Mentah
        </Text>
        <Button
          leftSection={<FaFilter />}
          variant="light"
          className="bg-blue-500 text-white mr-4"
        >
          Filter
        </Button>

        <Button
          variant="light"
          className="bg-green-500 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Add Material
        </Button>
      </Group>
      <div className="overflow-x-auto">
        <Table
          striped
          highlightOnHover
          className="bg-[#3E3B64] text-white rounded-lg"
        >
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6">Tanggal Masuk</th>
              <th className="py-3 px-6">Nama Barang</th>
              <th className="py-3 px-6">Berat Bersih</th>
              <th className="py-3 px-6">Kuantitas</th>
              <th className="py-3 px-6">Masuk</th>
              <th className="py-3 px-6">Keluar</th>
              <th className="py-3 px-6">Saldo Akhir</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="py-3 px-6">{item.date}</td>
                <td className="py-3 px-6">{item.NamaBarang}</td>
                <td className="py-3 px-6">{item.BeratBersih}</td>
                <td className="py-3 px-6">{item.Kuantitas}</td>
                <td className="py-3 px-6">{item.masuk}</td>
                <td className="py-3 px-6">{item.keluar}</td>
                <td className="py-3 px-6">{item.saldoakhir}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Material"
        size="sm"
      >
        <Input
          value={newMaterialName}
          onChange={(event) => setNewMaterialName(event.currentTarget.value)}
          placeholder="Material Name"
        />
        <Input
          value={newMaterialAmount}
          onChange={(event) => setNewMaterialAmount(event.currentTarget.value)}
          placeholder="Amount"
        />
        <Button onClick={handleAddMaterial}>Add Material</Button>
      </Modal>
    </Container>
  );
};

export default InventoryTable;
