import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import Link from "next/link"

export default function AvailableEquipment() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="flex items-center mb-6">
          <Link href="/quick-workout-selection" className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Available Equipment</h1>
        </header>
        
        <p className="text-gray-500 mb-8">
          Select all equipment you have access to
        </p>

        <div className="space-y-6">
          <button className="w-full flex items-center space-x-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 20v-4M18 20v-4M4 8h16M8 12h8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="font-semibold text-lg">Dumbbells</h2>
              <p className="text-gray-500">For strength training</p>
            </div>
          </button>

          <button className="w-full flex items-center space-x-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 8h16M4 12h16M4 16h16" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="font-semibold text-lg">Resistance Bands</h2>
              <p className="text-gray-500">For mobility and strength</p>
            </div>
          </button>

          <button className="w-full flex items-center space-x-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 12h16M8 8v8M16 8v8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="font-semibold text-lg">Bench</h2>
              <p className="text-gray-500">For stability exercise</p>
            </div>
          </button>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
          <Button className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-full">
            START WORKOUT
          </Button>
        </div>
      </div>
    </div>
  )
}