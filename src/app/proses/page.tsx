"use client";
import React from "react";
import { Container, Text, Tabs } from "@mantine/core";

import { MaterialItem } from "../../components/data/material";
import InventoryTable from "../../components/tabel/inventoryMetah";

const processData: MaterialItem[] = [
  {
    date: "05 Mar 2023",
    NamaBarang: "Aluminium",
    BeratBersih: "50 kg",
    Kuantitas: "10,000 kg",

    masuk: 200,
    keluar: 0,
    saldoakhir: 200,
  },
  {
    date: "12 Nov 2022",
    NamaBarang: "Besi",
    BeratBersih: "25 kg",
    Kuantitas: "999 kg",

    masuk: 200,
    keluar: 0,
    saldoakhir: 200,
  },
  {
    date: "30 Mar 2023",
    NamaBarang: "Plastik",
    BeratBersih: "30 kg",
    Kuantitas: "2000 kg",

    masuk: 300,
    keluar: 0,
    saldoakhir: 300,
  },
];

const ProcessPage: React.FC = () => {
  return (
    <Container className="bg-[#3E3B64] p-6 rounded-lg">
      <Text className="text-2xl font-semibold text-white mb-4">
        Proses Produksi
      </Text>
      <Tabs defaultValue="bahan">
        <Tabs.List>
          <Tabs.Tab value="bahan">Bahan</Tabs.Tab>
          <Tabs.Tab value="proses1">Proses 1</Tabs.Tab>
          <Tabs.Tab value="proses2">Proses 2</Tabs.Tab>
          <Tabs.Tab value="proses3">Proses 3</Tabs.Tab>
          <Tabs.Tab value="pengemasan">Pengemasan</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="bahan" pt="xs">
          <InventoryTable data={processData} />
        </Tabs.Panel>
        <Tabs.Panel value="proses1" pt="xs">
          <InventoryTable data={processData} />
        </Tabs.Panel>
        <Tabs.Panel value="proses2" pt="xs">
          <InventoryTable data={processData} />
        </Tabs.Panel>
        <Tabs.Panel value="proses3" pt="xs">
          <InventoryTable data={processData} />
        </Tabs.Panel>
        <Tabs.Panel value="pengemasan" pt="xs">
          <InventoryTable data={processData} />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ProcessPage;
