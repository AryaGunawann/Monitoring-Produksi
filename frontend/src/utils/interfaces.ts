export interface Jabatan {
  id: number;
  nama_jabatan: string;
  gapok: number;
  tunjangan: number;
  uang_makan: number;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: number;
  nama: string;
  satuan: string;
  jumlah: number;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialPendukung {
  id: number;
  nama: number;
}

export interface Product {
  id: number;
  nama: string;
  berat: number;
  jumlah_total: number;
  material_pendukung: MaterialPendukung[];
  createdAt: string;
  updatedAt: string;
}

export interface Pegawai {
  nama: string;
  nik: string;
  Jabatan: {
    nama_jabatan: string;
    gapok: number;
    tunjangan: number;
    uang_makan: number;
  };
  tanggal_bergabung: string;
}

export interface SearchOption {
  nik: string;
  nama: string;
}

export interface AutocompleteProps {
  // prop yang sudah ada
  data: { value: string; label: string }[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onSearch: (query: string) => Promise<void>;
}
