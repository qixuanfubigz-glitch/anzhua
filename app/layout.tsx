import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OneClickCode",
  description: "One Click, Fully Configured. 告别环境配置折腾，一键开启编程之旅",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
