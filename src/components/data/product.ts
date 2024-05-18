export interface ProductItem {
  namabarang: string;
  beratbersih: string;
  ukuran: string;
  lokasi: string;
  masuk: number;
  keluar: number;
  saldoakhir: number;
  tanggal: string;
}

const createProductData = (
  items: Omit<ProductItem, "saldoakhir">[]
): ProductItem[] => {
  return items.map((item) => ({
    ...item,
    saldoakhir: item.masuk - item.keluar,
  }));
};

const productData: ProductItem[] = createProductData([
  {
    namabarang: "Product A",
    beratbersih: "1000 unit",
    ukuran: "50x40x30 cm",
    lokasi: "Gudang A",
    masuk: 1000,
    keluar: 500,
    tanggal: "2024-05-01",
  },
  {
    namabarang: "Product B",
    beratbersih: "1000 unit",
    ukuran: "50x40x30 cm",
    lokasi: "Gudang A",
    masuk: 4000,
    keluar: 2000,
    tanggal: "2024-05-01",
  },
  {
    namabarang: "Product c",
    beratbersih: "1000 unit",
    ukuran: "50x40x30 cm",
    lokasi: "Gudang A",
    masuk: 2000,
    keluar: 1000,
    tanggal: "2024-05-01",
  },
]);
export default productData;
