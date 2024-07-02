"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Title,
  Text,
  Divider,
  Loader,
  Alert,
  Container,
  Table,
} from "@mantine/core";

interface Jabatan {
  id: number;
  nama_jabatan: string;
  gapok: number;
  tunjangan: number;
  uang_makan: number;
  createdAt: string;
  updatedAt: string;
}

interface Pegawai {
  id: number;
  nik: string;
  nama: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  jenis_kelamin: string;
  agama: string;
  alamat: string;
  tanggal_bergabung: string;
  jabatan_id: number;
  email: string;
  no_tlpn: string;
  createdAt: string;
  updatedAt: string;
  Jabatan: Jabatan;
}

const PegawaiDetailPage = ({ params: { id } }) => {
  const [pegawai, setPegawai] = useState<Pegawai | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/pegawai/${id}`);
        setPegawai(response.data.data);
        console.log(setPegawai);
      } catch (error) {
        setError("Error fetching pegawai: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Alert color="red">{error}</Alert>;
  if (!pegawai) return <Alert color="yellow">Data not found</Alert>;

  return (
    <Container size="sm" className="mt-8 mb-8">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="p-6 rounded-lg shadow-md"
      >
        <Title order={2} align="center" mb="lg">
          {pegawai.nama}
        </Title>
        <Divider my="sm" />
        <Table striped withColumnBorders className="min-w-full">
          <Table.Tbody>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                NIK
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.nik}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Email
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.email}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Tempat Lahir
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.tempat_lahir}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Tanggal Lahir
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.tanggal_lahir}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Jenis Kelamin
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.jenis_kelamin}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Agama
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.agama}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Alamat
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.alamat}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Tanggal Bergabung
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.tanggal_bergabung}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                No Telepon
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.no_tlpn}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Jabatan
              </Table.Td>
              <Table.Td className="px-6 py-4 whitespace-nowrap text-sm">
                {pegawai.Jabatan ? (
                  <Table striped>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td>Gaji Pokok</Table.Td>
                        <Table.Td>{pegawai.Jabatan.gapok}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>Tunjangan</Table.Td>
                        <Table.Td>{pegawai.Jabatan.tunjangan}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>Uang Makan</Table.Td>
                        <Table.Td>{pegawai.Jabatan.uang_makan}</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                ) : (
                  <Text>Data jabatan tidak tersedia</Text>
                )}
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default PegawaiDetailPage;
