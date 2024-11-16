'use client'

import { useState, useEffect, Profiler } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  User, Play, Home, Dumbbell, LineChart, 
  MoreHorizontal, Zap, ChevronDown, ChevronUp,
  Plus, Settings, History, Video, Activity
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfilePage from "@/app/profile/page"

export default function HomePage() {
  const pathname = usePathname()
  const [isProgressExpanded, setIsProgressExpanded] = useState(false)
  const [isWorkoutExpanded, setIsWorkoutExpanded] = useState(true)
  const [recommendedVideos] = useState([
    {
      title: "15-Min Core Strength",
      duration: "15 min",
      views: "2.5k",
      thumbnail: "🏋️‍♂️"
    },
    {
      title: "Quick HIIT Cardio",
      duration: "20 min",
      views: "1.8k",
      thumbnail: "🏃‍♂️"
    }
  ])
  const [showFab, setShowFab] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowFab(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const moreMenuItems = [
    { icon: <Settings className="w-5 h-5" />, label: "Settings", href: "/profile" },
    { icon: <Dumbbell className="w-5 h-5" />, label: "Workouts", href: "/workout-selection" },
    { icon: <Video className="w-5 h-5" />, label: "Video Library", href: "/video-library" },
    { icon: <Activity className="w-5 h-5" />, label: "Posture Monitor", href: "/posture-monitoring" },
    { icon: <History className="w-5 h-5" />, label: "History", href: "/history" },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // 模拟数据刷新
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  return (
    <div 
      className="min-h-screen bg-background"
      onTouchStart={(e) => {
        if (window.scrollY === 0) {
          const touch = e.touches[0]
          setTouchStart(touch.clientY)
        }
      }}
      onTouchMove={(e) => {
        if (touchStart && window.scrollY === 0) {
          const touch = e.touches[0]
          const diff = touch.clientY - touchStart
          if (diff > 50 && !isRefreshing) {
            handleRefresh()
          }
        }
      }}
    >
      <div className="container max-w-md mx-auto p-4 pb-20">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <h1 className="text-xl font-bold">LockedIN</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {moreMenuItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-sm text-muted-foreground">Ready for your next workout?</p>
          </div>

          <Card className="bg-primary/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2 cursor-pointer"
                   onClick={() => setIsProgressExpanded(!isProgressExpanded)}>
                <span className="text-sm font-medium">Weekly Progress</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">68%</span>
                  {isProgressExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
              <Progress value={68} className="h-1.5" />
              <div 
                className={`mt-4 space-y-2 text-sm transition-all duration-300
                  ${isProgressExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                <div className="flex justify-between">
                  <span>Workouts completed</span>
                  <span>3/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Calories burned</span>
                  <span>2,400</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center cursor-pointer"
                   onClick={() => setIsWorkoutExpanded(!isWorkoutExpanded)}>
                <h3 className="font-medium">Today&apos;s Workout</h3>
                {isWorkoutExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
              {isWorkoutExpanded && (
                <Button className="w-full" onClick={() => window.location.href = '/workout-selection'}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Workout
                </Button>
              )}
            </CardContent>
          </Card>

          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Recommended for You</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Weekly Goal</span>
                    <span>2 workouts left</span>
                  </div>
                  <Progress value={60} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {recommendedVideos.map((video) => (
                <Card 
                  key={video.title} 
                  className="hover:bg-accent/50 cursor-pointer transform transition-all duration-200 hover:scale-105"
                  onClick={() => window.location.href = `/video/${video.title}`}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="text-3xl transform transition-all duration-200 group-hover:scale-110">
                      {video.thumbnail}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{video.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Today&apos;s Activity</h4> 
                    <div className="flex space-x-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Steps</span>
                        <p className="font-medium">6,240</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Calories</span>
                        <p className="font-medium">320</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Min</span>
                        <p className="font-medium">45</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </section>

        <Button 
          className={`fixed right-4 transition-all duration-300 shadow-lg bg-primary
            ${showFab ? 'bottom-20 opacity-100' : '-bottom-20 opacity-0'}
            rounded-full w-12 h-12 hover:scale-110`}
          size="icon"
          onClick={() => window.location.href = '/workout-selection'}
        >
          <Play className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}