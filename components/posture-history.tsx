'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Area, AreaChart 
} from 'recharts'

type Period = "week" | "month" | "year"

interface PostureSession {
  date: string
  score: number
  duration: number
  improvement: number
}

export default function PostureHistory() {
  const router = useRouter()
  const [period, setPeriod] = useState<Period>("week")
  const chartData = {
    week: [65, 70, 80, 75, 85, 90, 88],
    month: [60, 65, 70, 75, 80, 85, 90, 88, 85, 82, 80, 78, 75, 72, 70, 68, 65, 62, 60, 58, 55, 52, 50, 48, 45, 42, 40, 38, 35],
    year: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 88]
  }
  const labels = {
    week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: Array.from({length: 30}, (_, i) => i + 1),
    year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }

  // 添加历史会话数据
  const historicalSessions: PostureSession[] = [
    {
      date: "Today",
      score: 88,
      duration: 45,
      improvement: 5
    },
    {
      date: "Yesterday",
      score: 85,
      duration: 30,
      improvement: 3
    },
    {
      date: "2 days ago",
      score: 82,
      duration: 60,
      improvement: 4
    },
    {
      date: "3 days ago",
      score: 78,
      duration: 40,
      improvement: 2
    }
  ]

  // 更新趋势数据结构
  const trendData = {
    week: [
      { name: 'Mon', average: 65, peak: 75, lowest: 60 },
      { name: 'Tue', average: 68, peak: 78, lowest: 62 },
      { name: 'Wed', average: 70, peak: 82, lowest: 65 },
      { name: 'Thu', average: 72, peak: 85, lowest: 68 },
      { name: 'Fri', average: 75, peak: 88, lowest: 70 },
      { name: 'Sat', average: 78, peak: 90, lowest: 73 },
      { name: 'Sun', average: 80, peak: 92, lowest: 75 },
    ],
    month: [
      { name: 'Week 1', average: 65, peak: 75, lowest: 60 },
      { name: 'Week 2', average: 70, peak: 82, lowest: 65 },
      { name: 'Week 3', average: 75, peak: 88, lowest: 70 },
      { name: 'Week 4', average: 80, peak: 92, lowest: 75 },
    ],
    year: [
      { name: 'Jan', average: 60, peak: 70, lowest: 55 },
      { name: 'Feb', average: 65, peak: 75, lowest: 60 },
      { name: 'Mar', average: 70, peak: 82, lowest: 65 },
      { name: 'Apr', average: 72, peak: 85, lowest: 68 },
      { name: 'May', average: 75, peak: 88, lowest: 70 },
      { name: 'Jun', average: 78, peak: 90, lowest: 73 },
      { name: 'Jul', average: 80, peak: 92, lowest: 75 },
      { name: 'Aug', average: 82, peak: 94, lowest: 77 },
      { name: 'Sep', average: 85, peak: 95, lowest: 80 },
      { name: 'Oct', average: 87, peak: 96, lowest: 82 },
      { name: 'Nov', average: 88, peak: 97, lowest: 83 },
      { name: 'Dec', average: 90, peak: 98, lowest: 85 },
    ],
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-green-500">Peak: {payload[0].value}%</p>
          <p className="text-sm text-blue-500">Average: {payload[1].value}%</p>
          <p className="text-sm text-yellow-500">Lowest: {payload[2].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Posture History</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Posture Score Trend</CardTitle>
            <Select 
              value={period} 
              onValueChange={(value: Period) => setPeriod(value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData[period]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="peak" 
                    stroke="#22c55e" 
                    fillOpacity={1}
                    fill="url(#colorPeak)"
                    name="Peak Score"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#3b82f6" 
                    fillOpacity={1}
                    fill="url(#colorAvg)"
                    name="Average Score"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lowest" 
                    stroke="#eab308" 
                    fillOpacity={1}
                    fill="url(#colorLow)"
                    name="Lowest Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicalSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{session.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.duration} minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{session.score}%</p>
                    <p className="text-sm text-green-500">
                      +{session.improvement}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Best performance time:</span>
                <span className="font-medium text-foreground">Afternoon</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Average session duration:</span>
                <span className="font-medium text-foreground">43.75 mins</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Weekly improvement:</span>
                <span className="font-medium text-green-500">+14%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Score:</span>
              <span className="font-bold">
                {Math.round(chartData[period].reduce((a, b) => a + b, 0) / chartData[period].length)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Highest Score:</span>
              <span className="font-bold">{Math.max(...chartData[period])}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lowest Score:</span>
              <span className="font-bold">{Math.min(...chartData[period])}</span>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" variant="outline">
          Export Data
        </Button>
      </div>
    </div>
  )
}