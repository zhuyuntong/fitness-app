import { Suspense } from 'react'
import AvailableEquipment from "@/components/available-equipment"

export default function AvailableEquipmentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <AvailableEquipment />
    </Suspense>
  )
}