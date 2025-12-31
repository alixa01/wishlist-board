import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "New Year Wishlist Board — Make a Wish",
  description:
    "Welcome the New Year by sharing your wishes and hopes. A warm and simple wishlist board where everyone can write one wish and see them float together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden ${quicksand.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
