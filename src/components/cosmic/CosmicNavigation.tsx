'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn, cosmicBorders } from '@/lib/utils'
import { Home, Users, Brain, BookOpen, MessageCircle, Star, Target, User, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react'

interface CosmicNavigationProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function CosmicNavigation({ activeView, onViewChange }: CosmicNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Overview & quick actions',
      icon: Home,
      color: 'text-[#00bfff]'
    },
    {
      id: 'agent-hub',
      label: 'Agent Hub',
      description: 'Profile, creation & management',
      icon: User,
      color: 'text-[#ffd700]'
    },
    {
      id: 'ai-network',
      label: 'AI Network',
      description: 'Connected companions',
      icon: Users,
      color: 'text-[#7fff00]'
    },
    {
      id: 'skill-tree',
      label: 'Skill Tree',
      description: 'Train abilities',
      icon: Brain,
      color: 'text-[#ffd700]'
    },
    {
      id: 'chat',
      label: 'Chat',
      description: 'AI companion',
      icon: MessageCircle,
      color: 'text-[#ffd700]'
    },
    {
      id: 'life-areas',
      label: 'Life Areas',
      description: 'Personal growth map',
      icon: Star,
      color: 'text-[#ff69b4]'
    },
    {
      id: 'quests',
      label: 'Quests',
      description: 'Weekly challenges',
      icon: Target,
      color: 'text-[#ffd700]'
    }
  ]

  return (
    <motion.nav
      className="fixed top-6 left-6 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        {/* Main Navigation Container */}
        <div className={cn(
          "rounded-2xl border backdrop-blur-sm transition-all duration-300",
          cosmicBorders.drift,
          isExpanded ? "w-64" : "w-16"
        )}>
          {/* Navigation Items */}
          <div className="p-2 space-y-2">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                  activeView === item.id
                    ? "bg-[#00bfff]/20 text-[#00bfff] border border-[#00bfff]/30"
                    : "text-[#00bfff]/60 hover:text-[#00bfff] hover:bg-[#00bfff]/10"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                
                {/* Label and Description */}
                {isExpanded && (
                  <motion.div
                    className="flex-1 text-left"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="font-mono text-sm font-medium">
                      {item.label}
                    </div>
                    <div className="text-xs opacity-60">
                      {item.description}
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          <div className="p-2 border-t border-[#00bfff]/10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-[#00bfff]/60 hover:text-[#00bfff] hover:bg-[#00bfff]/10 transition-all"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>
          </div>
        </div>
        
        {/* Cosmic Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00bfff]/10 to-[#ff69b4]/10 blur-xl -z-10" />
      </div>
    </motion.nav>
  )
} 