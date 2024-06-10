// pages/api/packing/index.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/packing`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching packing data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${API_BASE_URL}/packing`, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating packing data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packingId = params.id;
    const body = await req.json();
    const response = await axios.get(`${API_BASE_URL}/packing/${packingId}`);
    const packing = response.data;
    // Lakukan update pada data packing menggunakan informasi yang diterima dari body
    // Misalnya: packing.jumlah = body.jumlah;
    const updateResponse = await axios.put(
      `${API_BASE_URL}/packing/${packingId}`,
      packing
    );
    return NextResponse.json(updateResponse.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating packing data" },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const packingId = params.id;
    const response = await axios.delete(`${API_BASE_URL}/packing/${packingId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting packing data" },
      { status: 500 }
    );
  }
}
