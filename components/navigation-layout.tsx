'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Activity, Play, User } from 'lucide-react'

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
            href="/dashboard" 
            className={`p-2 flex flex-col items-center ${
              pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link 
            href="/video-library" 
            className={`p-2 flex flex-col items-center ${
              pathname === '/video-library' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Play className="w-6 h-6" />
            <span className="text-xs">Videos</span>
          </Link>
          
          <Link 
            href="/posture-monitoring" 
            className={`p-2 flex flex-col items-center ${
              pathname === '/posture-monitoring' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Activity className="w-6 h-6" />
            <span className="text-xs">Posture</span>
          </Link>
          
          <Link 
            href="/profile" 
            className={`p-2 flex flex-col items-center ${
              pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}