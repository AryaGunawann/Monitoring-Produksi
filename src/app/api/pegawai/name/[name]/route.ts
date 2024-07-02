import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

// Mendapatkan employee berdasarkan Name
export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const employeeName = params.name;
    const response = await axios.get(
      `${API_BASE_URL}/employee/name/${employeeName}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching employee by Name" },
      { status: 500 }
    );
  }
}
