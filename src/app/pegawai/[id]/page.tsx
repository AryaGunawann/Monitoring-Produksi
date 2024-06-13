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
  Group,
  Avatar,
  Stack,
  Badge,
} from "@mantine/core";
import { FaAt, FaPhone, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

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
        const response = await axios.get(
          `http://localhost:2000/employee/${id}`
        );
        setPegawai(response.data.data);
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
        <Group position="center" mb="lg">
          <Avatar size={120} radius={120} color="blue">
            {pegawai.nama[0]}
          </Avatar>
        </Group>
        <Title order={2} align="center" mb="lg">
          {pegawai.nama}
        </Title>
        <Divider my="sm" />
        <Stack spacing="sm">
          <Text>
            <strong>NIK:</strong> {pegawai.nik}
          </Text>
          <Group align="center">
            <Text>
              <strong>Email: </strong>
              {pegawai.email}
            </Text>
          </Group>
          <Text>
            <strong>Tempat Lahir:</strong> {pegawai.tempat_lahir}
          </Text>
          <Text>
            <strong>Tanggal Lahir:</strong> {pegawai.tanggal_lahir}
          </Text>
          <Text>
            <strong>Jenis Kelamin:</strong> {pegawai.jenis_kelamin}
          </Text>
          <Text>
            <strong>Agama:</strong> {pegawai.agama}
          </Text>
          <Group spacing="xs" align="center">
            <FaMapMarkerAlt size={16} />
            <Text>{pegawai.alamat}</Text>
          </Group>
          <Text>
            <strong>Tanggal Bergabung:</strong> {pegawai.tanggal_bergabung}
          </Text>
          <Group spacing="xs" align="center">
            <FaPhone size={16} />
            <Text>{pegawai.no_tlpn}</Text>
          </Group>
          <Divider my="sm" />
          {pegawai.Jabatan ? (
            <>
              <Group spacing="xs" align="center">
                <FaBriefcase size={16} />
                <Text>
                  <strong>Jabatan:</strong> {pegawai.Jabatan.nama_jabatan}
                </Text>
              </Group>
              <Text>
                <strong>Gaji Pokok:</strong> {pegawai.Jabatan.gapok}
              </Text>
              <Text>
                <strong>Tunjangan:</strong> {pegawai.Jabatan.tunjangan}
              </Text>
              <Text>
                <strong>Uang Makan:</strong> {pegawai.Jabatan.uang_makan}
              </Text>
            </>
          ) : (
            <Text>Jabatan: Data jabatan tidak tersedia</Text>
          )}
        </Stack>
      </Card>
    </Container>
  );
};

export default PegawaiDetailPage;
