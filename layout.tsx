import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hair Loss Knowledge Test | Berkowits",
  description: "Staff training assessment — Berkowits Hair and Skin Clinic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ background: "var(--color-cream)" }}>
        {children}
      </body>
    </html>
  );
}
