import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const notoSansFont = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dakota St. Laurent",
  description: "Dakota St. Laurent's personal website. He's pretty cool!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansFont.className}>
        <main className="min-h-screen flex flex-col max-w-5xl mx-auto gap-4 pb-8">
          <Navbar />

          <div className="flex flex-grow">{children}</div>
        </main>
      </body>
    </html>
  );
}
