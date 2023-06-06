import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import FrameProvider from '@/components/FrameProvider/FrameProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shashanka',
  description: 'hardworking and elegant kiddo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FrameProvider>
        <ThemeProvider>
        <AuthProvider>
        <div className='container'>
        <Navbar />
        {children}
        <Footer />
        </div>
        </AuthProvider>
        </ThemeProvider>
        </FrameProvider>
        </body>
    </html>
  )
}
