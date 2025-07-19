'use client'

import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatAvatarProps {
  size?: 'sm' | 'md' | 'lg'
}

export function ChatAvatar({ size = 'md' }: ChatAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <motion.div
      className={cn(
        sizeClasses[size],
        "rounded-full relative",
        "bg-gradient-to-br from-[#00bfff] via-[#8a2be2] to-[#ff69b4]",
        "border-2 border-[#00bfff]/30",
        "flex items-center justify-center",
        "shadow-[0_0_20px_rgba(0,191,255,0.3)]"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background glow */}
      <div className={cn(
        "absolute inset-0 rounded-full",
        "bg-gradient-to-br from-[#00bfff]/20 via-[#8a2be2]/20 to-[#ff69b4]/20",
        "animate-pulse"
      )} />
      
      {/* Bot icon */}
      <Bot className={cn(
        iconSizes[size],
        "text-white relative z-10"
      )} />
      
      {/* Cosmic particles effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={cn(
          "absolute top-1 left-1 w-1 h-1 bg-[#ffd700] rounded-full",
          "animate-ping"
        )} />
        <div className={cn(
          "absolute bottom-1 right-1 w-0.5 h-0.5 bg-[#7fff00] rounded-full",
          "animate-ping",
          "animation-delay-500"
        )} />
      </div>
    </motion.div>
  )
} 