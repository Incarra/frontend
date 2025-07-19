'use client'

import { motion } from 'framer-motion'
import { StellarAvatar } from './StellarAvatar'
import { WalletStatus } from './WalletStatus'
import { cn, cosmicGradients, cosmicBorders, seededRandom } from '@/lib/utils'
import { Star, Zap, Target, TrendingUp } from 'lucide-react'

interface StarMapProps {
  userId: string
  avatarStage?: string
  energyLevel?: number
  recentEvents?: Array<{
    id: string
    type: 'task' | 'interaction' | 'evolution' | 'connection'
    title: string
    timestamp: string
    description: string
  }>
}

export function StarMap({ 
  userId, 
  avatarStage = 'fractal',
  energyLevel = 75,
  recentEvents = []
}: StarMapProps) {
  const evolutionOrbit = [
    { stage: 'seed', progress: 100, label: 'Digital Seed' },
    { stage: 'core', progress: 100, label: 'Smart Core' },
    { stage: 'fractal', progress: 75, label: 'Growing Mind' },
    { stage: 'constellation', progress: 25, label: 'Network Mind' },
    { stage: 'incarnate', progress: 0, label: 'Full Intelligence' }
  ]

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
      
      {/* Stardust Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${seededRandom(userId, i) * 100}%`,
              top: `${seededRandom(userId + 'top', i) * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + seededRandom(userId + 'duration', i) * 2,
              repeat: Infinity,
              delay: seededRandom(userId + 'delay', i) * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
            STAR MAP
          </h1>
          <p className="text-[#00bfff] font-light">
            Your AI companion's current status
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Central Avatar Section */}
          <motion.div 
            className="lg:col-span-1 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Wallet Status */}
            <div className="mb-6 w-full max-w-sm">
              <WalletStatus />
            </div>
            <div className="relative mb-8">
              <StellarAvatar
                userId={userId}
                stage={avatarStage as any}
                size="xl"
                isInteractive={true}
                className="mb-4"
              />
              
              {/* Energy Level Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#00bfff]/20">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#00bfff]"
                  style={{
                    background: `conic-gradient(from 0deg, #00bfff ${energyLevel * 3.6}deg, transparent ${energyLevel * 3.6}deg)`,
                  }}
                  initial={{ rotate: -90 }}
                  animate={{ rotate: -90 + (energyLevel * 3.6) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-mono text-[#ffd700] mb-2">
                {avatarStage === 'seed' && 'Digital Seed'}
                {avatarStage === 'core' && 'Smart Core'}
                {avatarStage === 'fractal' && 'Growing Mind'}
                {avatarStage === 'constellation' && 'Network Mind'}
                {avatarStage === 'incarnate' && 'Full Intelligence'}
              </h2>
              <p className="text-[#00bfff] text-sm mb-4">
                Processing Power: {energyLevel}%
              </p>
              
              {/* Energy Bar */}
              <div className="w-48 h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00bfff] to-[#7fff00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${energyLevel}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Evolution Orbit */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-mono text-[#ffd700] mb-6">
              GROWTH PATH
            </h3>
            
            <div className="space-y-4">
              {evolutionOrbit.map((orbit, index) => (
                <motion.div
                  key={orbit.stage}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Stage Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      orbit.progress === 100 ? cosmicGradients.solar : "bg-[#2a2a3e]"
                    )}>
                      {orbit.progress === 100 ? (
                        <Star className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-[#00bfff]/40" />
                      )}
                    </div>

                    {/* Stage Info */}
                    <div className="flex-1">
                      <h4 className="text-[#ffd700] font-mono text-sm">
                        {orbit.label}
                      </h4>
                      <div className="w-full h-1 bg-[#1a1a2e] rounded-full mt-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#00bfff] to-[#7fff00]"
                          initial={{ width: 0 }}
                          animate={{ width: `${orbit.progress}%` }}
                          transition={{ duration: 1, delay: 1 + index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Progress */}
                    <span className="text-[#00bfff] text-sm font-mono">
                      {orbit.progress}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Events */}
        {recentEvents.length > 0 && (
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-2xl font-mono text-[#ffd700] mb-6">
              RECENT ACTIVITY
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={cn(
                    "p-4 rounded-xl border backdrop-blur-sm",
                    cosmicBorders.drift
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="flex items-start space-x-3">
                    {/* Event Icon */}
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      event.type === 'task' && "bg-[#00bfff]/20",
                      event.type === 'interaction' && "bg-[#7fff00]/20",
                      event.type === 'evolution' && "bg-[#ffd700]/20",
                      event.type === 'connection' && "bg-[#ff69b4]/20"
                    )}>
                      {event.type === 'task' && <Target className="w-4 h-4 text-[#00bfff]" />}
                      {event.type === 'interaction' && <Zap className="w-4 h-4 text-[#7fff00]" />}
                      {event.type === 'evolution' && <TrendingUp className="w-4 h-4 text-[#ffd700]" />}
                      {event.type === 'connection' && <Star className="w-4 h-4 text-[#ff69b4]" />}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1">
                      <h4 className="text-[#ffd700] font-mono text-sm mb-1">
                        {event.title}
                      </h4>
                      <p className="text-[#00bfff]/80 text-xs mb-2">
                        {event.description}
                      </p>
                      <span className="text-[#00bfff]/60 text-xs font-mono">
                        {event.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 