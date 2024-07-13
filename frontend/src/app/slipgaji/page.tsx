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
  Autocomplete,
} from "@mantine/core";
import SlipGajiPDF from "../../components/SlipGajiPDF";
import { Pegawai, SearchOption } from "../../utils/interfaces"; // Adjust as per your actual interface definitions
import html2pdf from "html2pdf.js";

const SlipGajiPage: React.FC = () => {
  const [nikOrName, setNikOrName] = useState<string>("");
  const [pegawai, setPegawai] = useState<Pegawai | null>(null);
  const [potongan, setPotongan] = useState<number>(0);
  const [kasbon, setKasbon] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchOptions, setSearchOptions] = useState<SearchOption[]>([]);

  const fetchPegawai = async () => {
    try {
      setLoading(true);
      let response;
      if (isNaN(parseInt(nikOrName))) {
        // Search by name
        response = await axios.get(`/api/pegawai/name/${nikOrName}`);
      } else {
        // Search by NIK
        response = await axios.get(`/api/pegawai/nik/${nikOrName}`);
      }
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
      ignoreElements: (element: HTMLElement) => {
        return element.id === "download-pdf-btn";
      },
    };
    html2pdf().from(slipGajiContent).set(opt).save();
  };

  const handleAutocompleteChange = (value: string) => {
    setNikOrName(value);
  };

  const handleAutocompleteSearch = async (query: string) => {
    try {
      const response = await axios.get(`/api/employee/search/${query}`);
      setSearchOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching search options:", error);
      setSearchOptions([]);
    }
  };

  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={2} mb="lg">
          Buat Slip Gaji
        </Title>
        <Space h="md" />
        <Autocomplete
          data={searchOptions.map((option) => ({
            value: option.nik,
            label: option.nama,
          }))}
          label="Nama Pegawai atau NIK"
          value={nikOrName}
          onChange={handleAutocompleteChange}
          placeholder="Masukkan Nama atau NIK Pegawai"
          // Assuming Autocomplete does not have onSearch prop
          // Consider using onKeyDown or onBlur for triggering search
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAutocompleteSearch(nikOrName);
            }
          }}
        />
        <Space h="sm" />
        <Group mt="md">
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
            {/* Assuming Pegawai.Jabatan.nama_jabatan exists and is correct */}
            <TextInput
              label="Jabatan"
              value={pegawai.Jabatan.nama_jabatan}
              disabled
            />
            <Space h="sm" />
            <NumberInput
              label="Potongan"
              value={potongan}
              onChange={(value) => setPotongan(value as number)}
              min={0}
            />
            <Space h="sm" />
            <NumberInput
              label="Kasbon"
              value={kasbon}
              onChange={(value) => setKasbon(value as number)}
              min={0}
            />
            <Space h="md" />
            <Group className=" font-bold text-center">Preview Slip Gaji</Group>
            <Space h="md" />
            <SlipGajiPDF
              pegawai={pegawai}
              potongan={potongan}
              kasbon={kasbon}
              onDownloadPDF={handleDownloadPDF}
            />
          </>
        )}
      </Card>
    </Container>
  );
};

export default SlipGajiPage;
