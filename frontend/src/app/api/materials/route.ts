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

// Menambah Material Baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${API_BASE_URL}/material`, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating material" },
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
