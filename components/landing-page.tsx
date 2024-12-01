"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Brain, Play, Zap, Activity, ArrowRight, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { useAuth } from "@/hooks/use-auth"

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false)
  // const { user, logout } = useAuth()

  const navLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/features", label: "Features" },
    { href: "/blog", label: "Blog" },
    { href: "/forum", label: "Forum" },
    { href: "/docs", label: "Docs" },
  ]

  const UserButton = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="relative h-8 w-8 rounded-full"
            onClick={() => window.location.href = '/profile'}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">Alex.A</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                Alex@lockedin.com
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          {navLinks.map((link) => (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Account Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => window.location.href = '/'}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-4 h-16 border-b">
        <div className="flex items-center space-x-2">
          <Zap className="h-6 w-6" />
          <span className="text-xl font-semibold">LockedIn</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop User Button */}
        <div className="hidden md:block">
          <UserButton />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[240px] sm:w-[300px] p-0">
              <nav className="flex flex-col">
                <div className="flex items-center justify-start gap-2 p-4 border-b">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">Alex.A</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      Alex@lockedin.com
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="my-1 h-px bg-muted" />
                  <Link
                    href="/profile"
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-red-600"
                  >
                    Log out
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Transform Your Fitness Journey with LockedIn
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Personalized workouts, expert guidance, and real-time posture monitoring.
            Your AI personal trainer, available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="font-semibold group relative overflow-hidden hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white/0 via-white to-white/0 transition-opacity" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group relative overflow-hidden"
              asChild
            >
              <Link href="#pricing">
                Learn More
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white/0 via-white to-white/0 transition-opacity" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 space-y-3">
            <Play className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">Video Library</h3>
            <p className="text-sm text-muted-foreground">
              Access a vast collection of workout videos for reference and inspiration.
            </p>
          </div>
          <div className="p-6 space-y-3">
            <Brain className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">AI-Assisted Workouts</h3>
            <p className="text-sm text-muted-foreground">
              Get personalized workout plans generated by our advanced AI.
            </p>
          </div>
          <div className="p-6 space-y-3">
            <Zap className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">Quick Workouts</h3>
            <p className="text-sm text-muted-foreground">
              Short on time? Choose from our selection of effective quick workouts.
            </p>
          </div>
          <div className="p-6 space-y-3">
            <Activity className="h-8 w-8 text-primary" />
            <h3 className="text-lg font-semibold">Posture Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Receive real-time feedback on your form to prevent injuries and maximize results.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}