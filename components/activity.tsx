'use client'

// import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Activity() {
  const days = [
    { day: "Sat", date: "26", active: false },
    { day: "Sun", date: "27", active: false },
    { day: "Mon", date: "28", active: true },
    { day: "Tue", date: "29", active: false },
    { day: "Wed", date: "30", active: false },
  ]

  const data = [
    { time: "8AM", calories: 20 },
    { time: "10AM", calories: 84 },
    { time: "12AM", calories: 40 },
    { time: "2PM", calories: 60 },
    { time: "4PM", calories: 90 },
  ]

  const activities = [
    { 
      type: "Cycling",
      icon: "🚴",
      time: "8.00 AM - 9.30AM",
      duration: "1.32",
      distance: "9.50"
    },
    {
      type: "Running",
      icon: "🏃",
      time: "8.00 AM - 9.30AM",
      duration: "1.32",
      distance: "9.50"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="flex items-center mb-6">
          <Link href="/home#dashboard" className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Your activities</h1>
        </header>

        <section>
          <h2 className="text-xl font-bold mb-4">This week</h2>
          <div className="flex justify-between gap-2">
            {days.map((day) => (
              <button
                key={day.day}
                className={`flex-1 py-2 px-3 rounded-2xl flex flex-col items-center ${
                  day.active 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                <span className="text-sm">{day.day}</span>
                <span className="text-lg font-semibold">{day.date}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">1680</span>
            <span className="text-gray-500 ml-1">kcal</span>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
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
                        <div className="bg-[#F8E4B7] px-2 py-1 rounded">
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
                  fill="url(#colorCalories)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{activity.icon}</span>
                <span className="font-medium">{activity.type}</span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
              <div className="flex space-x-8">
                <div>
                  <span className="text-2xl font-bold">{activity.duration}</span>
                  <span className="text-gray-500 ml-1">hours</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">{activity.distance}</span>
                  <span className="text-gray-500 ml-1">kilometers</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}