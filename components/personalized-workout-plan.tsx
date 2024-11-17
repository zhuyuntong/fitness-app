import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Calendar } from 'lucide-react'

interface WorkoutPlan {
  name: string
  duration: string
  focus: string
}

export default function PersonalizedWorkoutPlan() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchWorkoutPlan = async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setWorkoutPlan({
        name: "Posture Improvement Plan",
        duration: "4 weeks",
        focus: "Core strength and flexibility"
      })
    }

    fetchWorkoutPlan()
  }, [])

  if (!workoutPlan) {
    return <div>Generating your personalized plan based on your posture data...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Dumbbell className="w-5 h-5 mr-2" />
          Personalized Workout Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Plan:</strong> {workoutPlan.name}</p>
          <p><strong>Duration:</strong> {workoutPlan.duration}</p>
          <p><strong>Focus:</strong> {workoutPlan.focus}</p>
        </div>
        <Button className="mt-4 w-full">
          <Calendar className="w-4 h-4 mr-2" />
          View Full Schedule
        </Button>
      </CardContent>
    </Card>
  )
}