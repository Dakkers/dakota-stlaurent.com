import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSansFont = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansFont.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="max-w-5xl w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
