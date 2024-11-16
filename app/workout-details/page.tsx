import { Suspense } from 'react'
import WorkoutDetails from "@/components/workout-details"

export default function WorkoutDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <WorkoutDetails />
    </Suspense>
  )
}