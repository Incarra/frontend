import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { Toaster } from "sonner";
import '@rainbow-me/rainbowkit/styles.css';
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
  title: "Incarra - Cosmic AI Agent System",
  description: "A decentralized AI agent system where each user is represented by a unique stellar entity — a conscious being of light, data, and memory, formed from cosmic matter.",
  keywords: ["AI", "cosmic", "stellar", "agent", "decentralized", "constellation"],
  authors: [{ name: "Incarra Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <WalletProvider>
          {children}
          <Toaster position="top-right" richColors />
        </WalletProvider>
      </body>
    </html>
  );
}
