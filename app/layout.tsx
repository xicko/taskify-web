import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskify Web",
  description: "Organize tasks effortlessly and boost your productivity daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative dmsans antialiased`}>{children}</body>
    </html>
  );
}
