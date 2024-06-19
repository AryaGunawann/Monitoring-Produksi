import React, { useState, useEffect } from "react";
import { Modal, Button, Title, TextInput, Text, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import axios from "axios";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
  showNotification: (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => void;
}

const TambahPegawaiModal: React.FC<Props> = ({
  visible,
  onClose,
  onAdd,
  showNotification,
}) => {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    tanggal_lahir: null as Date | null,
    tempat_lahir: "",
    jenis_kelamin: "",
    agama: "",
    alamat: "",
    tanggal_bergabung: null as Date | null,
    jabatan_id: "",
    no_tlpn: "",
  });

  const [jabatanList, setJabatanList] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setFormData({
        nama: "",
        nik: "",
        email: "",
        tanggal_lahir: null,
        tempat_lahir: "",
        jenis_kelamin: "",
        agama: "",
        alamat: "",
        tanggal_bergabung: null,
        jabatan_id: "",
        no_tlpn: "",
      });
    }
  }, [visible]);

  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const response = await axios.get(`/api/jabatan`);
        if (Array.isArray(response.data.data)) {
          setJabatanList(response.data.data);
        } else {
          console.error("Data received is not an array:", response.data);
          setJabatanList([]);
        }
      } catch (error) {
        console.error("Error fetching jabatan data:", error);
        setJabatanList([]);
      }
    };

    fetchJabatan();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/pegawai`, formData);
      if (response && (response.status === 201 || response.status === 200)) {
        onAdd(response.data);
        showNotification("Pegawai berhasil ditambahkan!", "green");
        onClose();
      } else {
        setError("Gagal menambahkan pegawai. Status respons tidak valid.");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setError("Gagal menambahkan pegawai. Silakan coba lagi.");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (value: Date | null, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Modal opened={visible} onClose={onClose} title="Tambah Pegawai">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-4">
          <TextInput
            id="NIK"
            label="NIK"
            placeholder="Masukkan NIK"
            value={formData.nik}
            name="nik"
            onChange={handleChange}
            required
            type="number"
          />
          <TextInput
            required
            label="Nama"
            placeholder="Masukkan nama lengkap"
            value={formData.nama}
            name="nama"
            onChange={handleChange}
          />
          <TextInput
            required
            label="Email"
            type="email"
            placeholder="Masukkan alamat email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <TextInput
            required
            label="Tempat Lahir"
            placeholder="Masukkan tempat lahir"
            value={formData.tempat_lahir}
            name="tempat_lahir"
            onChange={handleChange}
          />
          <Select
            required
            label="Jenis Kelamin"
            placeholder="Pilih jenis kelamin"
            data={[
              { value: "Laki-Laki", label: "Laki-Laki" },
              { value: "Perempuan", label: "Perempuan" },
            ]}
            value={formData.jenis_kelamin}
            onChange={(value) => handleSelectChange(value!, "jenis_kelamin")}
          />
          <Select
            required
            label="Agama"
            placeholder="Masukkan agama"
            data={[
              { value: "Islam", label: "Islam" },
              { value: "Kristen", label: "Kristen" },
              { value: "Katolik", label: "Katolik" },
              { value: "Hindu", label: "Hindu" },
              { value: "Buddha", label: "Buddha" },
            ]}
            name="agama"
            value={formData.agama}
            onChange={(value) => handleSelectChange(value!, "agama")}
          />
          <TextInput
            required
            label="Alamat"
            placeholder="Masukkan alamat lengkap"
            value={formData.alamat}
            name="alamat"
            onChange={handleChange}
          />

          <DatePickerInput
            className=""
            label="Tanggal Lahir"
            placeholder="Pilih tanggal lahir"
            value={formData.tanggal_lahir}
            onChange={(date) => handleDateChange(date, "tanggal_lahir")}
          />
          <DatePickerInput
            className=""
            label="Tanggal Bergabung"
            placeholder="Pilih tanggal bergabung"
            value={formData.tanggal_bergabung}
            onChange={(date) => handleDateChange(date, "tanggal_bergabung")}
          />
          <Select
            required
            label="ID Jabatan"
            placeholder="Pilih jabatan"
            data={jabatanList.map((jabatan) => ({
              value: jabatan.id.toString(),
              label: `${jabatan.id} - ${jabatan.nama_jabatan}`,
            }))}
            value={formData.jabatan_id}
            onChange={(value) => handleSelectChange(value!, "jabatan_id")}
          />
          <TextInput
            required
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            value={formData.no_tlpn}
            name="no_tlpn"
            onChange={handleChange}
            type="tel"
          />
        </div>
        <div className="mt-6 flex justify-center">
          <Button type="submit" variant="filled" color="blue">
            Tambah
          </Button>
          <Button variant="outline" onClick={onClose} className="ml-4">
            Batal
          </Button>
        </div>
        {error && (
          <Text color="red" className="mt-4 text-center">
            {error}
          </Text>
        )}
      </form>
    </Modal>
  );
};

export default TambahPegawaiModal;
