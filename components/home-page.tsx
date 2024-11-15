import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { User, Play } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
          <h1 className="text-xl font-bold">LockedIN</h1>
        </div>
        <Link href="/profile">
          <User className="w-6 h-6" />
        </Link>
      </header>

      <section className="space-y-2">
        <h2 className="text-2xl font-bold">Welcome back, Jane Doe!</h2>
        <p className="text-muted-foreground">Ready for your next workout?</p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Your Progress</h3>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Weekly Goal</span>
              <span className="text-muted-foreground">68%</span>
            </div>
            <Progress value={68} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">5 day streak! Keep it up!</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Today's Workout</h3>
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Full Body Strength</h4>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Start Workout
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Button variant="outline" className="w-full">
          Video Library
        </Button>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="container max-w-md mx-auto flex justify-around p-2">
          <Link href="/home" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>
          <Link href="/workouts" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
          </Link>
          <Link href="/progress" className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </Link>
          <Link href="/profile" className="p-2">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </div>
  )
}