import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Knowledge Vault',
  description: 'AI-Powered Knowledge Transfer System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
