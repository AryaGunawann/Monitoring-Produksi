export interface MaterialItem {
  NamaBarang: string;
  Satuan: string;
  Stok: number;
  lastUpdate: string;
}

const materialData: MaterialItem[] = [
  {
    NamaBarang: "Material A",
    Satuan: "kg",
    Stok: 200,
    lastUpdate: "2024-05-01",
  },
  {
    NamaBarang: "Material B",
    Satuan: "kg",
    Stok: 300,
    lastUpdate: "2024-05-01",
  },
  {
    NamaBarang: "Material C",
    Satuan: "kg",
    Stok: 250,
    lastUpdate: "2024-05-01",
  },
  {
    NamaBarang: "Material D",
    Satuan: "kg",
    Stok: 200,
    lastUpdate: "2024-05-01",
  },
];

export default materialData;
