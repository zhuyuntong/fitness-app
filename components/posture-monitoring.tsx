import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function PostureMonitoring() {
  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Posture Monitoring</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Posture Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48 flex items-center justify-center border-4 rounded-full mb-4">
              <span className="text-4xl font-bold">0%</span>
            </div>
            <Progress value={0} className="w-full" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Neck Angle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">0°</div>
              <div className="text-green-500">Good</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Back Angle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">0°</div>
              <div className="text-green-500">Good</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Time in Good Posture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0 seconds</div>
          </CardContent>
        </Card>

        <Button className="w-full" size="lg">
          Start Monitoring
        </Button>

        <div className="flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">Press start to begin monitoring your posture</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" asChild>
            <Link href="/posture-history">Posture History</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/posture-tips">Posture Tips</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}