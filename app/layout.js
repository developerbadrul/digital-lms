import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
  title: "Digital LMS",
  description: "Digital Learning Platfrom by Badrul",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(inter.className, poppins.className)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
