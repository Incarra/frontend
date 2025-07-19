'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Star, Zap, Target, Trophy, Sparkles, Shield } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'
import { useIncarraContract } from '@/hooks/useIncarraContract'
import { QuestVerification, QuestProof } from './QuestVerification'

interface Quest {
  id: string
  title: string
  description: string
  xpReward: number
  completed: boolean
  category: 'skill' | 'health' | 'career' | 'creativity' | 'finance'
  difficulty: 'easy' | 'medium' | 'hard'
  verificationStatus?: 'pending' | 'approved' | 'rejected'
  submittedProof?: QuestProof
}

const initialQuests: Quest[] = [
  {
    id: '1',
    title: 'Learn a New Skill',
    description: 'Spend 30 minutes learning something completely new - whether it\'s a programming language, cooking technique, or musical instrument.',
    xpReward: 150,
    completed: false,
    category: 'skill',
    difficulty: 'medium'
  },
  {
    id: '2',
    title: 'Morning Energy Boost',
    description: 'Start your day with 10 minutes of stretching or light exercise to boost your cosmic energy levels.',
    xpReward: 100,
    completed: false,
    category: 'health',
    difficulty: 'easy'
  },
  {
    id: '3',
    title: 'Network Constellation',
    description: 'Reach out to one professional contact you haven\'t spoken to in a while. Build your stellar network.',
    xpReward: 200,
    completed: false,
    category: 'career',
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Creative Spark',
    description: 'Create something artistic - draw, write, compose, or craft. Let your imagination flow freely.',
    xpReward: 175,
    completed: false,
    category: 'creativity',
    difficulty: 'easy'
  },
  {
    id: '5',
    title: 'Financial Planning',
    description: 'Review your budget and set one financial goal for the week. Plan your cosmic wealth journey.',
    xpReward: 125,
    completed: false,
    category: 'finance',
    difficulty: 'medium'
  },
  {
    id: '6',
    title: 'Deep Focus Session',
    description: 'Complete a 2-hour focused work session without distractions. Achieve stellar productivity.',
    xpReward: 300,
    completed: false,
    category: 'career',
    difficulty: 'hard'
  },
  {
    id: '7',
    title: 'Mindful Meditation',
    description: 'Practice 15 minutes of meditation or mindfulness. Connect with your inner cosmic energy.',
    xpReward: 120,
    completed: false,
    category: 'health',
    difficulty: 'easy'
  }
]

const categoryColors = {
  skill: '#00bfff',
  health: '#7fff00',
  career: '#ffd700',
  creativity: '#8a2be2',
  finance: '#ff69b4'
}

const difficultyColors = {
  easy: '#7fff00',
  medium: '#ffd700',
  hard: '#ff69b4'
}

export function WeeklyQuests() {
  const [quests, setQuests] = useState<Quest[]>(initialQuests)
  const [showCompleted, setShowCompleted] = useState(false)
  const [processingQuest, setProcessingQuest] = useState<string | null>(null)
  const [verifyingQuest, setVerifyingQuest] = useState<Quest | null>(null)
  
  const { 
    incarraAgent, 
    completeQuest, 
    loading: contractLoading, 
    error: contractError,
    hasAgent 
  } = useIncarraContract()

  const completedQuests = quests.filter(quest => quest.completed)
  const activeQuests = quests.filter(quest => !quest.completed)
  const pendingVerification = quests.filter(quest => quest.verificationStatus === 'pending')
  const totalXP = quests.reduce((sum, quest) => sum + quest.xpReward, 0)
  const earnedXP = completedQuests.reduce((sum, quest) => sum + quest.xpReward, 0)
  const progressPercentage = (earnedXP / totalXP) * 100

  const handleQuestClick = (quest: Quest) => {
    if (quest.completed || processingQuest === quest.id) return
    
    // Open verification modal
    setVerifyingQuest(quest)
  }

  const handleVerificationSubmit = async (proof: QuestProof) => {
    if (!verifyingQuest) return

    try {
      setProcessingQuest(verifyingQuest.id)

      // Update quest with verification status
      setQuests(prev => prev.map(q => 
        q.id === verifyingQuest.id 
          ? { 
              ...q, 
              verificationStatus: 'pending' as const,
              submittedProof: proof
            }
          : q
      ))

      // In a real app, you'd send this to your backend for verification
      // For now, we'll simulate approval after a delay
      setTimeout(() => {
        setQuests(prev => prev.map(q => 
          q.id === verifyingQuest.id 
            ? { 
                ...q, 
                verificationStatus: 'approved' as const,
                completed: true
              }
            : q
        ))

        // Record on-chain if agent exists
        if (hasAgent) {
          completeQuest(verifyingQuest.title, verifyingQuest.description, verifyingQuest.xpReward)
            .catch(error => console.error('Failed to record quest completion:', error))
        }

        setProcessingQuest(null)
      }, 2000)

    } catch (error) {
      console.error('Error submitting verification:', error)
      setProcessingQuest(null)
    } finally {
      setVerifyingQuest(null)
    }
  }

  const handleVerificationCancel = () => {
    setVerifyingQuest(null)
  }

  const getCategoryIcon = (category: Quest['category']) => {
    switch (category) {
      case 'skill': return Zap
      case 'health': return Target
      case 'career': return Trophy
      case 'creativity': return Sparkles
      case 'finance': return Star
      default: return Star
    }
  }

  const getVerificationStatusIcon = (status?: string) => {
    switch (status) {
      case 'pending':
        return <div className="w-3 h-3 border-2 border-[#ffd700] border-t-transparent rounded-full animate-spin" />
      case 'approved':
        return <Check className="w-3 h-3 text-[#7fff00]" />
      case 'rejected':
        return <div className="w-3 h-3 bg-[#ff69b4] rounded-full" />
      default:
        return null
    }
  }

  const renderQuest = (quest: Quest, index: number) => {
    const CategoryIcon = getCategoryIcon(quest.category)
    const isProcessing = processingQuest === quest.id
    const hasVerificationStatus = quest.verificationStatus && quest.verificationStatus !== 'pending'
    
    return (
      <motion.div
        key={quest.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={cn(
          "p-4 rounded-xl border backdrop-blur-sm transition-all duration-300",
          quest.completed 
            ? [
                "bg-gradient-to-r from-[#7fff00]/10 to-[#00bfff]/10",
                "border-[#7fff00]/30",
                "opacity-75"
              ]
            : quest.verificationStatus === 'pending'
            ? [
                "bg-gradient-to-r from-[#ffd700]/10 to-[#ff69b4]/10",
                "border-[#ffd700]/30"
              ]
            : [
                "bg-gradient-to-r from-[#0a0a0a]/50 to-[#1a1a2e]/50",
                "border-[#00bfff]/20",
                "hover:border-[#00bfff]/40 hover:bg-[#00bfff]/5"
              ],
          isProcessing && "border-[#ffd700]/50 bg-[#ffd700]/5"
        )}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox/Status */}
          <div className="flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200">
            {quest.completed ? (
              <Check className="w-4 h-4 text-[#0a0a0a]" />
            ) : quest.verificationStatus === 'pending' ? (
              getVerificationStatusIcon('pending')
            ) : (
              <button
                onClick={() => handleQuestClick(quest)}
                disabled={isProcessing || contractLoading}
                className={cn(
                  "w-full h-full rounded-lg border-2 flex items-center justify-center transition-all duration-200",
                  isProcessing
                    ? [
                        "bg-[#ffd700] border-[#ffd700]",
                        "shadow-[0_0_15px_rgba(255,215,0,0.3)]",
                        "animate-pulse"
                      ]
                    : [
                        "bg-transparent border-[#00bfff]/40",
                        "hover:border-[#00bfff] hover:bg-[#00bfff]/10"
                      ],
                  "disabled:cursor-not-allowed"
                )}
                whileHover={!isProcessing ? { scale: 1.1 } : {}}
                whileTap={!isProcessing ? { scale: 0.9 } : {}}
              >
                {isProcessing && (
                  <div className="w-3 h-3 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                )}
              </button>
            )}
          </div>

          {/* Quest Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <CategoryIcon 
                  className="w-4 h-4 flex-shrink-0" 
                  style={{ color: categoryColors[quest.category] }}
                />
                <h3 className={cn(
                  "font-mono text-sm font-medium truncate",
                  quest.completed 
                    ? "text-[#7fff00] line-through" 
                    : quest.verificationStatus === 'pending'
                    ? "text-[#ffd700]"
                    : isProcessing
                    ? "text-[#ffd700]"
                    : "text-[#ffffff]"
                )}>
                  {quest.title}
                  {quest.verificationStatus === 'pending' && " (Verifying...)"}
                  {isProcessing && " (Processing...)"}
                </h3>
              </div>
              
              {/* XP Reward */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3 h-3 text-[#ffd700]" />
                <span className="text-[#ffd700] font-mono text-xs">
                  {quest.xpReward} XP
                </span>
              </div>
            </div>

            <p className={cn(
              "text-sm leading-relaxed mb-3",
              quest.completed 
                ? "text-[#00bfff]/60" 
                : quest.verificationStatus === 'pending'
                ? "text-[#ffd700]/70"
                : isProcessing
                ? "text-[#ffd700]/70"
                : "text-[#ffffff]/70"
            )}>
              {quest.description}
            </p>

            {/* Verification Status */}
            {quest.verificationStatus === 'pending' && (
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-3 h-3 text-[#ffd700]" />
                <span className="text-[#ffd700] text-xs font-mono">
                  Verification pending...
                </span>
              </div>
            )}

            {/* Difficulty Badge */}
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-1 rounded text-xs font-mono uppercase tracking-wider"
                style={{
                  background: `${difficultyColors[quest.difficulty]}20`,
                  color: difficultyColors[quest.difficulty],
                  border: `1px solid ${difficultyColors[quest.difficulty]}40`
                }}
              >
                {quest.difficulty}
              </span>
              
              <span
                className="px-2 py-1 rounded text-xs font-mono uppercase tracking-wider"
                style={{
                  background: `${categoryColors[quest.category]}20`,
                  color: categoryColors[quest.category],
                  border: `1px solid ${categoryColors[quest.category]}40`
                }}
              >
                {quest.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-mono text-[#ffd700] mb-2 tracking-wider">
          WEEKLY MICRO-QUESTS
        </h1>
        <p className="text-[#00bfff] font-light">
          Complete cosmic challenges to level up your life
        </p>
        
        {/* Contract Status */}
        {hasAgent && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#7fff00] rounded-full animate-pulse" />
            <span className="text-[#7fff00] text-sm font-mono">
              Connected to Incarra Agent
            </span>
          </div>
        )}
        
        {contractError && (
          <div className="mt-4 p-3 rounded-lg bg-[#ff69b4]/10 border border-[#ff69b4]/20">
            <p className="text-[#ff69b4] text-sm">
              Contract Error: {contractError}
            </p>
          </div>
        )}

        {/* Verification Status */}
        {pendingVerification.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/20">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ffd700]" />
              <span className="text-[#ffd700] text-sm font-mono">
                {pendingVerification.length} quest{pendingVerification.length > 1 ? 's' : ''} pending verification
              </span>
            </div>
          </div>
        )}
      </div>

      {/* XP Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ffd700]" />
            <span className="text-[#ffd700] font-mono text-sm uppercase tracking-wider">
              Progress
            </span>
          </div>
          <div className="text-right">
            <div className="text-[#7fff00] font-mono text-sm">
              {earnedXP} / {totalXP} XP
            </div>
            <div className="text-[#00bfff]/60 text-xs">
              {completedQuests.length} / {quests.length} Quests
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#0a0a0a]/50 rounded-full h-3 border border-[#00bfff]/20 overflow-hidden">
          <motion.div
            className="h-full rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, #7fff00, #00bfff, #8a2be2)`
            }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex rounded-lg border border-[#00bfff]/20 bg-[#0a0a0a]/50 p-1">
          <button
            onClick={() => setShowCompleted(false)}
            className={cn(
              "px-4 py-2 rounded text-sm font-mono transition-all duration-200",
              !showCompleted
                ? "bg-[#00bfff] text-[#0a0a0a]"
                : "text-[#00bfff]/60 hover:text-[#00bfff]"
            )}
          >
            Active ({activeQuests.length})
          </button>
          <button
            onClick={() => setShowCompleted(true)}
            className={cn(
              "px-4 py-2 rounded text-sm font-mono transition-all duration-200",
              showCompleted
                ? "bg-[#7fff00] text-[#0a0a0a]"
                : "text-[#7fff00]/60 hover:text-[#7fff00]"
            )}
          >
            Completed ({completedQuests.length})
          </button>
        </div>
      </div>

      {/* Quests List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {(showCompleted ? completedQuests : activeQuests).map((quest, index) => 
            renderQuest(quest, index)
          )}
        </AnimatePresence>
        
        {/* Empty State */}
        {(showCompleted ? completedQuests : activeQuests).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Star className="w-12 h-12 text-[#00bfff]/40 mx-auto mb-4" />
            <p className="text-[#00bfff]/60 font-mono">
              {showCompleted 
                ? "No completed quests yet. Start your journey!" 
                : "All quests completed! You're a cosmic champion!"
              }
            </p>
          </motion.div>
        )}
      </div>

      {/* Verification Modal */}
      {verifyingQuest && (
        <QuestVerification
          quest={verifyingQuest}
          onVerify={handleVerificationSubmit}
          onCancel={handleVerificationCancel}
          isOpen={true}
        />
      )}
    </div>
  )
} 