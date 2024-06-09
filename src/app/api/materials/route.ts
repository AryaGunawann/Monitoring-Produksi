import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

// Mendapatkan daftar material
export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/material`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching materials" },
      { status: 500 }
    );
  }
}

// Menambah Jumlah
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const materialId = params.id;
    const body = await req.json();
    const jumlah = body.jumlah;
    const response = await axios.get(`${API_BASE_URL}/material/${materialId}`);
    const material = response.data;
    material.jumlah += jumlah;
    const updateResponse = await axios.put(
      `${API_BASE_URL}/material/${materialId}`,
      material
    );
    return NextResponse.json(updateResponse.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating material quantity" },
      { status: 500 }
    );
  }
}
