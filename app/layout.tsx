import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tales for the Tillerman | T40 Press Kit",
  description: "An adventurous and vibrant band blending jazz, pop, ska, reggae, soul, and rock.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
