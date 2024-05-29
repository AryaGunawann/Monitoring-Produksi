import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

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
