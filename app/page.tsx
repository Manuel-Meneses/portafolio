"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, X, ChevronRight } from "lucide-react"
import { QuantumBackground } from "@/components/quantum-background"
import { IntroSequence } from "@/components/intro-sequence"
import { QuantumCard } from "@/components/quantum-card"

const EASE_OUT = [0.16, 1, 0.3, 1]

const PROJECTS = [
  {
    id: "stylebox",
    title: "Stylebox",
    category: "E-Commerce / UI",
    description: "Plataforma de moda interactiva con filtros avanzados y experiencia de compra optimizada.",
    link: "www.styleboxmodular.com",
    images: ["/stylebox-1.png", "/stylebox-2.png"],
  },
  {
    id: "morperfumes",
    title: "Morperfumes",
    category: "Branding / Web",
    description: "Experiencia inmersiva para una marca de perfumes, destacando el storytelling visual.",
    link: "www.morperfumes.com",
    images: ["/morperfumes-1.png", "/morperfumes-2.png"],
  },
  {
    id: "espanol-con-e",
    title: "Español con E",
    category: "EdTech",
    description: "Plataforma educativa para aprender español interactivo, enfocado en retención y progreso.",
    link: "www.espanolcone.com",
    images: ["/espanolcone-1.png", "/espanolcone-2.png"],
  },
  {
    id: "clapwise",
    title: "Clapwise",
    category: "SaaS / Product",
    description: "Herramienta de gestión de feedback continuo para equipos ágiles.",
    link: "https://clap-wise-web.vercel.app/",
    images: ["/clapwise-1.png", "/clapwise-2.png"],
  }
]

const StackIcons = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full">
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Nextjs: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <circle cx="64" cy="64" r="64" fill="currentColor" />
      <path fill="url(#next-gradient)" d="M90.8 107.1L42.5 44H33v40h8.6V56l45.4 59c1.3-1 2.5-2.5 3.8-4v-3.9z" />
      <path fill="#fff" d="M93.3 44h-8.6v40h8.6V44z" />
      <defs>
        <linearGradient id="next-gradient" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#3178C6" d="M2.6 2.6h122.8v122.8H2.6z" />
      <path fill="#fff" d="M68.5 73.1h-19.1V111H38.2V73.1H19.1V63h49.4v10.1zm41.2 23.2c0 17.5-18.4 18.1-29.8 13.2v-13.5c8.3 3.9 14.7 3.3 14.7-1.4 0-17.5-33.3-6.7-33.3-26.8 0-16.5 20.7-15.8 28.7-11.8v13.5c-6.7-3.2-12.9-2.7-12.9 1.2 0 16.4 32.6 6.8 32.6 25.6z" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#06B6D4" d="M31.2 62.5c4-11.8 11.2-17.6 21.6-17.6 15.6 0 20 10.4 28 10.4 4 0 7.2-2 9.6-6.4-4 11.8-11.2 17.6-21.6 17.6-15.6 0-20-10.4-28-10.4-4 0-7.2 2-9.6 6.4zm-21.6 24c4-11.8 11.2-17.6 21.6-17.6 15.6 0 20 10.4 28 10.4 4 0 7.2-2 9.6-6.4-4 11.8-11.2 17.6-21.6 17.6-15.6 0-20-10.4-28-10.4-4 0-7.2 2-9.6 6.4z" />
    </svg>
  ),
  Claude: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <rect width="128" height="128" rx="24" fill="#D97757" />
      <path fill="#fff" d="M84.5 44.5L71 58l13.5 13.5-9.5 9.5-23-23 23-23 9.5 9.5z" />
      <path fill="#fff" d="M53.5 83.5L40 70 53.5 56.5l9.5 9.5-13.5 13.5 13.5 13.5-9.5 9.5z" />
    </svg>
  ),
  Gemini: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="50%" stopColor="#ea4335" />
          <stop offset="100%" stopColor="#fbbc05" />
        </linearGradient>
      </defs>
      <path fill="url(#gemini-grad)" d="M64 0C64 35.3 92.7 64 128 64 92.7 64 64 92.7 64 128 64 92.7 35.3 64 0 64 35.3 64 64 35.3 64 0z" />
    </svg>
  )
}

const TECH_STACK = [
  { id: "react", name: "React", Icon: StackIcons.React, color: "text-[#61DAFB]" },
  { id: "next", name: "Next.js", Icon: StackIcons.Nextjs, color: "text-foreground" },
  { id: "ts", name: "TypeScript", Icon: StackIcons.TypeScript, color: "text-[#3178C6]" },
  { id: "tw", name: "Tailwind", Icon: StackIcons.Tailwind, color: "text-[#06B6D4]" },
  { id: "claude", name: "Claude Code", Icon: StackIcons.Claude, color: "text-[#D97757]" },
  { id: "gemini", name: "Antigravity", Icon: StackIcons.Gemini, color: "text-accent" },
]

export default function PortfolioPage() {
  const [hoveredProject, setHoveredProject] = useState<typeof PROJECTS[0] | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isReduced, setIsReduced] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [introFinished, setIntroFinished] = useState(false)
  const [dragConstraint, setDragConstraint] = useState(0)

  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const carouselWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReduced(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setIsReduced(e.matches)
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject])

  // Recalcular constricciones de arrastre
  useEffect(() => {
    const updateConstraints = () => {
      if (carouselWrapperRef.current) {
        const paddingRight = 48 // Espacio extra al final
        const totalWidth = Array.from(carouselWrapperRef.current.children).reduce(
          (acc, child) => acc + (child as HTMLElement).offsetWidth + 24, 0 // +24px por el gap-6
        )
        const wrapperWidth = carouselWrapperRef.current.parentElement?.offsetWidth || 0
        setDragConstraint(Math.min(0, wrapperWidth - totalWidth - paddingRight))
      }
    }

    updateConstraints()
    window.addEventListener("resize", updateConstraints)
    // Pequeño retardo para asegurar que las fuentes/imágenes hayan cargado el layout
    setTimeout(updateConstraints, 500)

    return () => window.removeEventListener("resize", updateConstraints)
  }, [])

  const handleProjectHover = (project: typeof PROJECTS[0] | null) => {
    if (isDragging) return
    setHoveredProject(project)
    setIsHovering(project !== null)
  }

  const handleProjectClick = (project: typeof PROJECTS[0]) => {
    if (isDragging) return
    setSelectedProject(project)
    setHoveredProject(null)
    setIsHovering(false)
  }

  return (
    <div className={`relative min-h-screen text-foreground ${isHovering && !isDragging ? "custom-cursor" : ""}`}>
      <IntroSequence onComplete={() => setIntroFinished(true)} />
      <QuantumBackground />

      <motion.main
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: introFinished ? 1 : 0, filter: introFinished ? "blur(0px)" : "blur(10px)", y: introFinished ? 0 : 20 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        className="relative z-10 max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row"
      >

        <div className="w-full lg:w-[45%] xl:w-[40%] px-8 pt-12 pb-12 lg:h-screen lg:sticky lg:top-0 flex flex-col overflow-y-auto scrollbar-hide">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="w-48 md:w-64 shrink-0 rounded-2xl aspect-[4/5] overflow-hidden relative border border-border/50 shadow-md mb-8"
          >
            <Image
              src="/manuphoto.png"
              alt="Fotografía de Manu"
              width={256}
              height={320}
              className="w-full h-full object-cover object-top scale-105 transition-all duration-500"
              draggable={false}
              priority
            />
          </motion.div>

          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: EASE_OUT }}
              className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground leading-none"
            >
              Manuel Meneses
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT }}
              className="mt-3 text-lg md:text-xl font-light tracking-tight text-muted-foreground leading-relaxed"
            >
              Desarrollador Frontend & Diseñador de Producto
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: EASE_OUT }}
              className="text-base text-muted-foreground max-w-md leading-relaxed mt-6"
            >
              Especializado en crear interfaces de usuario impecables y accesibles.
              Combino atención al detalle tipográfico con arquitecturas frontend escalables, asegurando
              que cada producto no solo se vea bien, sino que funcione con fluidez y solidez técnica.
            </motion.p>
          </div>

          <div className="mt-20 lg:mt-auto pt-10">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-10 opacity-70">
              Stack & Herramientas
            </p>
            <div className="flex flex-wrap gap-x-12 gap-y-8 items-center text-muted-foreground">
              {TECH_STACK.map((tech, i) => {
                const Icon = tech.Icon
                return (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.8 + (i * 0.12),
                      type: "spring",
                      stiffness: 70,
                      damping: 15,
                      mass: 0.8
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="group flex flex-col items-center gap-3 cursor-none"
                    title={tech.name}
                  >
                    <div className="w-7 h-7 flex items-center justify-center opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-bottom">
                      <Icon />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-foreground transition-colors duration-500">{tech.name}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Proyectos con Físicas Kowalski reales (Framer Motion) */}
        <div className="w-full lg:w-[55%] xl:w-[60%] px-8 py-12 lg:py-24 border-t lg:border-t-0 relative before:absolute before:left-0 before:top-12 before:bottom-12 before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-accent/60 before:to-transparent overflow-hidden flex flex-col justify-center select-none">


          <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-mono text-foreground uppercase tracking-widest flex items-center gap-2">
              Proyectos Destacados
            </h3>
            <span className="text-xs text-muted-foreground/60 hidden sm:inline-block">
              Arrastra para explorar
            </span>
          </div>

          {/* Contenedor del Carrusel Físico */}
          <div className="relative w-full h-[600px]">
            <motion.div
              ref={carouselWrapperRef}
              drag="x"
              dragConstraints={{ right: 0, left: dragConstraint }}
              dragElastic={0.08}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
              whileTap={{ cursor: "grabbing" }}
              className={`absolute top-0 left-0 flex gap-6 pb-8 h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
              {PROJECTS.map((project, index) => (
                <QuantumCard
                  key={project.id}
                  index={index}
                  introFinished={introFinished}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                  onMouseEnter={() => handleProjectHover(project)}
                  onMouseLeave={() => handleProjectHover(null)}
                />
              ))}

            </motion.div>
          </div>
        </div>
      </motion.main>

      <footer className="relative z-10 w-full px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-muted-foreground border-t border-border/40 bg-background/80 backdrop-blur-sm lg:hidden">
        <span>© {new Date().getFullYear()} — Manu. Desarrollo Frontend & Diseño.</span>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            ref={modalRef}
            role="dialog" aria-modal="true" aria-labelledby="modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReduced ? 0.1 : 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
          >
            <button
              ref={closeButtonRef}
              onClick={() => setSelectedProject(null)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="fixed top-8 right-8 z-20 p-4 rounded-full bg-card hover:bg-accent hover:text-accent-foreground border border-border transition-all duration-200 cursor-none shadow-sm"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {selectedProject.category}
              </span>
              <h2 className="mt-4 text-5xl md:text-6xl font-medium tracking-tight text-foreground">
                {selectedProject.title}
              </h2>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {selectedProject.description}
              </p>

              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity font-medium cursor-none shadow-sm"
              >
                Visitar sitio <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="mt-20 space-y-8">
                {selectedProject.images.map((img, i) => (
                  <div key={i} className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted">
                    <Image src={img} alt={`Captura de ${selectedProject.title}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`cursor-dot hidden md:block ${isHovering && !isDragging ? "hover" : ""}`} style={{ display: 'none' }} />
    </div>
  )
}
