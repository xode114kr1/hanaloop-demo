import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hanaloop Demo",
  description: "A Next.js demo application for Hanaloop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
