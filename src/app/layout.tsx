import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farm Dashboard",
  description: "Client-facing performance dashboard (MVP)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
