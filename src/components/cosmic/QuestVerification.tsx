'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, XCircle, Camera, FileText, Link, AlertCircle } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'

interface QuestVerificationProps {
  quest: {
    id: string
    title: string
    description: string
    xpReward: number
    category: 'skill' | 'health' | 'career' | 'creativity' | 'finance'
    difficulty: 'easy' | 'medium' | 'hard'
  }
  onVerify: (proof: QuestProof) => void
  onCancel: () => void
  isOpen: boolean
}

export interface QuestProof {
  questId: string
  proofType: 'image' | 'text' | 'link' | 'video'
  proofData: string
  description: string
  timestamp: Date
}

export function QuestVerification({ quest, onVerify, onCancel, isOpen }: QuestVerificationProps) {
  const [proofType, setProofType] = useState<'image' | 'text' | 'link' | 'video'>('text')
  const [proofData, setProofData] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const proofTypeOptions = [
    {
      type: 'image' as const,
      label: 'Photo/Image',
      description: 'Upload a photo of your completed task',
      icon: Camera,
      color: 'text-[#00bfff]'
    },
    {
      type: 'text' as const,
      label: 'Text Description',
      description: 'Describe what you accomplished',
      icon: FileText,
      color: 'text-[#7fff00]'
    },
    {
      type: 'link' as const,
      label: 'Link/URL',
      description: 'Share a link to your work',
      icon: Link,
      color: 'text-[#ffd700]'
    },
    {
      type: 'video' as const,
      label: 'Video',
      description: 'Upload a video of your progress',
      icon: Upload,
      color: 'text-[#ff69b4]'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!proofData.trim() || !description.trim()) {
      setError('Please provide both proof and description')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')

      const proof: QuestProof = {
        questId: quest.id,
        proofType,
        proofData: proofData.trim(),
        description: description.trim(),
        timestamp: new Date()
      }

      await onVerify(proof)
      
      // Reset form
      setProofData('')
      setDescription('')
      setProofType('text')
      
    } catch (error) {
      setError('Failed to submit verification. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to IPFS or similar
      // For now, we'll just store the filename
      setProofData(file.name)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "w-full max-w-2xl rounded-2xl border backdrop-blur-sm my-8",
              cosmicBorders.glow,
              "bg-gradient-to-br from-[#0a0a0a]/95 to-[#1a1a2e]/95"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#00bfff]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-mono text-[#ffd700] mb-1">
                    Verify Quest Completion
                  </h2>
                  <p className="text-[#00bfff]/60 text-sm">
                    Provide proof that you completed: "{quest.title}"
                  </p>
                </div>
                <button
                  onClick={onCancel}
                  className="p-2 rounded-lg text-[#00bfff]/60 hover:text-[#00bfff] hover:bg-[#00bfff]/10 transition-all"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quest Info */}
            <div className="p-6 border-b border-[#00bfff]/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1 rounded text-xs font-mono uppercase tracking-wider"
                  style={{
                    background: `${getCategoryColor(quest.category)}20`,
                    color: getCategoryColor(quest.category),
                    border: `1px solid ${getCategoryColor(quest.category)}40`
                  }}
                >
                  {quest.category}
                </div>
                <div className="px-3 py-1 rounded text-xs font-mono uppercase tracking-wider"
                  style={{
                    background: `${getDifficultyColor(quest.difficulty)}20`,
                    color: getDifficultyColor(quest.difficulty),
                    border: `1px solid ${getDifficultyColor(quest.difficulty)}40`
                  }}
                >
                  {quest.difficulty}
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <div className="w-2 h-2 bg-[#ffd700] rounded-full" />
                  <span className="text-[#ffd700] text-sm font-mono">
                    {quest.xpReward} XP
                  </span>
                </div>
              </div>
              <p className="text-[#ffffff]/80 text-sm leading-relaxed">
                {quest.description}
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Proof Type Selection */}
              <div>
                <label className="block text-[#00bfff] text-sm font-mono mb-3">
                  Choose Proof Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {proofTypeOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.type}
                        type="button"
                        onClick={() => setProofType(option.type)}
                        className={cn(
                          "p-4 rounded-lg border transition-all duration-200 text-left",
                          proofType === option.type
                            ? [
                                "border-[#00bfff] bg-[#00bfff]/10",
                                "shadow-[0_0_15px_rgba(0,191,255,0.2)]"
                              ]
                            : [
                                "border-[#00bfff]/20 bg-[#0a0a0a]/50",
                                "hover:border-[#00bfff]/40 hover:bg-[#00bfff]/5"
                              ]
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${option.color}`} />
                          <div>
                            <div className={`font-mono text-sm font-medium ${option.color}`}>
                              {option.label}
                            </div>
                            <div className="text-[#ffffff]/60 text-xs">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Proof Input */}
              <div>
                <label className="block text-[#00bfff] text-sm font-mono mb-2">
                  {proofType === 'image' || proofType === 'video' ? 'Upload File' : 'Proof'}
                </label>
                
                {proofType === 'image' || proofType === 'video' ? (
                  <div className="border-2 border-dashed border-[#00bfff]/30 rounded-lg p-6 text-center hover:border-[#00bfff]/50 transition-colors">
                    <Upload className="w-8 h-8 text-[#00bfff]/60 mx-auto mb-3" />
                    <input
                      type="file"
                      accept={proofType === 'image' ? 'image/*' : 'video/*'}
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-[#00bfff] font-mono text-sm mb-1">
                        Click to upload {proofType}
                      </div>
                      <div className="text-[#00bfff]/60 text-xs">
                        {proofType === 'image' ? 'JPG, PNG, GIF up to 10MB' : 'MP4, MOV up to 50MB'}
                      </div>
                    </label>
                    {proofData && (
                      <div className="mt-3 p-2 bg-[#7fff00]/10 border border-[#7fff00]/20 rounded text-[#7fff00] text-sm">
                        ✓ {proofData}
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type={proofType === 'link' ? 'url' : 'text'}
                    value={proofData}
                    onChange={(e) => setProofData(e.target.value)}
                    placeholder={
                      proofType === 'link' 
                        ? 'https://example.com/your-work' 
                        : 'Describe your completed task...'
                    }
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                      "text-[#ffffff] placeholder-[#00bfff]/40",
                      "border-[#00bfff]/20 focus:border-[#00bfff]",
                      "focus:outline-none focus:ring-0",
                      "transition-all duration-200"
                    )}
                    required
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#00bfff] text-sm font-mono mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain how you completed this quest and what you learned..."
                  rows={3}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-[#0a0a0a]/50",
                    "text-[#ffffff] placeholder-[#00bfff]/40",
                    "border-[#00bfff]/20 focus:border-[#00bfff]",
                    "focus:outline-none focus:ring-0",
                    "transition-all duration-200 resize-none"
                  )}
                  required
                />
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#ff69b4]/10 border border-[#ff69b4]/20">
                  <AlertCircle className="w-4 h-4 text-[#ff69b4]" />
                  <span className="text-[#ff69b4] text-sm">{error}</span>
                </div>
              )}
            </form>

            {/* Submit Buttons - Fixed at bottom */}
            <div className="p-6 border-t border-[#00bfff]/10 bg-gradient-to-r from-[#0a0a0a]/95 to-[#1a1a2e]/95 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 rounded-lg border border-[#00bfff]/20 text-[#00bfff]/60 hover:text-[#00bfff] hover:bg-[#00bfff]/10 transition-all font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={cn(
                    "flex-1 px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-wider",
                    "transition-all duration-200",
                    isSubmitting
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
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Submit Verification</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'skill': return '#00bfff'
    case 'health': return '#7fff00'
    case 'career': return '#ffd700'
    case 'creativity': return '#8a2be2'
    case 'finance': return '#ff69b4'
    default: return '#00bfff'
  }
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return '#7fff00'
    case 'medium': return '#ffd700'
    case 'hard': return '#ff69b4'
    default: return '#ffd700'
  }
} 