'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, User } from "lucide-react"

export default function ProfilePage() {
  const userProfile = {
    name: "Demo User",
    email: "demo@example.com",
    stats: {
      workouts: 12,
      hours: 8.5,
      streak: 5
    }
  }

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <header className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <CardTitle>{userProfile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{userProfile.stats.workouts}</p>
              <p className="text-sm text-muted-foreground">Workouts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{userProfile.stats.hours}</p>
              <p className="text-sm text-muted-foreground">Hours</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{userProfile.stats.streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={() => window.location.href = '/'}>
        Sign Out
      </Button>
    </div>
  )
}