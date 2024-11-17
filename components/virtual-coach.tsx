import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mic, MicOff } from 'lucide-react'

export default function VirtualCoach() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [feedback, setFeedback] = useState<string[]>([])

  useEffect(() => {
    // Simulating real-time feedback
    const interval = setInterval(() => {
      if (isSpeaking) {
        setFeedback(prev => [...prev, getRandomFeedback()])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isSpeaking])

  const getRandomFeedback = () => {
    const feedbackOptions = [
      "Great job! Keep your back straight.",
      "Remember to breathe deeply.",
      "You're doing well, maintain that posture!",
      "Try to relax your shoulders a bit.",
      "Excellent form on that last rep!"
    ]
    return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Virtual Coach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 overflow-y-auto mb-4 bg-gray-100 p-2 rounded">
          {feedback.map((message, index) => (
            <p key={index} className="mb-1">{message}</p>
          ))}
        </div>
        <Button 
          className="w-full" 
          onClick={() => setIsSpeaking(!isSpeaking)}
          variant={isSpeaking ? "destructive" : "default"}
        >
          {isSpeaking ? (
            <>
              <MicOff className="w-4 h-4 mr-2" />
              Mute Coach
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Unmute Coach
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}