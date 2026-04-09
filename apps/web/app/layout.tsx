import type { Metadata } from "next";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import { WalletRootProvider } from "./components/wallet-provider";

export const metadata: Metadata = {
  title: "Holder v. Holder",
  description:
    "Meme-art Solana survival arena with compact landing, route-first navigation, and onchain-first UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <WalletRootProvider>{children}</WalletRootProvider>
      </body>
    </html>
  );
}
