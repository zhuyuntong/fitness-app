import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy } from 'lucide-react'

interface GamificationWidgetProps {
  postureScore: number
  timeInGoodPosture: number
}

export default function GamificationWidget({ postureScore, timeInGoodPosture }: GamificationWidgetProps) {
  const level = Math.floor(postureScore / 10) + 1
  const nextLevelScore = level * 10

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Posture Master</h3>
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level {level}</span>
            <span>{postureScore} / {nextLevelScore}</span>
          </div>
          <Progress value={(postureScore % 10) * 10} className="h-2" />
        </div>
        <div className="text-sm">
          <p>Time in good posture: {timeInGoodPosture} minutes</p>
          <p>Unlock next achievement in {nextLevelScore - postureScore} points!</p>
        </div>
      </CardContent>
    </Card>
  )
}