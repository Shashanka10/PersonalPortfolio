import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import StarsCanvas from "@/components/StarBackground/StarBackground";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shashanka",
  description: "a computer engineering student at Kathmandu University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#141414]`}>
        <div className="flex flex-col sm:ml-24 lg:ml-60 p-4 min-h-screen justify-between">
          <StarsCanvas />
          <Sidebar />
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
