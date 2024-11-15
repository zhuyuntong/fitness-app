import type { Metadata } from "next"
import localFont from "next/font/local"
import RootLayoutClient from "./layout-client"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "LockedIN - Your AI Fitness Companion",
  description: "Personalized workouts, expert guidance, and real-time posture monitoring",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fonts = `${geistSans.variable} ${geistMono.variable}`
  
  return (
    <html lang="en">
      <RootLayoutClient fonts={fonts}>{children}</RootLayoutClient>
    </html>
  )
}
