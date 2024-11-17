import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Watch, Smartphone } from 'lucide-react'

export default function WearableIntegration() {
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null)

  const connectDevice = (deviceType: string) => {
    // In a real app, this would initiate the device connection process
    setConnectedDevice(deviceType)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Watch className="w-5 h-5 mr-2" />
          Wearable Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {connectedDevice ? (
          <div>
            <p className="mb-2">Connected to: {connectedDevice}</p>
            <Button variant="outline" onClick={() => setConnectedDevice(null)}>Disconnect</Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button className="w-full" onClick={() => connectDevice('Smartwatch')}>
              <Watch className="w-4 h-4 mr-2" />
              Connect Smartwatch
            </Button>
            <Button className="w-full" onClick={() => connectDevice('Smartphone')}>
              <Smartphone className="w-4 h-4 mr-2" />
              Connect Smartphone
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}