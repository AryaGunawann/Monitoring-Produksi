import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

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

// Mendapatkan employee berdasarkan ID
export async function GET_id(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employeeId = params.id;
    const response = await axios.get(`${API_BASE_URL}/employee/${employeeId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching employee by ID" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const employeeId = params.id;
    const response = await axios.delete(
      `${API_BASE_URL}/employee/${employeeId}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting packing" },
      { status: 500 }
    );
  }
}
