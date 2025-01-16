import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/providers/QueryProvider'
import { ReduxProvider } from '@/providers/ReduxProvider'
import DelayedAccountCompletionStepper from '@/components/accountCompletion/DelayedAccountCompletionStepper'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <QueryProvider>
            {children}
            <DelayedAccountCompletionStepper />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
