import axios from "axios";
import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

// POST request to decrement total produk
export async function POST(request) {
  try {
    const { nama, jumlah } = await request.json();
    await axios.post(`${API_BASE_URL}/totalpack/decrement`, { nama, jumlah });
    return NextResponse.json({ message: "Total produk updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Decrementing Total Produk" },
      { status: 500 }
    );
  }
}
