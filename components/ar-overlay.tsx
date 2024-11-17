import { useEffect, useRef } from 'react'

interface AROverlayProps {
  neckAngle: number
  backAngle: number
}

export default function AROverlay({ neckAngle, backAngle }: AROverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw guidelines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.lineWidth = 2

    // Neck guideline
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo(canvas.width / 2, canvas.height / 2 - 100)
    ctx.stroke()

    // Back guideline
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo(canvas.width / 2 + 100, canvas.height / 2)
    ctx.stroke()

    // Draw user's current posture
    ctx.strokeStyle = neckAngle > 15 ? 'red' : 'green'
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo(canvas.width / 2 + Math.sin(neckAngle * Math.PI / 180) * 100, 
               canvas.height / 2 - Math.cos(neckAngle * Math.PI / 180) * 100)
    ctx.stroke()

    ctx.strokeStyle = backAngle > 10 ? 'red' : 'green'
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo(canvas.width / 2 + Math.cos(backAngle * Math.PI / 180) * 100, 
               canvas.height / 2 + Math.sin(backAngle * Math.PI / 180) * 100)
    ctx.stroke()

  }, [neckAngle, backAngle])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      width={300}
      height={300}
    />
  )
}