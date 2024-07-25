import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        {/* You can add your meta tags or other head elements here */}
      </head>
      <body className={inter.className}>
        <Providers>
          <AppbarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}

