'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn, cosmicBorders, cosmicGradients } from '@/lib/utils'
import { Brain, Zap, Target, Lock, Unlock, Star } from 'lucide-react'

interface Skill {
  id: string
  name: string
  description: string
  cost: number
  unlocked: boolean
  required: string[]
  type: 'core' | 'utility' | 'evolution' | 'combat'
  position: { x: number; y: number }
  icon: () => JSX.Element
}

interface NexusViewProps {
  userId: string
  avatarStage: string
  availablePoints: number
  skills: Skill[]
}

export function NexusView({ 
  userId, 
  avatarStage, 
  availablePoints, 
  skills 
}: NexusViewProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [filter, setFilter] = useState<'all' | 'core' | 'utility' | 'evolution' | 'combat'>('all')

  const filteredSkills = skills.filter(skill => 
    filter === 'all' || skill.type === filter
  )

  const canUnlock = (skill: Skill) => {
    if (skill.unlocked) return false
    if (availablePoints < skill.cost) return false
    return skill.required.every(reqId => 
      skills.find(s => s.id === reqId)?.unlocked
    )
  }

  const unlockSkill = (skill: Skill) => {
    if (canUnlock(skill)) {
      // In a real app, this would call an API
      console.log(`Unlocking skill: ${skill.name}`)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'core': return 'text-[#00bfff]'
      case 'utility': return 'text-[#7fff00]'
      case 'evolution': return 'text-[#ffd700]'
      case 'combat': return 'text-[#ff69b4]'
      default: return 'text-[#00bfff]'
    }
  }

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'core': return 'bg-[#00bfff]/10'
      case 'utility': return 'bg-[#7fff00]/10'
      case 'evolution': return 'bg-[#ffd700]/10'
      case 'combat': return 'bg-[#ff69b4]/10'
      default: return 'bg-[#00bfff]/10'
    }
  }

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
      
      {/* Neural Network Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#00bfff]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-[#7fff00]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
            SKILL TREE
          </h1>
          <p className="text-[#00bfff] font-light mb-4">
            Train and evolve your AI companion's abilities
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-[#00bfff]/60 text-sm">Available Points</p>
              <p className="text-[#ffd700] text-2xl font-mono">{availablePoints}</p>
            </div>
            <div className="text-center">
              <p className="text-[#00bfff]/60 text-sm">Current Stage</p>
              <p className="text-[#ffd700] text-2xl font-mono">
                {avatarStage === 'seed' && 'Digital Seed'}
                {avatarStage === 'core' && 'Smart Core'}
                {avatarStage === 'fractal' && 'Growing Mind'}
                {avatarStage === 'constellation' && 'Network Mind'}
                {avatarStage === 'incarnate' && 'Full Intelligence'}
              </p>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex justify-center space-x-4">
            {[
              { key: 'all', label: 'ALL SKILLS', icon: Brain },
              { key: 'core', label: 'CORE', icon: Target },
              { key: 'utility', label: 'UTILITY', icon: Zap },
              { key: 'evolution', label: 'EVOLUTION', icon: Star },
              { key: 'combat', label: 'COMBAT', icon: Target }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-sm transition-all",
                  filter === filterOption.key 
                    ? "bg-[#00bfff]/20 text-[#00bfff] border border-[#00bfff]/30" 
                    : "text-[#00bfff]/60 hover:text-[#00bfff] hover:bg-[#00bfff]/10"
                )}
              >
                <filterOption.icon className="w-4 h-4" />
                <span>{filterOption.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skill Tree Canvas */}
        <div className="relative w-full h-[600px] bg-[#0a0a0a]/50 rounded-2xl border border-[#00bfff]/20 overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {skills.map((skill) => {
              return skill.required.map((reqId, index) => {
                const requiredSkill = skills.find(s => s.id === reqId)
                if (!requiredSkill) return null
                
                return (
                  <motion.line
                    key={`${skill.id}-${reqId}`}
                    x1={requiredSkill.position.x}
                    y1={requiredSkill.position.y}
                    x2={skill.position.x}
                    y2={skill.position.y}
                    stroke={skill.unlocked ? "#00bfff" : "#666666"}
                    strokeWidth={2}
                    opacity={skill.unlocked ? 0.6 : 0.2}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                )
              })
            })}
          </svg>

          {/* Skill Nodes */}
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="absolute"
              style={{ left: skill.position.x - 24, top: skill.position.y - 24 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all",
                skill.unlocked 
                  ? cosmicGradients.solar 
                  : canUnlock(skill)
                    ? getTypeBg(skill.type)
                    : "bg-[#2a2a3e] opacity-50"
              )}>
                {skill.unlocked ? (
                  <Unlock className="w-6 h-6 text-white" />
                ) : canUnlock(skill) ? (
                  <Lock className="w-6 h-6 text-[#00bfff]" />
                ) : (
                  <Lock className="w-6 h-6 text-[#666666]" />
                )}
              </div>
              
              {/* Skill Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-xs font-mono text-[#ffd700] whitespace-nowrap">
                  {skill.name}
                </p>
                <div className="w-full h-1 bg-[#1a1a2e] rounded-full mt-1">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      skill.unlocked 
                        ? "bg-gradient-to-r from-[#00bfff] to-[#7fff00]" 
                        : canUnlock(skill)
                          ? "bg-[#00bfff]/40"
                          : "bg-[#666666]/40"
                    )}
                    style={{ width: skill.unlocked ? '100%' : '0%' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Details Panel */}
        {selectedSkill && (
          <motion.div
            className="mt-8 p-6 rounded-2xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn("mt-8 p-6 rounded-2xl border", cosmicBorders.glow)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    selectedSkill.unlocked ? cosmicGradients.solar : getTypeBg(selectedSkill.type)
                  )}>
                    {selectedSkill.icon()}
                  </div>
                  <div>
                    <h3 className="text-xl font-mono text-[#ffd700]">
                      {selectedSkill.name}
                    </h3>
                    <p className={cn("text-sm font-mono uppercase", getTypeColor(selectedSkill.type))}>
                      {selectedSkill.type}
                    </p>
                  </div>
                </div>
                
                <p className="text-[#00bfff]/80 text-sm leading-relaxed">
                  {selectedSkill.description}
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-[#00bfff]/60 text-xs">Cost</p>
                    <p className="text-[#ffd700] font-mono">{selectedSkill.cost} points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#00bfff]/60 text-xs">Status</p>
                    <p className={cn(
                      "font-mono text-sm",
                      selectedSkill.unlocked ? "text-[#7fff00]" : "text-[#ff69b4]"
                    )}>
                      {selectedSkill.unlocked ? 'Unlocked' : 'Locked'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Requirements & Actions */}
              <div className="space-y-4">
                {selectedSkill.required.length > 0 && (
                  <div>
                    <h4 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider mb-3">
                      Requirements
                    </h4>
                    <div className="space-y-2">
                      {selectedSkill.required.map((reqId) => {
                        const reqSkill = skills.find(s => s.id === reqId)
                        if (!reqSkill) return null
                        
                        return (
                          <div key={reqId} className="flex items-center space-x-2">
                            <div className={cn(
                              "w-4 h-4 rounded-full",
                              reqSkill.unlocked ? "bg-[#7fff00]" : "bg-[#666666]"
                            )} />
                            <span className={cn(
                              "text-sm",
                              reqSkill.unlocked ? "text-[#7fff00]" : "text-[#666666]"
                            )}>
                              {reqSkill.name}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {!selectedSkill.unlocked && canUnlock(selectedSkill) && (
                  <button
                    onClick={() => unlockSkill(selectedSkill)}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00bfff] to-[#7fff00] text-white font-mono hover:from-[#00bfff]/90 hover:to-[#7fff00]/90 transition-all"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Skill</span>
                  </button>
                )}

                {selectedSkill.unlocked && (
                  <div className="text-center p-4 bg-[#7fff00]/10 rounded-lg border border-[#7fff00]/20">
                    <Star className="w-8 h-8 text-[#7fff00] mx-auto mb-2" />
                    <p className="text-[#7fff00] font-mono text-sm">
                      Skill Unlocked
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 