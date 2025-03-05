import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Avoid static routing

export async function POST(request: Request) {
  // TODO: Implement frame interaction handling
  return NextResponse.json(
    { message: "Frame handler endpoint" },
    { status: 200 }
  );
}
