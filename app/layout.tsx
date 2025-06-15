import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navigation from "@/components/navigation";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAILYP",
  description: "View informative posts daily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Navigation />
          <main className="container mx-auto">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
