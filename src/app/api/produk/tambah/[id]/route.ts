import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const produkId = params.id;
    const response = await axios.get(`${API_BASE_URL}/produk/${produkId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching material" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const produkId = params.id;
    const body = await req.json();

    const response = await axios.put(
      `${API_BASE_URL}/produk/tambah/${produkId}`,
      body
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding Produk quantity" },
      { status: 500 }
    );
  }
}
