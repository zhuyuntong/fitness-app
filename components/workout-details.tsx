'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Activity, Clock, Gauge } from 'lucide-react'
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'

export default function WorkoutDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const workoutType = searchParams.get('type') || 'Full Body'
  const selectedTime = searchParams.get('time') || '10'
  const selectedIntensity = searchParams.get('intensity') || 'Medium'

  const exercisesByType = {
    'Full Body': [
      { name: "Bench Press", sets: 4 },
      { name: "Shoulder", sets: 4 },
      { name: "Back", sets: 4 },
    ],
    'HIIT': [
      { name: "Burpees", sets: 4 },
      { name: "High Knees", sets: 4 },
      { name: "Mountain Climber", sets: 4 },
    ],
    'Cardio': [
      { name: "Running", sets: 4 },
      { name: "Jump Rope", sets: 4 },
      { name: "Jumping Jack", sets: 4 },
    ],
    'Stretching': [
      { name: "Ballistic", sets: 4 },
      { name: "Passive", sets: 4 },
      { name: "Active", sets: 4 },
    ],
  }

  const currentExercises = exercisesByType[workoutType as keyof typeof exercisesByType]

  const handleExerciseClick = (exerciseName: string) => {
    router.push(`/video-library?exercise=${encodeURIComponent(exerciseName)}`)
  }

  const handlePostureClick = () => {
    router.push('/posture-monitoring')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="flex items-center mb-6">
          <Link href="/available-equipment" className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">{workoutType}</h1>
        </header>

        <div className="flex space-x-4">
          <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm">
            <Clock className="mr-2 h-4 w-4" />
            {selectedTime}.00 mins
          </div>
          <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm">
            <Gauge className="mr-2 h-4 w-4" />
            {selectedIntensity} Intensity
          </div>
        </div>

        <div className="space-y-6">
          {currentExercises.map((exercise, index) => (
            <button 
              key={index} 
              className="w-full flex items-center space-x-4"
              onClick={() => handleExerciseClick(exercise.name)}
            >
              <div className="w-12 h-12 bg-black rounded-full flex-shrink-0" />
              <div className="text-left">
                <h2 className="font-semibold text-lg">{exercise.name}</h2>
                <p className="text-gray-500">Sets {exercise.sets}</p>
              </div>
            </button>
          ))}
        </div>

        <Card className="mt-8">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <h2 className="font-semibold">Posture Monitoring</h2>
            </div>
            <p className="text-gray-500 text-sm">
              Monitor and improve your posture during workouts.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handlePostureClick}
            >
              Go to Posture Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}