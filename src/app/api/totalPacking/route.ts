import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalpack`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching packing data" },
      { status: 500 }
    );
  }
}
