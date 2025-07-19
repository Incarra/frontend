'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Zap, Target, MessageCircle, TrendingUp, Activity } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'
import { useIncarraContract } from '@/hooks/useIncarraContract'

// Dummy data for demonstration
const dummyAgent = {
  agentName: "Cosmic Nova",
  personality: "A curious and adventurous AI companion who loves exploring new ideas and helping with creative projects. Always eager to learn and share knowledge across the digital cosmos.",
  level: 7,
  experience: 675,
  totalInteractions: 142,
  reputation: 89,
  aiConversations: 67,
  researchProjects: 23,
  dataSourcesConnected: 8,
  knowledgeAreas: ["Machine Learning", "Creative Writing", "Data Analysis", "Web Development"],
  isActive: true
}

const dummyCarvProfile = {
  isVerified: true,
  reputationScore: 89,
  credentialsCount: 5,
  achievementsCount: 12,
  totalInteractions: 142,
  level: 7
}

export function Dashboard() {
  const { incarraAgent, carvProfile, loading } = useIncarraContract()

  // Use dummy data for demonstration
  const agent = dummyAgent
  const profile = dummyCarvProfile

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#00bfff] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#00bfff] font-mono">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      id: 'chat',
      label: 'Start Chat',
      description: 'Talk to your AI companion',
      icon: MessageCircle,
      color: 'text-[#00bfff]',
      bgColor: 'bg-[#00bfff]/10',
      borderColor: 'border-[#00bfff]/20'
    },
    {
      id: 'quests',
      label: 'View Quests',
      description: 'Complete weekly challenges',
      icon: Target,
      color: 'text-[#ffd700]',
      bgColor: 'bg-[#ffd700]/10',
      borderColor: 'border-[#ffd700]/20'
    },
    {
      id: 'life-areas',
      label: 'Life Areas',
      description: 'Personal growth map',
      icon: Star,
      color: 'text-[#ff69b4]',
      bgColor: 'bg-[#ff69b4]/10',
      borderColor: 'border-[#ff69b4]/20'
    },
    {
      id: 'skill-tree',
      label: 'Skill Tree',
      description: 'Train abilities',
      icon: Zap,
      color: 'text-[#7fff00]',
      bgColor: 'bg-[#7fff00]/10',
      borderColor: 'border-[#7fff00]/20'
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 text-[#ffd700] mx-auto mb-4" />
        <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
          DASHBOARD
        </h1>
        <p className="text-[#00bfff] font-light">
          Your cosmic AI companion overview
        </p>
      </div>

      {/* Agent Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-6 rounded-xl border backdrop-blur-sm mb-8",
          cosmicBorders.glow,
          "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-mono text-[#ffd700] mb-1">
              {agent.agentName}
            </h2>
            <p className="text-[#00bfff]/60 text-sm">
              {agent.personality}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[#7fff00] font-mono text-2xl">
              Level {agent.level}
            </div>
            <div className="text-[#00bfff]/60 text-sm">
              {agent.experience} XP
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#0a0a0a]/50 rounded-full h-3 border border-[#00bfff]/20 overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((agent.experience % 100) / 100) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, #7fff00, #00bfff, #8a2be2)`
            }}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-[#00bfff]/10 border border-[#00bfff]/20">
            <div className="text-[#00bfff] font-mono text-lg">{agent.totalInteractions}</div>
            <div className="text-[#00bfff]/60 text-xs">Interactions</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20">
            <div className="text-[#ffd700] font-mono text-lg">{agent.reputation}</div>
            <div className="text-[#ffd700]/60 text-xs">Reputation</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#7fff00]/10 border border-[#7fff00]/20">
            <div className="text-[#7fff00] font-mono text-lg">
              {profile.isVerified ? '✓' : '○'}
            </div>
            <div className="text-[#7fff00]/60 text-xs">Carv ID</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-xl font-mono text-[#ffd700] mb-4 text-center">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-200",
                action.bgColor,
                action.borderColor,
                "hover:scale-105 hover:shadow-lg"
              )}
            >
              <div className="flex items-center gap-3">
                <action.icon className={`w-6 h-6 ${action.color}`} />
                <div>
                  <div className={`font-mono text-sm font-medium ${action.color}`}>
                    {action.label}
                  </div>
                  <div className="text-[#ffffff]/60 text-xs">
                    {action.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={cn(
          "p-6 rounded-xl border backdrop-blur-sm",
          cosmicBorders.glow,
          "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-[#00bfff]" />
          <h3 className="text-lg font-mono text-[#ffd700]">Recent Activity</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#00bfff]/5 border border-[#00bfff]/10">
            <TrendingUp className="w-4 h-4 text-[#7fff00]" />
            <div className="flex-1">
              <div className="text-[#ffffff] text-sm">Level up to {agent.level}</div>
              <div className="text-[#00bfff]/60 text-xs">Earned {agent.experience} XP</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#ffd700]/5 border border-[#ffd700]/10">
            <MessageCircle className="w-4 h-4 text-[#00bfff]" />
            <div className="flex-1">
              <div className="text-[#ffffff] text-sm">{agent.aiConversations} conversations</div>
              <div className="text-[#00bfff]/60 text-xs">With your AI companion</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#7fff00]/5 border border-[#7fff00]/10">
            <Target className="w-4 h-4 text-[#ffd700]" />
            <div className="flex-1">
              <div className="text-[#ffffff] text-sm">{agent.researchProjects} research projects</div>
              <div className="text-[#00bfff]/60 text-xs">Knowledge gained</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 