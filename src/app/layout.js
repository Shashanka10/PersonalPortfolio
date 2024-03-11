import Navbar from '@/components/navbar/Navbar'
import "./globals.css";
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import FrameProvider from '@/components/FrameProvider/FrameProvider'
import StarsCanvas from '@/components/StarBackground/StarBackground';
import Sidebar from '@/components/sidebar/Sidebar';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shashanka',
  description: 'hardworking and elegant kiddo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#141414]`}>
        <FrameProvider>
            <AuthProvider>
              <div className="flex flex-col sm:ml-24 lg:ml-60 p-4 min-h-screen justify-between">
                <StarsCanvas />
                <Sidebar />
                <Navbar />
                {children}
                <Footer />
              </div>
            </AuthProvider>
        </FrameProvider>
      </body>
    </html>
  );
}
