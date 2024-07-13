import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

// Mendapatkan material berdasarkan ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const materialId = params.id;
    const response = await axios.get(`${API_BASE_URL}/material/${materialId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching material" },
      { status: 500 }
    );
  }
}

// Menambah Jumlah material
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const materialId = params.id;
    const body = await req.json();

    const response = await axios.put(
      `${API_BASE_URL}/material/tambah/${materialId}`,
      body
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding material quantity" },
      { status: 500 }
    );
  }
}
