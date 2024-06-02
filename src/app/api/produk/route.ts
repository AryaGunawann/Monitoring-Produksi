import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/produk`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching produk:", error);
    return NextResponse.json(
      { message: "Error fetching produk" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received body:", body); // Log the request body
    const response = await axios.post(`${API_BASE_URL}/produk`, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error("Error adding produk:", error);
    return NextResponse.json(
      { message: "Error adding produk" },
      { status: 500 }
    );
  }
}
