"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  originSide: "left" | "right"
  exploding: boolean
  mass: number

  constructor(width: number, height: number) {
    this.originSide = Math.random() > 0.5 ? "left" : "right"
    // Spawn off-screen or at edges
    this.x = this.originSide === "left" ? -50 - Math.random() * 100 : width + 50 + Math.random() * 100
    // Y distribution: wider at edges, aiming for center
    this.y = Math.random() * height
    
    // Initial velocity towards center, but chaotic
    this.vx = (this.originSide === "left" ? 1 : -1) * (1 + Math.random() * 2)
    this.vy = (Math.random() - 0.5) * 2
    
    this.radius = Math.random() * 1.5 + 0.5
    // Elegancia editorial: Gris carbón muy sutil o ligeros tonos cian/ultravioleta
    const isAccent = Math.random() > 0.8
    this.color = isAccent ? "rgba(100, 140, 255," : "rgba(40, 40, 50,"
    this.alpha = Math.random() * 0.3 + 0.1
    this.exploding = false
    this.mass = Math.random() * 0.8 + 0.2
  }

  update(width: number, height: number, cx: number, cy: number, isExploding: boolean) {
    if (!isExploding) {
      // Fase 1: Mareas convergiendo al centro (Atracción sutil)
      const dx = cx - this.x
      const dy = cy - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      // Vector de gravedad hacia el centro
      const ax = (dx / dist) * 0.05
      const ay = (dy / dist) * 0.05
      
      this.vx += ax
      this.vy += ay
      
      // Fricción fluida (ruido)
      this.vx *= 0.98
      this.vy *= 0.98
      
      // Turbulencia para que parezca líquido
      this.vx += (Math.random() - 0.5) * 0.2
      this.vy += (Math.random() - 0.5) * 0.2
    } else {
      // Fase 2: Explosión (Kowalski Spring-like expansion)
      if (!this.exploding) {
        this.exploding = true
        // Vector desde el centro hacia afuera
        const dx = this.x - cx
        const dy = this.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Empuje explosivo masivo
        const force = (Math.random() * 40 + 20) / (dist * 0.01 + 1)
        this.vx = (dx / dist) * force * this.mass
        this.vy = (dy / dist) * force * this.mass
      }
      
      // Amortiguación elástica de alta velocidad (Kowalski damping)
      this.vx *= 0.92
      this.vy *= 0.92
      this.alpha -= 0.02 // Fade out rápido
    }

    this.x += this.vx
    this.y += this.vy
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) return
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `${this.color}${this.alpha})`
    ctx.fill()
  }
}

export function IntroSequence({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExploding, setIsExploding] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  const handleExplosion = useCallback(() => {
    if (isExploding) return
    setIsExploding(true)
    
    // Desmontar el componente completamente después de que la explosión se haya renderizado
    setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, 1200) // 1.2s de colapso/salida
  }, [isExploding, onComplete])

  useEffect(() => {
    // El estallido ocurre a los 2.5s automáticamente
    const autoTimer = setTimeout(() => {
      handleExplosion()
    }, 4000)
    
    return () => clearTimeout(autoTimer)
  }, [handleExplosion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    
    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    
    setSize()
    window.addEventListener("resize", setSize)

    // Inicializar partículas (Marea densa)
    particlesRef.current = Array.from({ length: 600 }, () => new Particle(width, height))

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      
      const cx = width / 2
      const cy = height / 2
      
      // Si no estamos explotando, reabastecemos algunas partículas que hayan muerto (fuera de límite)
      if (!isExploding && particlesRef.current.length < 800) {
        if (Math.random() > 0.5) {
          particlesRef.current.push(new Particle(width, height))
        }
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.update(width, height, cx, cy, isExploding)
        p.draw(ctx)
        
        // Limpiar partículas apagadas
        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1)
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(render)
    }
    
    render()

    return () => {
      window.removeEventListener("resize", setSize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isExploding])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-container"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background cursor-pointer"
          onClick={handleExplosion}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Salida general fluida
        >
          {/* Canvas de las mareas */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 pointer-events-none"
          />

          {/* Texto central pulsante */}
          <motion.div
            className="relative z-10"
            animate={isExploding ? "explode" : "pulse"}
            variants={{
              pulse: {
                scale: [1, 1.02, 1],
                opacity: [0.8, 1, 0.8],
                transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              },
              explode: {
                scale: 1.5,
                opacity: 0,
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
            }}
          >
            <h1 className="text-foreground text-sm md:text-xl font-mono tracking-[0.5em] md:tracking-[1em] uppercase text-center pl-[0.5em] md:pl-[1em]">
              Portafolio<br className="md:hidden" /> Manuel Meneses
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
