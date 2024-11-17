'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, Activity, Home, Smartphone, 
  Trophy, Target, Clock, Calendar, ChevronRight 
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import PostureTrends from "@/components/posture-trends"

export default function PostureMonitoring() {
  const router = useRouter()
  const [currentPostureScore, setCurrentPostureScore] = useState(85)
  const [postureGoal, setPostureGoal] = useState(90)
  const [timeInGoodPosture, setTimeInGoodPosture] = useState(7200) // 秒
  const [timeRange, setTimeRange] = useState('week')

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  // 圆形进度指示器组件
  const CircularProgress = ({ value }: { value: number }) => (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="stroke-muted stroke-[8] fill-none"
          cx="50"
          cy="50"
          r="45"
        />
        <circle
          className="stroke-primary stroke-[8] fill-none origin-center -rotate-90 transition-all duration-700 ease-in-out"
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${value * 2.83} ${283 - value * 2.83}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-4xl font-bold">{value}%</span>
        <span className="text-sm text-muted-foreground">Overall Score</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-md mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Posture Health</h1>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Posture Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center pt-6">
              <CircularProgress value={currentPostureScore} />
              <Progress value={(currentPostureScore / postureGoal) * 100} className="w-full mt-4" />
              <p className="text-xs text-muted-foreground mt-2">
                {postureGoal - currentPostureScore}% to reach your goal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Overall Posture Score</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/posture-history" className="flex items-center gap-1">
                  View more
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: 'Mon', score: 65 },
                    { name: 'Tue', score: 68 }, 
                    { name: 'Wed', score: 70 },
                    { name: 'Thu', score: 72 },
                    { name: 'Fri', score: 75 },
                    { name: 'Sat', score: 78 },
                    { name: 'Sun', score: 80 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Posture Insights</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Your posture score has improved by 15% this {timeRange}.</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>You've maintained good posture for 70% of your workout time.</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Focus on maintaining a neutral spine during seated exercises.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posture Goal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postureGoal}%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Adjust in settings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Good Posture Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatTime(timeInGoodPosture)}</div>
              <p className="text-xs text-muted-foreground mt-2">
                This week
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Yoga', 'Strength Training', 'Stretching'].map((workout, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{workout}</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button className="flex-1" asChild>
            <Link href="/workout-details">Start Monitoring</Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/posture-tips">View Tips</Link>
          </Button>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
          <div className="container max-w-md mx-auto">
            <div className="grid grid-cols-3 py-2">
              <Link 
                href="/home"
                className="flex flex-col items-center justify-center py-2 text-muted-foreground hover:text-primary"
              >
                <Home className="h-6 w-6" />
                <span className="text-xs">Home</span>
              </Link>
              <Link 
                href="/activity"
                className="flex flex-col items-center justify-center py-2 text-muted-foreground hover:text-primary"
              >
                <Activity className="h-6 w-6" />
                <span className="text-xs">Activity</span>
              </Link>
              <Link 
                href="/posture"
                className="flex flex-col items-center justify-center py-2 text-primary"
              >
                <Smartphone className="h-6 w-6" />
                <span className="text-xs">Posture</span>
              </Link>
            </div>
          </div>
        </nav>
      </main>
    </div>
  )
}