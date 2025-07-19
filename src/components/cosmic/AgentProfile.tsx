'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Shield, Zap, Target, Sparkles, CheckCircle, Award } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'
import { useIncarraContract } from '@/hooks/useIncarraContract'

export function AgentProfile() {
  const { 
    incarraAgent, 
    carvProfile, 
    loading, 
    error,
    hasAgent 
  } = useIncarraContract()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#00bfff] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#00bfff] font-mono">Loading agent data...</span>
        </div>
      </div>
    )
  }

  if (!hasAgent) {
    return (
      <div className="text-center py-12">
        <Star className="w-16 h-16 text-[#00bfff]/40 mx-auto mb-4" />
        <h3 className="text-xl font-mono text-[#ffd700] mb-2">
          No Incarra Agent Found
        </h3>
        <p className="text-[#00bfff]/60">
          Create your cosmic AI companion to start earning XP and achievements
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-[#ff69b4]/10 border border-[#ff69b4]/20">
        <h3 className="text-[#ff69b4] font-mono mb-2">Error Loading Agent</h3>
        <p className="text-[#ff69b4]/80 text-sm">{error}</p>
      </div>
    )
  }

  if (!incarraAgent) return null

  return (
    <div className="space-y-6">
      {/* Agent Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-6 rounded-xl border backdrop-blur-sm",
          cosmicBorders.glow,
          "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-mono text-[#ffd700] mb-1">
              {incarraAgent.agentName}
            </h2>
            <p className="text-[#00bfff]/60 text-sm">
              {incarraAgent.personality}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[#7fff00] font-mono text-lg">
              Level {incarraAgent.level}
            </div>
            <div className="text-[#00bfff]/60 text-sm">
              {incarraAgent.experience} XP
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-[#00bfff]/10 border border-[#00bfff]/20">
            <div className="text-[#00bfff] font-mono text-lg">{incarraAgent.totalInteractions}</div>
            <div className="text-[#00bfff]/60 text-xs">Interactions</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20">
            <div className="text-[#ffd700] font-mono text-lg">{incarraAgent.reputation}</div>
            <div className="text-[#ffd700]/60 text-xs">Reputation</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#7fff00]/10 border border-[#7fff00]/20">
            <div className="text-[#7fff00] font-mono text-lg">{incarraAgent.researchProjects}</div>
            <div className="text-[#7fff00]/60 text-xs">Research</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-[#8a2be2]/10 border border-[#8a2be2]/20">
            <div className="text-[#8a2be2] font-mono text-lg">{incarraAgent.aiConversations}</div>
            <div className="text-[#8a2be2]/60 text-xs">Conversations</div>
          </div>
        </div>
      </motion.div>

      {/* Carv ID Profile */}
      {carvProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "p-6 rounded-xl border backdrop-blur-sm",
            cosmicBorders.glow,
            "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#00bfff]" />
            <h3 className="text-xl font-mono text-[#ffd700]">Carv ID Profile</h3>
            {carvProfile.isVerified && (
              <CheckCircle className="w-5 h-5 text-[#7fff00]" />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#00bfff]/60">Carv ID:</span>
              <span className="text-[#ffffff] font-mono text-sm">
                {carvProfile.carvId.slice(0, 6)}...{carvProfile.carvId.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00bfff]/60">Status:</span>
              <span className={cn(
                "px-2 py-1 rounded text-xs font-mono",
                carvProfile.isVerified
                  ? "bg-[#7fff00]/20 text-[#7fff00] border border-[#7fff00]/30"
                  : "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30"
              )}>
                {carvProfile.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00bfff]/60">Reputation Score:</span>
              <span className="text-[#ffd700] font-mono">{carvProfile.reputationScore}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00bfff]/60">Credentials:</span>
              <span className="text-[#ffffff]">{carvProfile.credentialsCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00bfff]/60">Achievements:</span>
              <span className="text-[#ffffff]">{carvProfile.achievementsCount}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Knowledge Areas */}
      {incarraAgent.knowledgeAreas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "p-6 rounded-xl border backdrop-blur-sm",
            cosmicBorders.glow,
            "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-[#ffd700]" />
            <h3 className="text-xl font-mono text-[#ffd700]">Knowledge Areas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {incarraAgent.knowledgeAreas.map((area, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-lg text-sm font-mono"
                style={{
                  background: 'rgba(0, 191, 255, 0.1)',
                  color: '#00bfff',
                  border: '1px solid rgba(0, 191, 255, 0.3)'
                }}
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Achievements */}
      {incarraAgent.achievements && incarraAgent.achievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={cn(
            "p-6 rounded-xl border backdrop-blur-sm",
            cosmicBorders.glow,
            "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-[#ffd700]" />
            <h3 className="text-xl font-mono text-[#ffd700]">Achievements</h3>
          </div>
          <div className="space-y-3">
            {incarraAgent.achievements.slice(0, 5).map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#ffd700]/5 border border-[#ffd700]/20">
                <Trophy className="w-4 h-4 text-[#ffd700] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[#ffd700] font-mono text-sm">{achievement.name}</div>
                  <div className="text-[#00bfff]/60 text-xs">{achievement.description}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-[#ffd700]" />
                    <span className="text-[#ffd700] text-xs">{achievement.score} XP</span>
                  </div>
                </div>
              </div>
            ))}
            {incarraAgent.achievements.length > 5 && (
              <div className="text-center text-[#00bfff]/60 text-sm">
                +{incarraAgent.achievements.length - 5} more achievements
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Credentials */}
      {incarraAgent.credentials && incarraAgent.credentials.length > 0 && (
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
            <Target className="w-6 h-6 text-[#7fff00]" />
            <h3 className="text-xl font-mono text-[#ffd700]">Credentials</h3>
          </div>
          <div className="space-y-3">
            {incarraAgent.credentials.slice(0, 3).map((credential, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#7fff00]/5 border border-[#7fff00]/20">
                <div className="w-4 h-4 rounded-full border-2 border-[#7fff00] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {credential.isVerified && (
                    <CheckCircle className="w-2.5 h-2.5 text-[#7fff00]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[#7fff00] font-mono text-sm">{credential.credentialType}</div>
                  <div className="text-[#00bfff]/60 text-xs">Issued by: {credential.issuer}</div>
                </div>
              </div>
            ))}
            {incarraAgent.credentials.length > 3 && (
              <div className="text-center text-[#00bfff]/60 text-sm">
                +{incarraAgent.credentials.length - 3} more credentials
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
} 