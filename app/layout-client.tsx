'use client'

import { usePathname } from 'next/navigation'
import NavigationLayout from "../components/navigation-layout"

interface RootLayoutClientProps {
  children: React.ReactNode
  fonts: string
}

export default function RootLayoutClient({ children, fonts }: RootLayoutClientProps) {
  const pathname = usePathname()
  const noNavPaths = ['/', '/login'] // 移除 '/home'

  return (
    <body className={`${fonts} antialiased`}>
      {noNavPaths.includes(pathname) ? children : <NavigationLayout>{children}</NavigationLayout>}
    </body>
  )
}