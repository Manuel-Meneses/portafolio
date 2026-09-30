"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  description: string
  link: string
  images: string[]
}

interface QuantumCardProps {
  project: Project
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  index: number
  introFinished: boolean
}

export function QuantumCard({ project, onClick, onMouseEnter, onMouseLeave, index, introFinished }: QuantumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovering(true)
        onMouseEnter()
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        onMouseLeave()
      }}
      onMouseMove={handleMouseMove}
      whileDrag={{ scale: 0.98, rotate: -1 }} // Kowalski physics deformation
      dragElastic={0.1}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 16 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: introFinished ? 0.3 + (index * 0.1) : 0 }}
      className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background flex-none w-[320px] md:w-[380px] h-[520px] rounded-[24px] flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl text-left overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing backdrop-blur-xl bg-white/20"
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      {/* Contenido interior (Z-10 para flotar sobre el glassmorphism) */}
      <div className="p-8 pb-6 flex-1 flex flex-col pointer-events-none z-10 relative">
        <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5 border border-black/5 px-3 py-1.5 rounded-full w-fit bg-white/40 shadow-sm backdrop-blur-md">
          {project.category}
        </span>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-300 ease-out">
          {project.title}
        </h2>
        <p className="mt-4 text-sm text-muted-foreground leading-loose line-clamp-2">
          {project.description}
        </p>
      </div>
      
      {/* Visor Líquido (Preview de Proyecto) */}
      <div className="relative w-full h-[240px] bg-white/10 border-t border-black/5 pointer-events-none overflow-hidden z-10 mt-auto">
        <Image 
          src={project.images[0]} 
          alt={`Vista previa de ${project.title}`} 
          fill 
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]" 
          draggable={false}
          sizes="(max-width: 768px) 100vw, 400px" 
        />
        {/* Capa de ruido y sombra interior para simular el tanque cuántico */}
        <div className="absolute inset-0 shadow-[inset_0_10px_30px_rgba(255,255,255,0.4)] pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* Botón Flotante */}
      <div className="absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-black/5 shadow-lg flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none">
        <ChevronRight className="w-5 h-5" />
      </div>
    </motion.div>
  )
}
