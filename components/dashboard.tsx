'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Play, User } from 'lucide-react'
import Link from "next/link"

export function DashboardComponent() {
  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Jane Doe!</h1>
          <p className="text-muted-foreground">Ready for your next workout?</p>
        </div>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
          <span className="sr-only">User profile</span>
        </Button>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Weekly Goal</h3>
            <Progress value={68} className="mb-2" />
            <p className="text-sm text-muted-foreground">5 day streak! Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Workout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">Full Body Strength</p>
            <Button className="w-full">
              Start Workout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/video-library">
            <Play className="mr-2 h-4 w-4" />
            Video Library
          </Link>
        </Button>
      </div>
    </div>
  )
}