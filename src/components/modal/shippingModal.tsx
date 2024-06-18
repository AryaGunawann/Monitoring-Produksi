import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Title, Select } from "@mantine/core";
import axios from "axios";
import { Packing } from "../../interfaces/packing";
import { showNotification } from "@mantine/notifications";

interface AddShippingModalProps {
  visible: boolean;
  onClose: () => void;
  onShippingAdded: () => void;
  showNotification: (
    message: string,
    color: "blue" | "red" | "yellow" | "green"
  ) => void;
}

const AddShippingModal = ({
  visible,
  onClose,
  onShippingAdded,
  showNotification,
}: AddShippingModalProps) => {
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedPacking, setSelectedPacking] = useState<string>("");
  const [packingList, setPackingList] = useState<Packing[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackings = async () => {
      try {
        const response = await axios.get<Packing[]>("/api/packing");
        setPackingList(response.data);
      } catch (error) {
        console.error("Error fetching packings:", error);
        setFetchError("Error fetching packings");
      }
    };

    fetchPackings();
  }, [visible]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/shipping", {
        packingId: selectedPacking,
        jumlah: parseInt(jumlah),
      });

      if (response.status === 201) {
        onShippingAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error adding shipping:", error);
    }
  };

  return (
    <Modal opened={visible} onClose={onClose}>
      <div className="p-8">
        <Title order={1} className="text-center mb-8 text-black">
          Tambah Pengiriman
        </Title>
        <div className="space-y-4">
          {fetchError ? (
            <div className="text-red-500">{fetchError}</div>
          ) : (
            <div>
              <label htmlFor="packing">Pilih Packing:</label>
              <Select
                id="packing"
                data={packingList.map((packing) => ({
                  value: packing.id.toString(),
                  label: `${packing.id} - ${packing.Produk.nama} - Jumlah ${packing.jumlah} `,
                }))}
                value={selectedPacking}
                onChange={(value) => setSelectedPacking(value as string)}
                placeholder="Pilih Packing"
              />
            </div>
          )}
          <TextInput
            id="jumlah"
            value={jumlah}
            onChange={(event) => setJumlah(event.currentTarget.value)}
            placeholder="Jumlah"
            label="Jumlah"
            type="number"
            required
          />
        </div>
        <div className="flex justify-end mt-8 space-x-4">
          <Button onClick={onClose} variant="light">
            Batal
          </Button>
          <Button onClick={handleSubmit}>Tambah Pengiriman</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddShippingModal;
