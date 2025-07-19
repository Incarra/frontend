'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn, generateAvatarSeed, getAvatarColors, avatarStages } from '@/lib/utils'

interface StellarAvatarProps {
  userId: string
  stage?: keyof typeof avatarStages
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showTrails?: boolean
  isInteractive?: boolean
}

export function StellarAvatar({
  userId,
  stage = 'seed',
  size = 'md',
  className,
  showTrails = true,
  isInteractive = false
}: StellarAvatarProps) {
  const [seed] = useState(() => generateAvatarSeed(userId))
  const [primaryColor] = useState(() => getAvatarColors(seed))
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  }

  const stageConfig = {
    seed: {
      rings: 1,
      particles: 3,
      pulseSpeed: 3,
      driftSpeed: 8
    },
    core: {
      rings: 2,
      particles: 6,
      pulseSpeed: 2.5,
      driftSpeed: 6
    },
    fractal: {
      rings: 3,
      particles: 9,
      pulseSpeed: 2,
      driftSpeed: 4
    },
    constellation: {
      rings: 4,
      particles: 12,
      pulseSpeed: 1.5,
      driftSpeed: 3
    },
    incarnate: {
      rings: 5,
      particles: 15,
      pulseSpeed: 1,
      driftSpeed: 2
    }
  }

  const config = stageConfig[stage]

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Core Stellar Body */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${primaryColor}40 0%, ${primaryColor}20 50%, transparent 100%)`,
          boxShadow: `0 0 30px ${primaryColor}30, inset 0 0 20px ${primaryColor}20`
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: config.pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onHoverStart={() => isInteractive && setIsHovered(true)}
        onHoverEnd={() => isInteractive && setIsHovered(false)}
      />

      {/* Orbital Rings */}
      {Array.from({ length: config.rings }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-current/20"
          style={{ 
            borderColor: primaryColor,
            transform: `scale(${1 + (i + 1) * 0.2})`
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: config.driftSpeed + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Particle Trails */}
      {showTrails && Array.from({ length: config.particles }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: primaryColor,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${(360 / config.particles) * i}deg) translateY(-${sizeClasses[size].split('w-')[1].split('-')[0] / 2}px)`
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, Math.cos((360 / config.particles) * i * Math.PI / 180) * 20],
            y: [0, Math.sin((360 / config.particles) * i * Math.PI / 180) * 20]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Hover Effects */}
      {isInteractive && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 100%)`,
            boxShadow: `0 0 50px ${primaryColor}40`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Stage Indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-mono text-current/60 tracking-wider uppercase">
          {stage}
        </span>
      </div>
    </div>
  )
} 