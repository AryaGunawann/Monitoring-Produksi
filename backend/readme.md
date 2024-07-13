`# API SPEC MONITORING PRODUKSI

## PRODUK

**GET /produk**

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama": "Plat Besi",
      "berat": 10,
      "jumlah_total": 300,
      "material_pendukung": [
        {
          "id": 1,
          "jumlah": 100
        }
      ],
      "updated_at": "",
      "created_at": ""
    },
    {
      "id": 2,
      "nama": "Plat Besi",
      "berat": 10,
      "jumlah_total": 300,
      "material_pendukung": [
        {
          "id": 1,
          "jumlah": 100
        }
      ],
      "updated_at": "",
      "created_at": ""
    }
  ]
}
```

**GET /produk/:id**

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "nama": "Plat Besi",
    "berat": 10,
    "jumlah_total": 300,
    "material_pendukung": [
      {
        "id": 1,
        "jumlah": 100
      }
    ],
    "updated_at": "",
    "created_at": ""
  }
}
```

**POST /produk**

- Request Body

```json
{
  "nama": "Plat Besi",
  "berat": 10,
  "material_pendukung": [
    {
      "id": 1,
      "jumlah": 100
    }
  ]
}
```

- Response Success

```json
{
  "code": 201,
  "status": "success",
  "data": {
    "id": 1,
    "nama": "Plat Besi",
    "berat": 10,
    "jumlah_total": 0,
    "material_pendukung": [
      {
        "id": 1,
        "jumlah": 100
      }
    ],
    "updated_at": "",
    "created_at": ""
  }
}
```

**PUT /produk/:id**

- Request Body

```json
{
  "nama": "Plat Besi", // Optional
  "berat": 10 // Optional
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "nama": "Plat Besi",
    "berat": 10,
    "jumlah_total": 0,
    "material_pendukung": [
      {
        "id": 1,
        "jumlah": 100
      }
    ],
    "updated_at": "",
    "created_at": ""
  }
}
```

**DELETE /produk/:id**

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "message": true
}
```

**PUT /produk/tambah/:id**

- Request Body

```json
{
  "jumlah": 100,
  "deskripsi": "" // optional
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "nama": "Plat Besi",
    "berat": 10,
    "jumlah_total": 100,
    "material_pendukung": [
      {
        "id": 1,
        "jumlah": 100
      }
    ],
    "updated_at": "",
    "created_at": ""
  }
}
```

**PUT /produk/kurang/:id**

- Request Body

```json
{
  "jumlah": 100,
  "deskripsi": "" // optional
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "nama": "Plat Besi",
    "berat": 10,
    "jumlah_total": 100,
    "material_pendukung": [
      {
        "id": 1,
        "jumlah": 100
      }
    ],
    "updated_at": "",
    "created_at": ""
  }
}
```

- Response Failed

```json
{
  "code": 400,
  "status": "success",
  "message": "Material Pendukung tidak cukup, produk membutuhkan alumunium 100 pcs"
}
```

## MATERIAL

**GET /material**

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama": "Kawat",
      "satuan": "kg",
      "jumlah": 300,
      "material_pendukung": [],
      "updated_at": "",
      "created_at": ""
    },
    {
      "id": 1,
      "nama": "Kawat",
      "satuan": "pcs",
      "jumlah": 15000,
      "material_pendukung": [],
      "updated_at": "",
      "created_at": ""
    }
  ]
}
```

**GET /material/:id**

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "nama": "Kawat",
    "satuan": "kg",
    "jumlah": 300,
    "material_pendukung": [],
    "updated_at": "",
    "created_at": ""
  }
}
```

**POST /material**

- Request Body

```json
{
  "nama": "Kawat",
  "satuan": "kg",
  "material_pendukung": [] // Optional
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama": "Kawat",
      "satuan": "kg",
      "jumlah": 0,
      "material_pendukung": [],
      "updated_at": "",
      "created_at": ""
    }
  ]
}
```

**PUT /material/:id**

- Request Body

```json
{
  "nama": "Kawat", // optional
  "satuan": "kg", // optional
  "material_pendukung": [] // optional
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama": "Kawat",
      "satuan": "kg",
      "jumlah": 0,
      "material_pendukung": [],
      "updated_at": "",
      "created_at": ""
    }
  ]
}
```

**PUT /material/tambah/:id**

- Request Body

```json
{
  "jumlah": 100,
  "deskripsi": "" // optional
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama": "Kawat",
      "satuan": "kg",
      "jumlah": 100,
      "material_pendukung": [],
      "updated_at": "",
      "created_at": ""
    }
  ]
}
```

**PUT /material/kurang/:id**

- Request Body

```json
{
  "jumlah": 100,
  "deskripsi": "" // optional
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama": "Kawat",
      "satuan": "kg",
      "jumlah": 100,
      "material_pendukung": [],
      "updated_at": "",
      "created_at": ""
    }
  ]
}
```

**DELETE /material/:id**

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "message": true
}
```

## RIWAYAT

**GET /riwayat**

- Request parameters

```json
{
  "keyword": "", // filter by name (Optional)
  "date": "" // filter by updated_at (Optional)
}
```

- Response Success

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "deskripsi": "",
      "jenis": "Produk Bertambah", // type : bertambah/berkurang
      "created_at": ""
    },
    {
      "id": 2,
      "deskripsi": "",
      "jenis": "Material Bertambah", // type : bertambah/berkurang
      "created_at": ""
    }
  ]
}
```

## Jabatan

**POST /jabatan**

- Request Body

```json
{
  "nama_jabatan": "Manager Production",
  "gapok": 18000000,
  "tunjangan": 4000000,
  "uang_makan": 1500000
}
```

- Reponse (Succes 201)

```json
{
  "code": 201,
  "status": "created",
  "data": {
    "id": 1,
    "nama_jabatan": "Manager Production",
    "gapok": 18000000,
    "tunjangan": 4000000,
    "uang_makan": 1500000,
    "created_at": "2024-06-07T00:00:00.000Z",
    "updated_at": "2024-06-07T00:00:00.000Z"
  }
}
```

**PUT /jabatan**

- Request Body

```json
{
  "nama_jabatan": "Manager Production", // optional
  "gapok": 18000000, // optional
  "tunjangan": 4000000, // optional
  "uang_makan": 1500000 // optional
}
```

- Response (Succes 200 )

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "nama_jabatan": "Manager Production",
    "gapok": 18000000,
    "tunjangan": 4000000,
    "uang_makan": 1500000,
    "created_at": "2024-06-07T00:00:00.000Z",
    "updated_at": "2024-06-07T00:00:00.000Z"
  }
}
```

**GET /jabatan**

- Request Body

```json
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama_jabatan": "Manager Production",
      "gapok": 18000000,
      "tunjangan": 4000000,
      "uang_makan": 1500000,
      "updated_at": "",
      "created_at": ""
    }
  ]
}
```

**GET /jabatan/:id**

- Request Body

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "nama_jabatan": "Manager Production",
    "gapok": 18000000,
    "tunjangan": 4000000,
    "uang_makan": 1500000,
    "updated_at": "",
    "created_at": ""
  }
}
```

## Employee

**POST /employee**

- Request Body

```json
{
  "nik": 01201212012,
  "nama": "Aldi Sange",
  "taggal_lahir": "07-06-2001",
  "tempat_lahir": "Sukabumi",
  "jenis_kelamin": "laki-laki",
  "agama": "Islam",
  "alamat": "Jalan Buntu No.69",
  "tanggal_bergabung": "07-06-2024",
  "jabatan_id": 1,
  "email": "aldi@gmail.com",
  "no_tlpn": "0812121212"
}
```

## SlipGaji

**POST /slip_gaji**

- Request Body

```json
{
  "periode_tahun": "2024",
  "periode_bulan": "juni",
  "employee_id": 1,
  "potongan": 0,
  "kasbon": 0
}
```

## totalproduk

**POST /totalproduk**

- Request Body

```json
{
  "nama": "Plat KWH",
  "jumlah_total": 100,
  "updated_at": "",
  "created_at": ""
}
```

## Pengemasan

**get /pengemasan**

- Request Body

```json
{
  "id": 1,
  "nama_produk": "Plat KWH",
  "jumlah_kemasan": 50,
  "created_at": "2024-05-29T12:00:00Z"
}
```
