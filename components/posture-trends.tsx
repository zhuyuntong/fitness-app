'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from 'lucide-react'
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PostureTrends() {
  const [timeRange, setTimeRange] = useState('week')

  const data = {
    week: [
      { name: 'Mon', score: 65 },
      { name: 'Tue', score: 68 },
      { name: 'Wed', score: 70 },
      { name: 'Thu', score: 72 },
      { name: 'Fri', score: 75 },
      { name: 'Sat', score: 78 },
      { name: 'Sun', score: 80 },
    ],
    month: [
      { name: 'Week 1', score: 65 },
      { name: 'Week 2', score: 70 },
      { name: 'Week 3', score: 75 },
      { name: 'Week 4', score: 80 },
    ],
    year: [
      { name: 'Jan', score: 60 },
      { name: 'Feb', score: 65 },
      { name: 'Mar', score: 70 },
      { name: 'Apr', score: 72 },
      { name: 'May', score: 75 },
      { name: 'Jun', score: 78 },
      { name: 'Jul', score: 80 },
      { name: 'Aug', score: 82 },
      { name: 'Sep', score: 85 },
      { name: 'Oct', score: 87 },
      { name: 'Nov', score: 88 },
      { name: 'Dec', score: 90 },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="flex items-center mb-6">
          <Link href="/posture-monitoring" className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Posture Trends</h1>
        </header>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Overall Posture Score</h2>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data[timeRange as keyof typeof data]}
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
                <span>You&apos;ve maintained good posture for 70% of your workout time.</span>
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

        <Button className="w-full">View Detailed Analysis</Button>
      </div>
    </div>
  )
}