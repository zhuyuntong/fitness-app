import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Play } from 'lucide-react'
import Link from "next/link"

export default function QuickWorkoutSelection() {
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(null)

  const times = [5, 10, 15, 25, 30, 35]
  const intensities = [
    { name: "Low", color: "border-green-500" },
    { name: "Medium", color: "border-blue-500" },
    { name: "High", color: "border-red-500" },
  ]
  const workouts = [
    { name: "Full Body", description: "Complete body workout", icon: "🏋️" },
    { name: "HIIT", description: "High-intensity intervals", icon: "⚡" },
    { name: "Cardio", description: "Improve endurance", icon: "🫀" },
    { name: "Stretching", description: "Flexibility & recovery", icon: "🧘" },
  ]

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <header className="flex items-center mb-4">
        <Link href="/home" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Quick Workout Selection</h1>
      </header>
      <p className="text-muted-foreground">Find the perfect workout for your schedule</p>

      <section>
        <h2 className="font-semibold mb-2">Available Time</h2>
        <div className="grid grid-cols-3 gap-2">
          {times.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              onClick={() => setSelectedTime(time)}
              className="w-full"
            >
              {time} min
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Intensity</h2>
        <div className="flex justify-between">
          {intensities.map((intensity) => (
            <Button
              key={intensity.name}
              variant="outline"
              onClick={() => setSelectedIntensity(intensity.name)}
              className={`w-[32%] ${
                selectedIntensity === intensity.name ? `border-2 ${intensity.color}` : ""
              }`}
            >
              {intensity.name}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Quick Workout Selection</h2>
        <div className="space-y-2">
          {workouts.map((workout) => (
            <Card key={workout.name}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{workout.icon}</span>
                  <div>
                    <h3 className="font-semibold">{workout.name}</h3>
                    <p className="text-sm text-muted-foreground">{workout.description}</p>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <Play className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}