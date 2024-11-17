'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ChevronRight, ArrowLeft,
  PersonStanding
} from "lucide-react"

type ActivityType = "All" | "Walking" | "Running" | "Swimming"

interface Activity {
  id: string
  type: ActivityType
  date: string
  distance: string
  duration: string
  calories: number
  icon: JSX.Element
}

const activities: Activity[] = [
  {
    id: "1",
    type: "Walking",
    date: "10/23/24", 
    distance: "1.66KM",
    duration: "0:34:49",
    calories: 169,
    icon: <PersonStanding className="h-5 w-5 text-green-500" />
  },
  {
    id: "2", 
    type: "Walking",
    date: "9/26/24",
    distance: "1.60KM", 
    duration: "0:18:21",
    calories: 89,
    icon: <PersonStanding className="h-5 w-5 text-green-500" />
  },
  {
    id: "3",
    type: "Running",
    date: "10/21/24",
    distance: "5.2KM",
    duration: "0:28:15",
    calories: 312,
    icon: <PersonStanding className="h-5 w-5 text-blue-500" />
  },
  {
    id: "4",
    type: "Swimming",
    date: "10/19/24",
    distance: "1.2KM",
    duration: "0:45:30",
    calories: 425,
    icon: <PersonStanding className="h-5 w-5 text-cyan-500" />
  },
  {
    id: "5",
    type: "Running",
    date: "10/15/24",
    distance: "3.8KM",
    duration: "0:22:40",
    calories: 285,
    icon: <PersonStanding className="h-5 w-5 text-blue-500" />
  },
  {
    id: "6",
    type: "Swimming",
    date: "10/12/24",
    distance: "0.8KM",
    duration: "0:32:15",
    calories: 310,
    icon: <PersonStanding className="h-5 w-5 text-cyan-500" />
  }
]

export default function ActivityHistory() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<ActivityType>("All")
  const [showAll, setShowAll] = useState(false)

  const filterTypes: ActivityType[] = ["All", "Walking", "Running", "Swimming"]

  const filteredActivities = activities.filter(
    activity => selectedType === "All" || activity.type === selectedType
  )

  const displayedActivities = showAll ? filteredActivities : filteredActivities.slice(0, 3)

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">History</h1>
      </div>

      <div className="space-y-6">
        {/* Activity Type Filter */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 pb-4">
            {filterTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="rounded-full"
              >
                {type}
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Activity List */}
        <div className="space-y-3">
          {displayedActivities.map((activity) => (
            <Card
              key={activity.id}
              className="p-4 hover:bg-accent cursor-pointer"
              onClick={() => router.push(`/activity/${activity.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {activity.icon}
                  <div>
                    <h3 className="font-medium">{activity.type}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{activity.distance}</span>
                      <span>•</span>
                      <span>{activity.date}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {filteredActivities.length > 3 && !showAll && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAll(true)}
          >
            Show More
          </Button>
        )}
      </div>
    </div>
  )
} 