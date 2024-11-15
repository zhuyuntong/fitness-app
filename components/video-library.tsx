import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Play } from "lucide-react"

export default function VideoLibrary() {
  const videos = [
    { id: 1, title: "Full Body Workout", duration: "30 min" },
    { id: 2, title: "Upper Body Strength", duration: "25 min" },
    { id: 3, title: "Core Crusher", duration: "15 min" },
    { id: 4, title: "Leg Day Intensity", duration: "35 min" },
    { id: 5, title: "Cardio Blast", duration: "20 min" },
    { id: 6, title: "Yoga Flow", duration: "45 min" },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Workout Video Library</h1>
      <Input className="mb-6" placeholder="Search videos..." />
      <div className="grid grid-cols-1 gap-6">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
              <CardDescription>{video.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4">
                <Play className="h-12 w-12 text-gray-400" />
              </div>
              <Button className="w-full">Watch Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}