import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer/Footer";
import StarsCanvas from "@/components/StarBackground/StarBackground";
import Sidebar from "@/components/sidebar/Sidebar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: "Shashanka Luitel",
  description:
    "Full Stack Developer and Computer Engineering graduate from Kathmandu University.",
  keywords: [
    "Shashanka Luitel",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Kathmandu University",
    "Nepal",
    "Research Enthusiast",
  ],
  authors: [{ name: "Shashanka Luitel" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-[#141414] font-sans antialiased">
        <StarsCanvas />
        <Sidebar />
        <Navbar />
        <div className="flex flex-col min-h-screen sm:ml-[72px] lg:ml-[240px]">
          <main className="flex-1 p-4 pt-16 sm:pt-4">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1e1e1e",
              color: "#fff",
              border: "1px solid #2e2e2e",
              fontSize: "13px",
              borderRadius: "12px",
            },
            success: {
              iconTheme: { primary: "#12c971", secondary: "#0d0d0d" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}