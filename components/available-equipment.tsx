'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'

export default function AvailableEquipment() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const workoutType = searchParams.get('type')

  const equipmentByType = {
    'Full Body': [
      { name: 'Dumbbells', description: 'For strength training' },
      { name: 'Resistance Bands', description: 'For mobility and strength' },
      { name: 'Bench', description: 'For stability exercise' },
    ],
    'HIIT': [
      { name: 'Jump Rope', description: 'For cardio training' },
      { name: 'Exercise Mat', description: 'For floor exercises' },
      { name: 'Battle Rope', description: 'For intense cardio' },
    ],
    'Cardio': [
      { name: 'Jump Rope', description: 'For cardio training' },
      { name: 'Treadmill', description: 'For running workouts' },
      { name: 'Stationary Bike', description: 'For cycling workouts' },
    ],
    'Stretching': [
      { name: 'Exercise Mat', description: 'For floor exercises' },
      { name: 'Resistance Bands', description: 'For mobility and strength' },
      { name: 'Massage Ball', description: 'For muscle recovery' },
    ],
  }

  const currentEquipment = workoutType && equipmentByType[workoutType as keyof typeof equipmentByType]
    ? equipmentByType[workoutType as keyof typeof equipmentByType]
    : equipmentByType['Full Body']

  const getEquipmentIcon = (name: string) => {
    // 保持现有的图标样式，为每种器材返回相应的SVG路径
    switch (name) {
      case 'Dumbbells':
        return <path d="M6 20v-4M18 20v-4M4 8h16M8 12h8" strokeWidth="2" strokeLinecap="round" />
      case 'Resistance Bands':
        return <path d="M4 8h16M4 12h16M4 16h16" strokeWidth="2" strokeLinecap="round" />
      case 'Bench':
        return <path d="M4 12h16M8 8v8M16 8v8" strokeWidth="2" strokeLinecap="round" />
      case 'Jump Rope':
        return <path d="M4 12c8-8 8 8 16 0" strokeWidth="2" strokeLinecap="round" />
      case 'Exercise Mat':
        return <path d="M3 6h18v12H3z" strokeWidth="2" strokeLinecap="round" />
      case 'Battle Rope':
        return <path d="M4 12c8-4 8 4 16 0" strokeWidth="2" strokeLinecap="round" />
      case 'Treadmill':
        return <path d="M4 8h16M4 16h16M8 4v16" strokeWidth="2" strokeLinecap="round" />
      case 'Stationary Bike':
        return <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" strokeWidth="2" />
      case 'Massage Ball':
        return <path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" strokeWidth="2" />
      default:
        return <path d="M12 12h.01" strokeWidth="2" strokeLinecap="round" />
    }
  }

  const handleBack = () => {
    router.push('/workout-selection')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="flex items-center mb-6">
          <button onClick={handleBack} className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Available Equipment</h1>
        </header>
        
        <p className="text-gray-500 mb-8">
          Select all equipment you have access to
        </p>

        <div className="space-y-6">
          {currentEquipment.map((item) => (
            <button key={item.name} className="w-full flex items-center space-x-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {getEquipmentIcon(item.name)}
                </svg>
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-32 pt-40">
          <Link 
            href={`/workout-details?type=${encodeURIComponent(workoutType || 'Full Body')}&time=${searchParams.get('time') || '10'}&intensity=${searchParams.get('intensity') || 'Medium'}`}
          >
            <Button className="w-full bg-black text-white hover:bg-black/90 h-12">
              START WORKOUT
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}