'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, CreditCard, Settings, Lock } from 'lucide-react'
import Link from "next/link"

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [dataSharing, setDataSharing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="flex items-center mb-6">
          <Link href="/home" className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </header>

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 border rounded-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">John Zhu</h1>
            <p className="text-gray-500">example@usc.edu</p>
          </div>
        </div>

        <Card className="border rounded-lg">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5" />
              <h2 className="text-xl font-bold">Subscription</h2>
            </div>
            <div className="space-y-2">
              <div className="flex">
                <span className="text-gray-500">Current Plan:</span>
                <span className="ml-1 font-semibold">Premium</span>
              </div>
              <div className="flex">
                <span className="text-gray-500">Next billing date:</span>
                <span className="ml-1">05/01/2024</span>
              </div>
            </div>
            <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => window.location.href = '/subscription'}
            >
            Manage Subscription
            </Button>
          </CardContent>
        </Card>

        <Card className="border rounded-lg">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5" />
              <h2 className="text-xl font-bold">Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border rounded-lg">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5" />
              <h2 className="text-xl font-bold">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Data Sharing</span>
                <Switch 
                  checked={dataSharing} 
                  onCheckedChange={setDataSharing}
                />
              </div>
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button 
          variant="destructive" 
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Log Out
        </Button>
      </div>
    </div>
  )
}