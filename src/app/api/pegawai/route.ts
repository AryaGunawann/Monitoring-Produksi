import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

// Mendapatkan daftar employee
export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching employee" },
      { status: 500 }
    );
  }
}

export async function getEmployeeByNik(nik) {
  try {
    const response = await axios.get(`${API_BASE_URL}/employee/nik/${nik}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching employee by NIK");
  }
}

// Menambahkan employee baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${API_BASE_URL}/employee`, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding employee" },
      { status: 500 }
    );
  }
}
