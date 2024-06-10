// Import dependencies
import axios from "axios";
import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

// GET request to fetch total products
export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/total`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error Fetching Total Produk" },
      { status: 500 }
    );
  }
}

// POST request to decrement total produk
export async function POST(request) {
  try {
    const { nama, jumlah } = await request.json();
    await axios.post(`${API_BASE_URL}/total/decrement`, { nama, jumlah });
    return NextResponse.json({ message: "Total produk updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Decrementing Total Produk" },
      { status: 500 }
    );
  }
}
