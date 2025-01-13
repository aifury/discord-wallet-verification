import type { Metadata } from "next";
import { WalletContextProvider } from '@/components/WalletProvider';
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Kyle's Bitches - Wallet Verification",
  description: "Verify your wallet address to access Premium channels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:; img-src 'self' https: data:;" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
