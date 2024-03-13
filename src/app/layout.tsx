import Header from "./Header"

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
          <Header />
          {children}
        </body>
      </html>
    )
  }