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
        <main className="flex min-h-screen flex-col items-center px-4 xl:px-24">
          <div className="max-w-5xl w-full">
            <Navbar />

            <div className="mt-4 xl:mt-24">
              <div className="flex-grow">{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
