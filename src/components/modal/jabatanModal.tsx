import { useState } from "react";
import { Button, Modal, TextInput, Title, Alert } from "@mantine/core";
import axios from "axios";

interface AddJabatanModalProps {
  visible: boolean;
  onClose: () => void;
  updateJabatanList: () => void;
}

const AddJabatanModal = ({
  visible,
  onClose,
  updateJabatanList,
}: AddJabatanModalProps) => {
  const [namaJabatan, setNamaJabatan] = useState("");
  const [gapok, setGapok] = useState("");
  const [tunjangan, setTunjangan] = useState("");
  const [uangMakan, setUangMakan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/jabatan", {
        nama_jabatan: namaJabatan,
        gapok: parseInt(gapok),
        tunjangan: parseInt(tunjangan),
        uang_makan: parseInt(uangMakan),
      });
      if (response.status === 201) {
        onClose();
        setSuccessMessage("Jabatan berhasil ditambahkan.");
        updateJabatanList(); // Panggil fungsi untuk memperbarui jabatanList di JabatanPage
      }
    } catch (error) {
      console.error("Error adding jabatan:", error);
      setError("Gagal menambahkan jabatan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Modal opened={visible} onClose={onClose}>
      <Title order={1} className="text-black text-center">
        Tambah Jabatan Baru
      </Title>
      <div className="max-w-md mx-auto mt-6">
        <TextInput
          value={namaJabatan}
          onChange={(event) => setNamaJabatan(event.currentTarget.value)}
          placeholder="Nama Jabatan"
          label="Nama Jabatan"
          required
        />
        <TextInput
          value={gapok}
          onChange={(event) => setGapok(event.currentTarget.value)}
          placeholder="Gaji Pokok"
          label="Gaji Pokok"
          type="number"
          required
        />
        <TextInput
          value={tunjangan}
          onChange={(event) => setTunjangan(event.currentTarget.value)}
          placeholder="Tunjangan"
          label="Tunjangan"
          type="number"
          required
        />
        <TextInput
          value={uangMakan}
          onChange={(event) => setUangMakan(event.currentTarget.value)}
          placeholder="Uang Makan"
          label="Uang Makan"
          type="number"
          required
        />
        <div className="mt-4">
          <Button onClick={handleSubmit} loading={loading}>
            Simpan
          </Button>
          <Button onClick={onClose} variant="light" className="ml-2">
            Batal
          </Button>
        </div>
        {error && (
          <Alert color="red" className="mt-4" onClose={handleAlertClose}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert color="blue" className="mt-4" onClose={handleAlertClose}>
            {successMessage}
          </Alert>
        )}
      </div>
    </Modal>
  );
};

export default AddJabatanModal;
