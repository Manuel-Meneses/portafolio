"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

class Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  color: string
  stiffness: number
  damping: number
  mass: number

  constructor(x: number, y: number, isDark: boolean) {
    this.x = x
    this.y = y
    this.baseX = x
    this.baseY = y
    this.vx = 0
    this.vy = 0
    
    this.size = Math.random() * 1.5 + 0.5
    
    const isAccent = Math.random() > 0.82
    if (isDark) {
      this.color = isAccent ? "oklch(0.65 0.24 278 / 0.5)" : "oklch(0.94 0.005 250 / 0.35)"
    } else {
      // Light theme: extremely subtle graphite / cyan
      this.color = isAccent ? "oklch(0.55 0.15 240 / 0.22)" : "oklch(0.25 0.01 260 / 0.12)"
    }

    this.stiffness = 0.02 + Math.random() * 0.03
    this.damping = 0.70 + Math.random() * 0.15
    this.mass = 1 + Math.random() * 0.5
  }

  update(mouseX: number, mouseY: number, isHovering: boolean) {
    const dxBase = this.baseX - this.x
    const dyBase = this.baseY - this.y
    let fx = dxBase * this.stiffness
    let fy = dyBase * this.stiffness

    if (isHovering) {
      const dxMouse = this.x - mouseX
      const dyMouse = this.y - mouseY
      const dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
      
      const maxDist = 220
      if (dist < maxDist && dist > 0) {
        const force = (1 - dist / maxDist) * 2.5
        fx += (dxMouse / dist) * force
        fy += (dyMouse / dist) * force
      }
    }

    this.vx = (this.vx + fx / this.mass) * this.damping
    this.vy = (this.vy + fy / this.mass) * this.damping

    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

export function QuantumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let animationFrameId: number
    let particles: Particle[] = []
    let isRunning = true
    const isDark = resolvedTheme === "dark"

    let mouseX = -1000
    let mouseY = -1000
    let isHovering = false

    let interpolatedMouseX = -1000
    let interpolatedMouseY = -1000
    let mouseVx = 0
    let mouseVy = 0
    const mouseStiffness = 0.08
    const mouseDamping = 0.75

    const initParticles = () => {
      particles = []
      const density = 45
      const cols = Math.floor(window.innerWidth / density) + 2
      const rows = Math.floor(window.innerHeight / density) + 2
      
      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * density + (Math.random() * density - density / 2)
          const y = j * density + (Math.random() * density - density / 2)
          particles.push(new Particle(x, y, isDark))
        }
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isHovering = true
      
      if (interpolatedMouseX === -1000) {
        interpolatedMouseX = mouseX
        interpolatedMouseY = mouseY
      }
    }

    const handlePointerLeave = () => {
      isHovering = false
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        isRunning = false
      } else {
        if (!isRunning) {
          isRunning = true
          if (!prefersReduced) loop()
        }
      }
    }

    const loop = () => {
      if (!isRunning) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      if (isHovering) {
        const dx = mouseX - interpolatedMouseX
        const dy = mouseY - interpolatedMouseY
        mouseVx = (mouseVx + dx * mouseStiffness) * mouseDamping
        mouseVy = (mouseVy + dy * mouseStiffness) * mouseDamping
        interpolatedMouseX += mouseVx
        interpolatedMouseY += mouseVy
      } else {
        interpolatedMouseX = -1000
        interpolatedMouseY = -1000
      }

      particles.forEach((p) => {
        p.update(interpolatedMouseX, interpolatedMouseY, isHovering)
        p.draw(ctx)
      })

      if (isHovering && interpolatedMouseX > 0) {
        const gradient = ctx.createRadialGradient(
          interpolatedMouseX, interpolatedMouseY, 0,
          interpolatedMouseX, interpolatedMouseY, 400
        )
        // Subtle beam for light mode
        const accent = isDark ? "oklch(0.65 0.24 278" : "oklch(0.55 0.15 240"
        const beamOpacityBase = isDark ? 0.12 : 0.08
        const beamOpacityMid = isDark ? 0.05 : 0.03
        gradient.addColorStop(0, `${accent} / ${beamOpacityBase})`)
        gradient.addColorStop(0.3, `${accent} / ${beamOpacityMid})`)
        gradient.addColorStop(1, `${accent} / 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(interpolatedMouseX, interpolatedMouseY, 400, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    
    resize()
    
    if (!prefersReduced) {
      loop()
    } else {
      particles.forEach((p) => p.draw(ctx))
    }

    return () => {
      isRunning = false
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme])

  return (
    <div className="fixed inset-0 -z-10 bg-background overflow-hidden select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block w-full h-full mix-blend-multiply dark:mix-blend-screen opacity-100 transition-opacity duration-700"
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.08] mix-blend-multiply dark:mix-blend-overlay pointer-events-none">
        <filter id="subatomic-grain-canvas">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#subatomic-grain-canvas)" />
      </svg>
    </div>
  )
}
