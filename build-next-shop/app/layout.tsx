import './globals.css'
import { Inter } from 'next/font/google'
import { register } from 'swiper/element/bundle'
import HeaderSection from '../components/HeaderSection'

register()
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shoes Store',
  description: 'One stop shop for shoes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang='en'>
        <body className={inter.className}>
          {/* <HeaderSection /> */}
          {children}
        </body>
      </html>
    </>
  )
}
