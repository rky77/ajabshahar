import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://ajabshahar.aaravega.in/Api/poems"
    );

    const data = await response.json();

    return NextResponse.json(data); // return exact API response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}