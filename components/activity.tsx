'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  PersonStanding, ChevronRight,
  Target, Timer, Footprints, CalendarIcon
} from "lucide-react"
// import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Activity {
  id: string
  type: string
  date: string
  distance: string
  duration: string
  calories: number
  icon: JSX.Element
}

const recentActivities: Activity[] = [
  {
    id: "1",
    type: "Indoor Walk",
    date: "10/23/24",
    distance: "1.66KM",
    duration: "0:34:49",
    calories: 169,
    icon: <PersonStanding className="h-5 w-5 text-green-500" />
  },
  {
    id: "2",
    type: "Outdoor Walk",
    date: "9/26/24",
    distance: "1.60KM",
    duration: "0:18:21",
    calories: 89,
    icon: <PersonStanding className="h-5 w-5 text-green-500" />
  }
]

const days = [
  { day: "Sat", date: "26", active: false },
  { day: "Sun", date: "27", active: false },
  { day: "Mon", date: "28", active: true },
  { day: "Tue", date: "29", active: false },
  { day: "Wed", date: "30", active: false },
]

// 添加每日数据接口
interface DayData {
  goals: {
    calories: { current: number, target: number }
    minutes: { current: number, target: number }
    steps: { current: number, target: number }
  }
  chartData: Array<{ time: string, calories: number }>
  activities: Array<{
    type: string
    icon: string
    time: string
    duration: string
    distance: string
  }>
}

// 模拟不同日期的数据
const dailyData: Record<string, DayData> = {
  "26": {
    goals: {
      calories: { current: 520, target: 720 },
      minutes: { current: 45, target: 30 },
      steps: { current: 8443, target: 10000 }
    },
    chartData: [
      { time: "8AM", calories: 120 },
      { time: "10AM", calories: 184 },
      { time: "12PM", calories: 240 },
      { time: "2PM", calories: 360 },
      { time: "4PM", calories: 520 },
    ],
    activities: [
      { 
        type: "Cycling",
        icon: "🚴",
        time: "8.00 AM - 9.30AM",
        duration: "1.32",
        distance: "9.50"
      }
    ]
  },
  "28": {
    goals: {
      calories: { current: 1480, target: 720 },
      minutes: { current: 91, target: 30 },
      steps: { current: 14430, target: 10000 }
    },
    chartData: [
      { time: "8AM", calories: 50 },
      { time: "10AM", calories: 840 },
      { time: "12PM", calories: 40 },
      { time: "2PM", calories: 360 },
      { time: "4PM", calories: 90 },
    ],
    activities: [
      { 
        type: "Running",
        icon: "🏃",
        time: "8.00 AM - 9.30AM",
        duration: "1.32",
        distance: "9.50"
      }
    ]
  }
}

export default function Activity() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState("28") // 默认选中当天
  const dayData = dailyData[selectedDate] // 获取选中日期的数据

  // 空状态检查
  const hasData = Boolean(dayData)

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      {/* <header>
        <Link href="/home#dashboard" className="inline-flex items-center text-sm text-muted-foreground mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold">Activity</h1>
      </header> */}

      {/* Daily Goals */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Today&apos;s Goals</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">
                {hasData ? dayData.goals.calories.current : 0}
              </div>
              <div className="text-xs text-muted-foreground">
                of {hasData ? dayData.goals.calories.target : 0} cal
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Timer className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">
                {hasData ? dayData.goals.minutes.current : 0}
              </div>
              <div className="text-xs text-muted-foreground">
                of {hasData ? dayData.goals.minutes.target : 0} min
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Footprints className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">
                {hasData ? dayData.goals.steps.current : 0}
              </div>
              <div className="text-xs text-muted-foreground">steps</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Weekly Overview */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">This week</h2>
        <div className="flex justify-between gap-2">
          {days.map((day) => (
            <button
              key={day.day}
              onClick={() => setSelectedDate(day.date)}
              className={`flex-1 py-2 px-3 rounded-2xl flex flex-col items-center transition-colors ${
                day.date === selectedDate
                  ? 'bg-blue-500 text-white' 
                  : 'bg-accent hover:bg-accent/80'
              }`}
            >
              <span className="text-sm">{day.day}</span>
              <span className="text-lg font-semibold">{day.date}</span>
            </button>
          ))}
        </div>

        {hasData ? (
          <div className="space-y-2">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {dayData.goals.calories.current}
              </span>
              <span className="text-muted-foreground ml-1">kcal</span>
            </div>
            
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dayData.chartData}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis hide />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-accent px-2 py-1 rounded">
                            <p>{`${payload[0].value} cal`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#60A5FA"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No activity data for this date</p>
          </Card>
        )}
      </section>

      {/* Today's Activities */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Activities</h2>
        {hasData && dayData.activities.length > 0 ? (
          <div className="space-y-6">
            {dayData.activities.map((activity, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{activity.icon}</span>
                  <span className="font-medium">{activity.type}</span>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-muted-foreground text-sm">{activity.time}</span>
                </div>
                <div className="flex space-x-8">
                  <div>
                    <span className="text-2xl font-bold">{activity.duration}</span>
                    <span className="text-muted-foreground ml-1">hours</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold">{activity.distance}</span>
                    <span className="text-muted-foreground ml-1">kilometers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No activities recorded</p>
          </Card>
        )}
      </section>

      {/* Recent Activities */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
          <Button 
            variant="ghost" 
            className="text-sm text-muted-foreground"
            onClick={() => router.push('/activity/history')}
          >
            Show All
          </Button>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <Card
              key={activity.id}
              className="p-4 hover:bg-accent cursor-pointer"
              onClick={() => router.push(`/activity/${activity.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {activity.icon}
                  <div>
                    <h3 className="font-medium">{activity.type}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{activity.distance}</span>
                      <span>•</span>
                      <span>{activity.date}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}