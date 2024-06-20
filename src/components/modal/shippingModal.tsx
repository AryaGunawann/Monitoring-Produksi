import { useState, useEffect } from "react";
import { Button, Modal, TextInput, Title, Select } from "@mantine/core";
import axios from "axios";
import { Packing } from "../../interfaces/packing";

interface AddShippingModalProps {
  visible: boolean;
  onClose: () => void;
  onShippingAdded: () => void;
}

const AddShippingModal = ({
  visible,
  onClose,
  onShippingAdded,
}: AddShippingModalProps) => {
  const [jumlah, setJumlah] = useState<string>("");
  const [selectedPacking, setSelectedPacking] = useState<string>("");
  const [packingList, setPackingList] = useState<Packing[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [maxPackingAllowed, setMaxPackingAllowed] = useState<number>(0);

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

  useEffect(() => {
    if (selectedPacking) {
      const packing = packingList.find(
        (packing) => packing.id.toString() === selectedPacking
      );
      if (packing) {
        setMaxPackingAllowed(packing.jumlah);
      }
    }
  }, [selectedPacking, packingList]);

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

  const isJumlahValid = () => {
    if (!jumlah || !selectedPacking) return false;
    const parsedJumlah = parseInt(jumlah);
    return parsedJumlah > 0 && parsedJumlah <= maxPackingAllowed;
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
          {!isJumlahValid() && (
            <div className="text-red-500 text-sm">
              Jumlah Shipping harus lebih dari 0 dan tidak boleh melebihi jumlah
              Packing ({maxPackingAllowed}).
            </div>
          )}
        </div>
        <div className="flex justify-end mt-8 space-x-4">
          <Button onClick={onClose} variant="light">
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={!isJumlahValid()}>
            Tambah Pengiriman
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddShippingModal;
