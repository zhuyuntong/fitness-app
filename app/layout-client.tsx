'use client'

import { usePathname } from 'next/navigation'
import NavigationLayout from "../components/navigation-layout"

interface RootLayoutClientProps {
  children: React.ReactNode
  fonts: string
}

export default function RootLayoutClient({ children, fonts }: RootLayoutClientProps) {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  return (
    <body className={`${fonts} antialiased`}>
      {isLandingPage ? children : <NavigationLayout>{children}</NavigationLayout>}
    </body>
  )
}