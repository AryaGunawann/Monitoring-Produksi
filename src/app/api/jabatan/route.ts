import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

// Mendapatkan daftar jabatan
export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/jabatan`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching jabatan" },
      { status: 500 }
    );
  }
}

// Menambahkan jabatan baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${API_BASE_URL}/jabatan`, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding jabatan" },
      { status: 500 }
    );
  }
}
