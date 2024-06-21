import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dm = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Local Kanban",
  description: "A simple kanban board to organize your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${dm.className} overflow-hidden w-full h-full bg-cover bg-[url('/stars.jpeg')] text-white`}>
        <div className="w-full h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
