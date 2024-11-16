import PricingStrategy from "@/components/pricing-strategy"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center p-4">
        <Link href="/profile" className="mr-4">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Subscription</h1>
      </header>
      <PricingStrategy isPremium={true} />
    </div>
  )
}