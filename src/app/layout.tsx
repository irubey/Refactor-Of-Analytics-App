import '@styles/global.css'
import NavBar from "@components/NavBar"

export const metadata = {
    title: 'Climbing App',
    description: 'My prototype climbing app.',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <NavBar />
          {children}
        </body>
      </html>
    )
  }