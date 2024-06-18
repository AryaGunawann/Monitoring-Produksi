import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const response = await axios.get(`${API_BASE_URL}/shipping/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error saat mengambil data pengiriman berdasarkan ID:",
      error
    );

    return NextResponse.json(
      { message: "Error saat mengambil data Pengiriman berdasarkan ID" },
      { status: 500 }
    );
  }
}

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
