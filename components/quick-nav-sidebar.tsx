'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Menu, Activity, BarChart2, Users, PlayCircle, Award } from 'lucide-react'

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
}

const navItems: NavItem[] = [
  { id: 'progress', icon: <Activity className="h-6 w-6" />, label: 'Progress' },
  { id: 'workout', icon: <PlayCircle className="h-6 w-6" />, label: 'Workout' },
  { id: 'recommended', icon: <BarChart2 className="h-6 w-6" />, label: 'Recommended' },
  { id: 'dashboard', icon: <Award className="h-6 w-6" />, label: 'Dashboard' },
  { id: 'community', icon: <Users className="h-6 w-6" />, label: 'Community' },
]

export function QuickNavSidebar() {
  const [activeSection, setActiveSection] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.5 })

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const NavContent = () => (
    <div className="flex flex-col space-y-4">
      {navItems.map((item) => (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeSection === item.id ? "default" : "ghost"}
                size="icon"
                onClick={() => scrollToSection(item.id)}
                className="w-12 h-12"
              >
                {item.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-20 left-4 z-50 rounded-full shadow-lg"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="h-52">
          <ScrollArea className="h-full py-4">
            <NavContent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 bg-background rounded-lg shadow-lg p-2">
      <NavContent />
    </div>
  )
}