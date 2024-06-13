"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  TextInput,
  NumberInput,
  Button,
  Card,
  Container,
  Title,
  Space,
  Group,
  LoadingOverlay,
  Notification,
} from "@mantine/core";
import SlipGajiPDF from "../../components/SlipGajiPDF";
import html2pdf from "html2pdf.js";

const SlipGajiPage = () => {
  const [nik, setNik] = useState("");
  const [pegawai, setPegawai] = useState(null);
  const [potongan, setPotongan] = useState(0);
  const [kasbon, setKasbon] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPegawai = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/employee/nik/${nik}`
      );
      setPegawai(response.data.data);
      setError(null);
    } catch (err) {
      setError("Pegawai tidak ditemukan");
      setPegawai(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/employee/nik/${nik}`
      );
      setPegawai(response.data.data);
      setError(null);
    } catch (err) {
      setError("Pegawai tidak ditemukan");
      setPegawai(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const slipGajiContent = document.getElementById("slip-gaji-content");
    const opt = {
      margin: 0.2,
      filename: "slip-gaji.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      ignoreElements: (element) => {
        return element.id === "download-pdf-btn";
      },
    };
    html2pdf().from(slipGajiContent).set(opt).save();
  };

  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={2} align="center" mb="lg">
          Buat Slip Gaji
        </Title>
        <Space h="md" />
        <TextInput
          label="NIK Pegawai"
          value={nik}
          onChange={(event) => setNik(event.currentTarget.value)}
        />
        <Space h="sm" />
        <Group position="center" mt="md">
          <Button onClick={fetchPegawai} loading={loading}>
            Cari Pegawai
          </Button>
        </Group>
        {loading && <LoadingOverlay visible={loading} />}
        {error && (
          <Notification color="red" onClose={() => setError(null)} mt="md">
            {error}
          </Notification>
        )}
        {pegawai && (
          <>
            <Space h="md" />
            <TextInput label="Nama" value={pegawai.nama} disabled />
            <Space h="sm" />
            <TextInput
              label="Jabatan"
              value={pegawai.Jabatan.nama_jabatan}
              disabled
            />
            <Space h="sm" />
            <NumberInput
              label="Potongan"
              value={potongan}
              onChange={(value) => setPotongan(value)}
              min={0}
            />
            <Space h="sm" />
            <NumberInput
              label="Kasbon"
              value={kasbon}
              onChange={(value) => setKasbon(value)}
              min={0}
            />
            <Space h="md" />
            <Group position="center">
              <Button color="blue" onClick={handlePreview}>
                Preview Slip Gaji
              </Button>
            </Group>
            <Space h="md" />
            <SlipGajiPDF
              pegawai={pegawai}
              potongan={potongan}
              kasbon={kasbon}
              onDownloadPDF={handleDownloadPDF} // Mengirimkan fungsi handleDownloadPDF sebagai prop
            />
          </>
        )}
      </Card>
    </Container>
  );
};

export default SlipGajiPage;
