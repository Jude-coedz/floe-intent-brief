import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Floe Intent Brief",
  description: "A concept for turning a Floe demo session into an evidence-backed AE handoff.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
