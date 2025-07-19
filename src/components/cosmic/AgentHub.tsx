'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, UserPlus, Shield, Settings, Sparkles, ArrowLeft } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'
import { useIncarraContract } from '@/hooks/useIncarraContract'
import { AgentProfile } from './AgentProfile'
import { CreateAgent } from './CreateAgent'

type AgentHubView = 'profile' | 'create' | 'settings'

export function AgentHub() {
  const [activeView, setActiveView] = useState<AgentHubView>('profile')
  const { hasAgent, loading } = useIncarraContract()

  // If no agent exists, show create view by default
  if (!hasAgent && !loading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <UserPlus className="w-16 h-16 text-[#00bfff] mx-auto mb-4" />
          <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
            AGENT HUB
          </h1>
          <p className="text-[#00bfff] font-light">
            Create your cosmic AI companion
          </p>
        </div>
        <CreateAgent />
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <User className="w-16 h-16 text-[#00bfff] mx-auto mb-4" />
        <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
          AGENT HUB
        </h1>
        <p className="text-[#00bfff] font-light">
          Manage your cosmic AI companion
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex rounded-lg border border-[#00bfff]/20 bg-[#0a0a0a]/50 p-1">
          <button
            onClick={() => setActiveView('profile')}
            className={cn(
              "px-6 py-3 rounded text-sm font-mono transition-all duration-200",
              activeView === 'profile'
                ? "bg-[#00bfff] text-[#0a0a0a]"
                : "text-[#00bfff]/60 hover:text-[#00bfff]"
            )}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Profile</span>
            </div>
          </button>
          <button
            onClick={() => setActiveView('create')}
            className={cn(
              "px-6 py-3 rounded text-sm font-mono transition-all duration-200",
              activeView === 'create'
                ? "bg-[#ffd700] text-[#0a0a0a]"
                : "text-[#ffd700]/60 hover:text-[#ffd700]"
            )}
          >
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>Create New</span>
            </div>
          </button>
          <button
            onClick={() => setActiveView('settings')}
            className={cn(
              "px-6 py-3 rounded text-sm font-mono transition-all duration-200",
              activeView === 'settings'
                ? "bg-[#7fff00] text-[#0a0a0a]"
                : "text-[#7fff00]/60 hover:text-[#7fff00]"
            )}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'profile' && (
            <div>
              <AgentProfile />
            </div>
          )}
          
          {activeView === 'create' && (
            <div>
              <div className="text-center mb-8">
                <Sparkles className="w-12 h-12 text-[#ffd700] mx-auto mb-4" />
                <h2 className="text-2xl font-mono text-[#ffd700] mb-2">
                  Create New Agent
                </h2>
                <p className="text-[#00bfff]/60">
                  Add another AI companion to your network
                </p>
              </div>
              <CreateAgent />
            </div>
          )}
          
          {activeView === 'settings' && (
            <div className={cn(
              "p-8 rounded-xl border backdrop-blur-sm",
              cosmicBorders.glow,
              "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
            )}>
              <div className="text-center">
                <Settings className="w-16 h-16 text-[#7fff00] mx-auto mb-4" />
                <h2 className="text-2xl font-mono text-[#ffd700] mb-2">
                  Agent Settings
                </h2>
                <p className="text-[#00bfff]/60 mb-6">
                  Configure your AI companion preferences
                </p>
                <div className="text-[#00bfff]/40 text-sm">
                  Settings panel coming soon...
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 