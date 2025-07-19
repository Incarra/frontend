'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Sparkles, Shield } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'
import { useIncarraContract } from '@/hooks/useIncarraContract'

export function CreateAgent() {
  const [agentName, setAgentName] = useState('')
  const [personality, setPersonality] = useState('')
  const [carvId, setCarvId] = useState('')
  const [verificationSignature, setVerificationSignature] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  
  const { 
    createIncarraAgent, 
    loading, 
    error,
    hasAgent 
  } = useIncarraContract()

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!agentName.trim() || !personality.trim() || !carvId.trim()) {
      return
    }

    try {
      setIsCreating(true)
      await createIncarraAgent(
        agentName.trim(),
        personality.trim(),
        carvId.trim(),
        verificationSignature.trim() || 'placeholder-signature'
      )
      
      // Reset form
      setAgentName('')
      setPersonality('')
      setCarvId('')
      setVerificationSignature('')
      
    } catch (error) {
      console.error('Error creating agent:', error)
    } finally {
      setIsCreating(false)
    }
  }

  if (hasAgent) {
    return (
      <div className="text-center py-8">
        <Shield className="w-12 h-12 text-[#7fff00] mx-auto mb-4" />
        <h3 className="text-xl font-mono text-[#ffd700] mb-2">
          Agent Already Created
        </h3>
        <p className="text-[#00bfff]/60">
          You already have an Incarra agent. Check your profile to view details.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <UserPlus className="w-12 h-12 text-[#00bfff] mx-auto mb-4" />
        <h2 className="text-2xl font-mono text-[#ffd700] mb-2">
          Create Your Incarra Agent
        </h2>
        <p className="text-[#00bfff]/60">
          Begin your cosmic AI journey
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleCreateAgent}
        className={cn(
          "p-6 rounded-xl border backdrop-blur-sm",
          cosmicBorders.glow,
          "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80"
        )}
      >
        <div className="space-y-4">
          {/* Agent Name */}
          <div>
            <label className="block text-[#00bfff] text-sm font-mono mb-2">
              Agent Name
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Enter your agent's name"
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                "text-[#ffffff] placeholder-[#00bfff]/40",
                "border-[#00bfff]/20 focus:border-[#00bfff]",
                "focus:outline-none focus:ring-0",
                "transition-all duration-200"
              )}
              maxLength={50}
              required
            />
          </div>

          {/* Personality */}
          <div>
            <label className="block text-[#00bfff] text-sm font-mono mb-2">
              Personality
            </label>
            <textarea
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="Describe your agent's personality..."
              rows={3}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                "text-[#ffffff] placeholder-[#00bfff]/40",
                "border-[#00bfff]/20 focus:border-[#00bfff]",
                "focus:outline-none focus:ring-0",
                "transition-all duration-200 resize-none"
              )}
              maxLength={200}
              required
            />
          </div>

          {/* Carv ID */}
          <div>
            <label className="block text-[#00bfff] text-sm font-mono mb-2">
              Carv ID (Ethereum Address)
            </label>
            <input
              type="text"
              value={carvId}
              onChange={(e) => setCarvId(e.target.value)}
              placeholder="0x..."
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                "text-[#ffffff] placeholder-[#00bfff]/40",
                "border-[#00bfff]/20 focus:border-[#00bfff]",
                "focus:outline-none focus:ring-0",
                "transition-all duration-200"
              )}
              maxLength={42}
              required
            />
          </div>

          {/* Verification Signature */}
          <div>
            <label className="block text-[#00bfff] text-sm font-mono mb-2">
              Verification Signature (Optional)
            </label>
            <input
              type="text"
              value={verificationSignature}
              onChange={(e) => setVerificationSignature(e.target.value)}
              placeholder="Signature proving Carv ID ownership"
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                "text-[#ffffff] placeholder-[#00bfff]/40",
                "border-[#00bfff]/20 focus:border-[#00bfff]",
                "focus:outline-none focus:ring-0",
                "transition-all duration-200"
              )}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 rounded-lg bg-[#ff69b4]/10 border border-[#ff69b4]/20">
              <p className="text-[#ff69b4] text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || isCreating}
            className={cn(
              "w-full py-3 px-6 rounded-lg font-mono text-sm uppercase tracking-wider",
              "transition-all duration-200",
              loading || isCreating
                ? [
                    "bg-[#00bfff]/20 text-[#00bfff]/60",
                    "border border-[#00bfff]/20",
                    "cursor-not-allowed"
                  ]
                : [
                    "bg-gradient-to-r from-[#00bfff] to-[#8a2be2]",
                    "text-[#0a0a0a] font-semibold",
                    "hover:shadow-[0_0_20px_rgba(0,191,255,0.3)]",
                    "active:scale-95"
                  ]
            )}
            whileHover={!loading && !isCreating ? { scale: 1.02 } : {}}
            whileTap={!loading && !isCreating ? { scale: 0.98 } : {}}
          >
            {loading || isCreating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                <span>Creating Agent...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Create Agent</span>
              </div>
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
} 