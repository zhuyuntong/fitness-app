import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, FastForward, Rewind } from 'lucide-react'

export default function VideoPlayback() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const seekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const seekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Play className="w-5 h-5 mr-2" />
          Workout Playback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-200 mb-4 rounded overflow-hidden">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/placeholder-workout-video.mp4"
          />
        </div>
        <div className="flex justify-between">
          <Button variant="outline" size="icon" onClick={seekBackward}>
            <Rewind className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={restartVideo}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={seekForward}>
            <FastForward className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}