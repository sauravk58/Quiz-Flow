import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'quiz',
  description: 'Created by saurav',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
