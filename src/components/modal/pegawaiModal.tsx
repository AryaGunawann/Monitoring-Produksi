import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Modal, Button, Title, TextInput, Text } from "@mantine/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

const TambahPegawaiModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    tanggal_lahir: new Date(),
    tempat_lahir: "",
    jenis_kelamin: "",
    agama: "",
    alamat: "",
    tanggal_bergabung: new Date(),
    jabatan_id: "",
    no_tlpn: "",
  });

  useEffect(() => {
    if (visible) {
      setFormData({
        nama: "",
        nik: "",
        email: "",
        tanggal_lahir: new Date(),
        tempat_lahir: "",
        jenis_kelamin: "",
        agama: "",
        alamat: "",
        tanggal_bergabung: new Date(),
        jabatan_id: "",
        no_tlpn: "",
      });
    }
  }, [visible]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/pegawai`, formData);
      onAdd(response.data); // Kirim data pegawai yang baru ditambahkan ke parent component
      onClose(); // Tutup modal setelah berhasil menambahkan pegawai
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date, name: string) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  return (
    <Modal opened={visible} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6">
        <Title order={1} className="text-center mb-8 text-black">
          Tambah Pegawai
        </Title>

        <div className="grid grid-cols-1 gap-4">
          <TextInput
            id="NIK"
            label="NIK"
            placeholder="Masukkan NIK"
            value={formData.nik}
            name="nik"
            onChange={handleChange}
            required
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
          <TextInput
            required
            label="Jenis Kelamin"
            placeholder="Masukkan jenis kelamin"
            value={formData.jenis_kelamin}
            name="jenis_kelamin"
            onChange={handleChange}
          />
          <TextInput
            required
            label="Agama"
            placeholder="Masukkan agama"
            value={formData.agama}
            name="agama"
            onChange={handleChange}
          />
          <TextInput
            required
            label="Alamat"
            placeholder="Masukkan alamat lengkap"
            value={formData.alamat}
            name="alamat"
            onChange={handleChange}
          />
          <div>
            <Text className="font-semibold text-sm py-2">
              Tanggal Lahir<span className=" text-red-500">*</span>
            </Text>
            <DatePicker
              required
              selected={formData.tanggal_lahir}
              onChange={(date) => handleDateChange(date, "tanggal_lahir")}
              placeholderText="Pilih tanggal lahir"
              className="w-full"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <Text className="font-semibold text-sm py-2">
              Tanggal Bergabung<span className=" text-red-500">*</span>
            </Text>
            <DatePicker
              required
              selected={formData.tanggal_bergabung}
              onChange={(date) => handleDateChange(date, "tanggal_bergabung")}
              placeholderText="Pilih tanggal bergabung"
              className="w-full"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <TextInput
            required
            label="ID Jabatan"
            type="number"
            placeholder="Masukkan ID jabatan"
            value={formData.jabatan_id}
            name="jabatan_id"
            onChange={handleChange}
          />
          <TextInput
            required
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon"
            value={formData.no_tlpn}
            name="no_tlpn"
            onChange={handleChange}
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
      </form>
    </Modal>
  );
};

export default TambahPegawaiModal;
