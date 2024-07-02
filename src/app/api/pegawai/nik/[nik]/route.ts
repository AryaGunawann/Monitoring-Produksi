import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

// Mendapatkan employee berdasarkan NIK
export async function GET(
  req: NextRequest,
  { params }: { params: { nik: string } }
) {
  try {
    const employeeNik = params.nik;
    const response = await axios.get(
      `${API_BASE_URL}/employee/nik/${employeeNik}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching employee by NIK" },
      { status: 500 }
    );
  }
}
