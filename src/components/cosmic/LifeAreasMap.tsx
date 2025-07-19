'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Zap, Heart, DollarSign, Palette, Briefcase } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'

interface LifeArea {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  position: { x: number; y: number }
  size: number
}

const lifeAreas: LifeArea[] = [
  {
    id: 'career',
    name: 'Career',
    description: 'Professional growth, achievements, and career development. Your path to success in the cosmic workforce.',
    icon: Briefcase,
    color: '#00bfff',
    position: { x: 50, y: 20 },
    size: 80
  },
  {
    id: 'skills',
    name: 'Skills',
    description: 'Knowledge, abilities, and competencies. The tools in your cosmic toolkit for navigating the universe.',
    icon: Zap,
    color: '#ffd700',
    position: { x: 80, y: 60 },
    size: 70
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Physical and mental well-being. The energy that powers your journey through the cosmic expanse.',
    icon: Heart,
    color: '#7fff00',
    position: { x: 20, y: 70 },
    size: 75
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial stability and wealth building. Your cosmic resources for achieving stellar dreams.',
    icon: DollarSign,
    color: '#ff69b4',
    position: { x: 70, y: 85 },
    size: 65
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'Artistic expression and innovative thinking. The spark that ignites your cosmic imagination.',
    icon: Palette,
    color: '#8a2be2',
    position: { x: 30, y: 40 },
    size: 72
  }
]

export function LifeAreasMap() {
  const [selectedArea, setSelectedArea] = useState<LifeArea | null>(null)

  const handleStarClick = (area: LifeArea) => {
    setSelectedArea(area)
  }

  const closePanel = () => {
    setSelectedArea(null)
  }

  return (
    <div className="relative w-full h-full min-h-[750px] overflow-hidden">
      {/* Background Galaxy Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0f0f23]" />
        <div className="absolute inset-0 opacity-30">
          {/* Animated background stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00bfff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8a2be2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff69b4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {lifeAreas.map((area, index) => {
          const nextArea = lifeAreas[(index + 1) % lifeAreas.length]
          return (
            <line
              key={`connection-${index}`}
              x1={`${area.position.x}%`}
              y1={`${area.position.y}%`}
              x2={`${nextArea.position.x}%`}
              y2={`${nextArea.position.y}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          )
        })}
      </svg>

      {/* Interactive Star Nodes */}
      {lifeAreas.map((area) => (
        <motion.div
          key={area.id}
          className="absolute cursor-pointer"
          style={{
            left: `${area.position.x}%`,
            top: `${area.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: Math.random() * 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleStarClick(area)}
        >
          {/* Star Glow Effect */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-50"
            style={{
              background: `radial-gradient(circle, ${area.color}40, transparent)`,
              width: `${area.size * 2}px`,
              height: `${area.size * 2}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          {/* Main Star */}
          <div
            className={cn(
              "relative rounded-full flex items-center justify-center",
              "border-2 backdrop-blur-sm",
              "transition-all duration-300"
            )}
            style={{
              width: `${area.size}px`,
              height: `${area.size}px`,
              background: `radial-gradient(circle, ${area.color}20, ${area.color}10)`,
              borderColor: `${area.color}40`,
              boxShadow: `0 0 ${area.size / 2}px ${area.color}30`
            }}
          >
            {/* Star Icon */}
            <area.icon 
              className="w-6 h-6 text-white drop-shadow-lg" 
            />
            
            {/* Animated Ring */}
            <div
              className="absolute inset-0 rounded-full border-2 animate-ping"
              style={{
                borderColor: area.color,
                animationDuration: '3s'
              }}
            />
          </div>

          {/* Area Name */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
            <span className="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
              {area.name}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Side Panel */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closePanel}
            />
            
            {/* Panel */}
            <motion.div
              className={cn(
                "relative w-full max-w-md p-6 rounded-2xl border backdrop-blur-md",
                cosmicBorders.glow,
                "bg-gradient-to-br from-[#0a0a0a]/90 to-[#1a1a2e]/90"
              )}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={closePanel}
                className="absolute top-4 right-4 text-[#00bfff]/60 hover:text-[#00bfff] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${selectedArea.color}40, ${selectedArea.color}20)`,
                    border: `2px solid ${selectedArea.color}40`,
                    boxShadow: `0 0 20px ${selectedArea.color}30`
                  }}
                >
                  <selectedArea.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-mono text-[#ffd700] uppercase tracking-wider">
                    {selectedArea.name}
                  </h2>
                  <p className="text-[#00bfff]/60 text-sm">
                    Life Area
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-[#ffffff]/80 leading-relaxed">
                  {selectedArea.description}
                </p>
                
                {/* Placeholder Content */}
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[#00bfff]/10 border border-[#00bfff]/20">
                    <h3 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider mb-2">
                      Current Status
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#7fff00] animate-pulse" />
                      <span className="text-[#ffffff]/60 text-sm">Active Development</span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-[#8a2be2]/10 border border-[#8a2be2]/20">
                    <h3 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider mb-2">
                      Goals
                    </h3>
                    <p className="text-[#ffffff]/60 text-sm">
                      Set your cosmic objectives for this life area
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-[#ff69b4]/10 border border-[#ff69b4]/20">
                    <h3 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider mb-2">
                      Progress
                    </h3>
                    <div className="w-full bg-[#ffffff]/10 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: '65%',
                          background: `linear-gradient(90deg, ${selectedArea.color}, ${selectedArea.color}80)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 