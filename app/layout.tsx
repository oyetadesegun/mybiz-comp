import type { Metadata } from 'next'
import './globals.css'
import { Providers } from "@/components/providers/Providers"
import Toaster from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  )
}
