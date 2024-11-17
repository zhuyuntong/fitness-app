import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, CheckCircle } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface Challenge {
  id: number
  name: string
  description: string
  progress: number
}

export default function PostureChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 1, name: "Perfect Posture Week", description: "Maintain good posture for 7 days straight", progress: 57 },
    { id: 2, name: "Core Strength Builder", description: "Complete 50 core exercises this week", progress: 30 },
    { id: 3, name: "Flexibility Master", description: "Do 15 minutes of stretching daily for 5 days", progress: 80 },
  ])

  const completeChallenge = (id: number) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id ? { ...challenge, progress: 100 } : challenge
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Posture Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map(challenge => (
            <div key={challenge.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{challenge.name}</h3>
                {challenge.progress === 100 && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <p className="text-sm text-gray-600">{challenge.description}</p>
              <div className="flex items-center space-x-2">
                <Progress value={challenge.progress} className="flex-grow" />
                <span className="text-sm font-medium">{challenge.progress}%</span>
              </div>
              {challenge.progress < 100 && (
                <Button size="sm" onClick={() => completeChallenge(challenge.id)}>Complete</Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}