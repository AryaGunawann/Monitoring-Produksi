export interface MaterialPendukung {
  materialId: number;
  jumlah_material: number;
}

export interface Produk {
  id: number;
  nama: string;
  berat: number;
  jumlah_total: number;
  material_pendukung: MaterialPendukung[];
  updatedAt: Date;
  createdAt: Date;
}
