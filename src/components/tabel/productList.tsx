import React from "react";
import { Container, Table, Button, Group, Text } from "@mantine/core";
import { FaFilter } from "react-icons/fa";
import { ProductItem } from "../data/product";

interface Props {
  data: ProductItem[];
}

const ProductList: React.FC<Props> = ({ data }) => {
  return (
    <Container className="bg-[#3E3B64] p-6 rounded-lg">
      <Group mb="lg">
        <Text className="text-2xl font-semibold text-white">Product List</Text>
        <Button
          leftSection={<FaFilter />}
          variant="light"
          className="bg-blue-500 text-white"
        >
          Filter
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
              <th className="py-3 px-6">Tanggal Produksi</th>
              <th className="py-3 px-6">Nama Product</th>
              <th className="py-3 px-6">Berat bersih</th>
              <th className="py-3 px-6">Jumlah Masuk</th>
              <th className="py-3 px-6">Jumlah Keluar</th>
              <th className="py-3 px-6">Jumlah Total</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="py-3 px-6">{item.tanggal}</td>
                <td className="py-3 px-6">{item.namabarang}</td>
                <td className="py-3 px-6">{item.beratbersih}</td>
                <td className="py-3 px-6">{item.masuk}</td>
                <td className="py-3 px-6">{item.keluar}</td>
                <td className="py-3 px-6">{item.saldoakhir}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ProductList;
