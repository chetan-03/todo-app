import Header from "./header"
import Footer from "./footer"
import './global.css'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className="container">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}