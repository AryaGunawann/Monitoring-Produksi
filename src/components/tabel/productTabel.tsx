import React from "react";
import { Table, Container } from "@mantine/core";
import { ProductItem } from "../data/product";

interface Props {
  data: ProductItem[];
}

const ProductTable: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <h2 className="text-xl font-semibold mb-4">Stok Barang Jadi</h2>
      <Table striped>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Jumlah</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductTable;
