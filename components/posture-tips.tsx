'use client'

import { ArrowLeft, AlertTriangle} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"

export default function PostureTips() {
  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Posture Tips</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="aspect-video relative mb-4">
              <Image
                src="/placeholder.svg"
                alt="Proper screen positioning illustration"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">
              Position Your Screen at Eye Level
            </h2>
            <p className="text-center text-muted-foreground">
              Adjust your monitor so that the top of the screen is at or slightly below eye level to
              avoid neck strain.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Common Mistakes to Avoid</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="slouching">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Slouching
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Maintain a straight back and avoid slouching forward. Keep your shoulders back and your
                core engaged.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="crossing-legs">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Crossing Legs
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Keep both feet flat on the floor. Crossing legs can lead to poor circulation and
                misalignment of your spine.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="hunching">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Hunching Shoulders
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Relax your shoulders and keep them down and back. Avoid tensing them up towards your
                ears.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="neck">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Craning Neck Forward
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Keep your head aligned with your spine. Avoid jutting your chin forward towards your
                screen.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Button className="w-full" size="lg">
          Schedule a Posture Assessment
        </Button>
      </div>
    </div>
  )
}