'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play } from 'lucide-react'

export default function DashboardComponent() {
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">LockedIN</h1>
      </header>

      <section>
        <h3 className="font-semibold mb-2">Today&apos;s Workout</h3>
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Full Body Strength</h4>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Start Workout
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Button variant="outline" className="w-full" onClick={() => window.location.href = '/video-library'}>
          Video Library
        </Button>
      </section>
    </div>
  )
}