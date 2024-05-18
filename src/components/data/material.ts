export interface MaterialItem {
  NamaBarang: string;
  BeratBersih: string;
  Kuantitas: string;
  masuk: number;
  keluar: number;
  saldoakhir: number;
  date: string;
}

const createMaterialData = (
  items: Omit<MaterialItem, "saldoakhir">[]
): MaterialItem[] => {
  return items.map((item) => ({
    ...item,
    saldoakhir: item.masuk - item.keluar,
  }));
};

const materialData: MaterialItem[] = createMaterialData([
  {
    NamaBarang: "Material A",
    BeratBersih: "500 kg",
    Kuantitas: "10.000 kg",
    masuk: 200,
    keluar: 0,
    date: "2024-05-01",
  },
  {
    NamaBarang: "Material B",
    BeratBersih: "500 kg",
    Kuantitas: "10.000 kg",
    masuk: 300,
    keluar: 0,
    date: "2024-05-01",
  },
  {
    NamaBarang: "Material C",
    BeratBersih: "500 kg",
    Kuantitas: "10.000 kg",
    masuk: 300,
    keluar: 50,
    date: "2024-05-01",
  },
  {
    NamaBarang: "Material D",
    BeratBersih: "500 kg",
    Kuantitas: "10.000 kg",
    masuk: 200,
    keluar: 0,
    date: "2024-05-01",
  },
]);

export default materialData;
