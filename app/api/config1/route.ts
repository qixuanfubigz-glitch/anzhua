import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// /api/config1: remote distribution for General Dev Suite script.
// Usage in PowerShell (dev env, default port 3000):
//   irm http://localhost:3000/api/config1 | iex
//
// It simply streams the contents of /public/c1.ps1 as plain text.
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "c1.ps1");
  const content = await fs.readFile(filePath, "utf8");

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

