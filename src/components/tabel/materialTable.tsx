import React from "react";
import { Table, Container } from "@mantine/core";
import { MaterialItem } from "../data/material";

interface Props {
  data: MaterialItem[];
}

const MaterialTable: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <h2 className="text-2xl font-semibold mb-4">Stok Barang Mentah</h2>
      <Table striped className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Jumlah</th>
            <th className="px-4 py-2">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MaterialTable;
