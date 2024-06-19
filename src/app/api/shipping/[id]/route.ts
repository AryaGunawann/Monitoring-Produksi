import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const response = await axios.get(`${API_BASE_URL}/shipping/${id}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching shipping data" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // We don't need a body parser for GET requests
  },
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await axios.delete(`${API_BASE_URL}/shipping/${id}`);

    return NextResponse.json({ message: "Pengiriman berhasil dihapus" });
  } catch (error) {
    console.error("Error saat menghapus data Pengiriman:", error);

    return NextResponse.json(
      { message: "Error saat menghapus data Pengiriman" },
      { status: 500 }
    );
  }
}
