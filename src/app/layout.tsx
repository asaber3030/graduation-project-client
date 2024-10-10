import "./globals.css"

import { Metadata } from "next"

import { ReactQueryClientProvider } from "@/providers/react-query"

export const metadata: Metadata = {}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html>
        <body>{children}</body>
      </html>
    </ReactQueryClientProvider>
  )
}
