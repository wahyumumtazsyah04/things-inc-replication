import { NextResponse } from "next/server";
import pkg from "../../../../package.json" assert { type: "json" };

export async function GET() {
  const { name, version } = pkg as { name: string; version: string };
  return NextResponse.json({ name, version }, { status: 200 });
}
