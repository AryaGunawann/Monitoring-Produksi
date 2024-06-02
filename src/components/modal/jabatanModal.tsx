// Import dependencies
import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Title, Notification } from "@mantine/core";
import axios from "axios";

interface Jabatan {
  id: number;
  nama_jabatan: string;
  gapok: number;
  tunjangan: number;
  uang_makan: number;
}

// Define the component
const AddJabatanModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  // Define state variables
  const [namaJabatan, setNamaJabatan] = useState("");
  const [gapok, setGapok] = useState("");
  const [tunjangan, setTunjangan] = useState("");
  const [uangMakan, setUangMakan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        Notification.success({
          title: "Success",
          message: "Jabatan added successfully!",
        });
      }
    } catch (error) {
      console.error("Error adding jabatan:", error);
      setError("Failed to add jabatan. Please try again.");
    } finally {
      setLoading(false);
    }
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
        {error && <Notification color="red">{error}</Notification>}
      </div>
    </Modal>
  );
};

// Export the component
export default AddJabatanModal;
