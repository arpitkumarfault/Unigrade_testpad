// src/app/layout.tsx
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/Theme/ThemeProvider"
import Navbar from "@/components/Navbar/Navbar"
import { Toaster } from "react-hot-toast"
export const metadata: Metadata = {
  title: "Unigrade ",
  description: "Smart Online Examination Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <ThemeProvider>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  )
}
