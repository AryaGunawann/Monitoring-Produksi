"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Title,
  Button,
  Modal,
  Text,
  Container,
  Notification,
  Pagination,
  Table,
} from "@mantine/core";
import AddShippingModal from "../../components/modal/shippingModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from "../../utils/date";
import { FaPlus } from "react-icons/fa";

// Interface definitions
interface Shipping {
  id: number;
  Packing?: {
    Produk?: {
      nama: string;
    };
  };
  jumlah: number;
  status: string;
  updatedAt: string;
}

const ShippingTabel = () => {
  const [shippings, setShippings] = useState<Shipping[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/shipping");
      setShippings(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(shippings.length / itemsPerPage);
  const displayedShippings = shippings.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const renderTableRows = () => {
    return displayedShippings.map((shipping, index) => (
      <Table.Tr key={shipping.id}>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1 + (activePage - 1) * itemsPerPage}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {`${shipping.id} - ${shipping.Packing?.Produk?.nama || "N/A"}`}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {shipping.jumlah}
        </Table.Td>

        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(new Date(shipping.updatedAt))}
        </Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <Container className="mx-auto py-8">
      <div className=" mb-2 text-black">
        <Title order={3}>Daftar Pengiriman</Title>
      </div>

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
                  ID | Nama
                </Table.Th>
                <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </Table.Th>

                <Table.Th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated At
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{renderTableRows()}</Table.Tbody>
          </Table>
        </div>
      </Card>

      {shippings.length > itemsPerPage && (
        <Pagination
          value={activePage}
          onChange={setActivePage}
          total={totalPages}
          className="mt-4"
        />
      )}
    </Container>
  );
};

export default ShippingTabel;
