import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// 本地开发入口：
//   irm http://localhost:3000/api/general-dev | iex
// 会返回 scripts/setup-general.ps1 的完整内容，真正执行安装逻辑。
export async function GET() {
  const filePath = path.join(process.cwd(), "scripts", "setup-general.ps1");
  const content = await fs.readFile(filePath, "utf8");

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
