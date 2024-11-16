'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Activity, LineChart } from 'lucide-react'

interface NavigationLayoutProps {
  children: React.ReactNode
}

export default function NavigationLayout({ children }: NavigationLayoutProps) {
  const pathname = usePathname()
  
  return (
    <div className="min-h-screen bg-background relative pb-16">
      {children}
      
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="container max-w-md mx-auto flex justify-around p-2">
          <Link 
            href="/home" 
            className={`p-2 flex flex-col items-center ${
              pathname === '/home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            href="/posture-monitoring" 
            className={`p-2 flex flex-col items-center ${
              pathname === '/posture-monitoring' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs mt-1">Posture</span>
          </Link>
          
          <Link 
            href="/activity" 
            className={`p-2 flex flex-col items-center ${
              pathname === '/activity' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <LineChart className="w-5 h-5" />
            <span className="text-xs mt-1">Activity</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}