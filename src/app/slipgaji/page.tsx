"use client";
import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import {
  TextInput,
  NumberInput,
  Button,
  Card,
  Container,
  Title,
  Space,
} from "@mantine/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaDownload, FaPrint } from "react-icons/fa"; // Import icon dari react-icons
import { useReactToPrint } from "react-to-print";

import SlipGajiPDF from "../../components/SlipGajiPDF"; // Import komponen SlipGajiPDF

const SlipGajiPage = () => {
  const [nik, setNik] = useState("");
  const [pegawai, setPegawai] = useState(null);
  const [potongan, setPotongan] = useState(0);
  const [kasbon, setKasbon] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Referensi untuk komponen SlipGajiPDF saat proses cetak
  const componentRef = useRef();

  // Fungsi untuk mencetak slip gaji
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg">
        <Title order={2}>Buat Slip Gaji</Title>
        <Space h="md" />
        <TextInput
          label="NIK Pegawai"
          value={nik}
          onChange={(event) => setNik(event.currentTarget.value)}
        />
        <Button onClick={fetchPegawai} loading={loading}>
          Cari Pegawai
        </Button>
        {error && <p>{error}</p>}
        {pegawai && (
          <>
            <Space h="md" />
            <TextInput label="Nama" value={pegawai.nama} disabled />
            <TextInput
              label="Jabatan"
              value={pegawai.Jabatan.nama_jabatan}
              disabled
            />
            <NumberInput
              label="Potongan"
              value={potongan}
              onChange={(value) => setPotongan(value)}
            />
            <NumberInput
              label="Kasbon"
              value={kasbon}
              onChange={(value) => setKasbon(value)}
            />
            <Space h="md" />
            <div ref={componentRef}>
              <SlipGajiPDF
                pegawai={pegawai}
                potongan={potongan}
                kasbon={kasbon}
              />
            </div>
            <Space h="md" />
            <Button leftIcon={<FaPrint />} color="blue" onClick={handlePrint}>
              Cetak Slip Gaji
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default SlipGajiPage;
