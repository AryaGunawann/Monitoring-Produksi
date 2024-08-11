"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Loader,
  Alert,
  Title,
  Container,
  Pagination,
  Table,
} from "@mantine/core";
import { formatDate } from "../../utils/date";

interface IPacking {
  id: number;
  Produk: {
    nama: string;
  } | null;
  jumlah: number;
  updatedAt: string;
}

const PackingTabel = () => {
  const [packings, setPackings] = useState<IPacking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<IPacking[]>("/api/packing");
      setPackings(response.data);
    } catch (error) {
      setError("Error fetching packings: " + error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(packings.length / itemsPerPage);
  const displayedPackings = packings.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const renderTableRows = () => {
    return displayedPackings.map((packing, index) => (
      <Table.Tr key={packing.id}>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1 + (activePage - 1) * itemsPerPage}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {`${packing.id} - ${packing.Produk?.nama || "nama tidak ditemukan"}`}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {packing.jumlah}
        </Table.Td>
        <Table.Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(new Date(packing.updatedAt))}
        </Table.Td>
      </Table.Tr>
    ));
  };

  return (
    <Container className="mx-auto py-8">
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
                  <Table.Th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </Table.Th>
                  <Table.Th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID | Nama
                  </Table.Th>
                  <Table.Th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </Table.Th>
                  <Table.Th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{renderTableRows()}</Table.Tbody>
            </Table>
          </div>
        </Card>
      )}
      {packings.length > itemsPerPage && (
        <Pagination
          value={activePage}
          onChange={(page: number) => setActivePage(page)}
          total={totalPages}
          className="mt-4"
        />
      )}
    </Container>
  );
};

export default PackingTabel;
