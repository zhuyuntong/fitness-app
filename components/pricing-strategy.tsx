import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"

interface PricingStrategyProps {
  isPremium?: boolean
}

export default function PricingStrategy({ isPremium = false }: PricingStrategyProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Choose Your Plan</h1>
      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>For casual users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-4xl font-bold">$0</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </CardContent>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Access to basic workout library
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Limited AI-generated workouts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Basic progress tracking
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Get Started</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>For dedicated fitness enthusiasts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-4xl font-bold">$9.99</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </CardContent>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Full access to workout library
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Unlimited AI-generated workouts
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Advanced progress tracking
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Personalized workout plans
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Access to exclusive content
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {/* <Button className="w-full">Upgrade to Premium</Button> */}
            {isPremium ? (
              <Button className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Button className="w-full">
                Upgrade to Premium
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}