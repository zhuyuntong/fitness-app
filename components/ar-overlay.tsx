'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface AROverlayProps {
  neckAngle: number
  backAngle: number
  neckThreshold: number
  backThreshold: number
}

export default function AROverlay({ 
  neckAngle, 
  backAngle, 
  neckThreshold = 15, 
  backThreshold = 10 
}: AROverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getAngleColor = (current: number, threshold: number) => {
    if (current <= threshold) return '#22c55e' // green-500
    if (current <= threshold * 1.5) return '#eab308' // yellow-500
    return '#ef4444' // red-500
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const lineLength = 120

    // Draw reference guides
    ctx.setLineDash([5, 5])
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)' // slate-400 with opacity
    ctx.lineWidth = 2

    // Vertical and horizontal references
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - lineLength)
    ctx.lineTo(centerX, centerY + lineLength)
    ctx.moveTo(centerX - lineLength, centerY)
    ctx.lineTo(centerX + lineLength, centerY)
    ctx.stroke()

    // Reset line dash
    ctx.setLineDash([])
    ctx.lineWidth = 4

    // Draw neck angle line with gradient
    const neckGradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + Math.sin(neckAngle * Math.PI / 180) * lineLength,
      centerY - Math.cos(neckAngle * Math.PI / 180) * lineLength
    )
    neckGradient.addColorStop(0, getAngleColor(neckAngle, neckThreshold))
    neckGradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)')
    
    ctx.strokeStyle = neckGradient
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(
      centerX + Math.sin(neckAngle * Math.PI / 180) * lineLength,
      centerY - Math.cos(neckAngle * Math.PI / 180) * lineLength
    )
    ctx.stroke()

    // Draw back angle line with gradient
    const backGradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + Math.cos(backAngle * Math.PI / 180) * lineLength,
      centerY + Math.sin(backAngle * Math.PI / 180) * lineLength
    )
    backGradient.addColorStop(0, getAngleColor(backAngle, backThreshold))
    backGradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)')

    ctx.strokeStyle = backGradient
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(
      centerX + Math.cos(backAngle * Math.PI / 180) * lineLength,
      centerY + Math.sin(backAngle * Math.PI / 180) * lineLength
    )
    ctx.stroke()

    // Add labels
    ctx.font = '14px Inter'
    
    // Neck label with background
    const neckLabel = `Neck ${neckAngle.toFixed(1)}°`
    const neckMetrics = ctx.measureText(neckLabel)
    const neckX = centerX + Math.sin(neckAngle * Math.PI / 180) * (lineLength + 20)
    const neckY = centerY - Math.cos(neckAngle * Math.PI / 180) * (lineLength + 20)
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillRect(
      neckX - neckMetrics.width / 2 - 4,
      neckY - 12,
      neckMetrics.width + 8,
      20
    )
    
    ctx.fillStyle = 'rgb(100, 116, 139)' // slate-500
    ctx.textAlign = 'center'
    ctx.fillText(neckLabel, neckX, neckY)

    // Back label with background
    const backLabel = `Back ${backAngle.toFixed(1)}°`
    const backMetrics = ctx.measureText(backLabel)
    const backX = centerX + Math.cos(backAngle * Math.PI / 180) * (lineLength + 20)
    const backY = centerY + Math.sin(backAngle * Math.PI / 180) * (lineLength + 20)
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.fillRect(
      backX - backMetrics.width / 2 - 4,
      backY - 12,
      backMetrics.width + 8,
      20
    )
    
    ctx.fillStyle = 'rgb(100, 116, 139)'
    ctx.textAlign = 'center'
    ctx.fillText(backLabel, backX, backY)

  }, [neckAngle, backAngle, neckThreshold, backThreshold])

  return (
    <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        width={500}
        height={333}
      />
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 rounded-full text-sm font-medium shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        Align your posture with the reference lines
      </motion.div>
    </div>
  )
}