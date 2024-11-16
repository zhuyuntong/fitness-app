'use client'

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

export default function PostureHistory() {
  const [period, setPeriod] = useState("week")
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

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Posture History</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Posture Score Trend</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
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
            <div className="h-[200px] w-full">
              <div className="flex h-full items-end gap-2">
                {chartData[period].map((value, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex-1 flex flex-col items-center gap-2">
                          <div 
                            className="w-full bg-primary/20 rounded-sm" 
                            style={{ height: `${value}%` }}
                          >
                            <div 
                              className="w-full bg-primary rounded-sm transition-all duration-500" 
                              style={{ height: `${value}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{labels[period][index]}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Score: {value}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
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