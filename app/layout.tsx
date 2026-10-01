import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Floe Intent Loop",
  description: "A product concept for making Floe's instant demos learn what a buyer cares about while the demo is happening.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
