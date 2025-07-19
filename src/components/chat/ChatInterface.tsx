'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ChatAvatar } from './ChatAvatar'
import { useIncarraContract } from '@/hooks/useIncarraContract'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Greetings, stellar traveler! I am your cosmic AI companion. How may I assist you on your journey through the digital cosmos?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [isThinking, setIsThinking] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { 
    incarraAgent, 
    recordChatInteraction, 
    loading: contractLoading, 
    error: contractError,
    hasAgent 
  } = useIncarraContract()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsThinking(true)

    // Record chat interaction on-chain if agent exists
    if (hasAgent) {
      try {
        await recordChatInteraction(content.trim())
      } catch (error) {
        console.error('Failed to record chat interaction:', error)
        // Continue with chat even if blockchain recording fails
      }
    }

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand your message: "${content}". This is a simulated response from your cosmic AI companion. In a real implementation, this would be replaced with actual AI processing.`,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsThinking(false)
    }, 2000)
  }

  const handleMicClick = () => {
    // TODO: Implement voice input functionality
    console.log('Voice input not implemented yet')
  }

  return (
    <div className={cn(
      "flex flex-col h-full max-h-[600px] w-full max-w-2xl mx-auto",
      "bg-gradient-to-br from-[#0a0a0a]/80 to-[#1a1a2e]/80",
      "backdrop-blur-sm rounded-2xl border",
      cosmicBorders.glow,
      "shadow-[0_0_30px_rgba(0,191,255,0.1)]"
    )}>
      {/* Header with AI Avatar */}
      <div className="flex items-center gap-3 p-4 border-b border-[#00bfff]/20">
        <ChatAvatar />
        <div className="flex-1">
          <h3 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider">
            Cosmic AI Agent
          </h3>
          <p className="text-[#00bfff]/60 text-xs">
            Your stellar companion
          </p>
          
          {/* Contract Status */}
          {hasAgent && (
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 bg-[#7fff00] rounded-full animate-pulse" />
              <span className="text-[#7fff00] text-xs font-mono">
                XP: {incarraAgent?.experience || 0} | Level: {incarraAgent?.level || 1}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isThinking ? "bg-[#ffd700] animate-pulse" : "bg-[#7fff00]"
          )} />
          <span className="text-[#00bfff]/60 text-xs font-mono">
            {isThinking ? 'Thinking...' : 'Online'}
          </span>
        </div>
      </div>

      {/* Contract Error Display */}
      {contractError && (
        <div className="mx-4 mt-2 p-2 rounded-lg bg-[#ff69b4]/10 border border-[#ff69b4]/20">
          <p className="text-[#ff69b4] text-xs">
            Contract Error: {contractError}
          </p>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Thinking Indicator */}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3"
          >
            <ChatAvatar size="sm" />
            <div className={cn(
              "px-4 py-3 rounded-2xl max-w-xs",
              "bg-gradient-to-r from-[#00bfff]/10 to-[#8a2be2]/10",
              "border border-[#00bfff]/20"
            )}>
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[#ffd700] text-sm font-mono">
                  Agent is thinking...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-[#00bfff]/20">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onMicClick={handleMicClick}
          disabled={isThinking || contractLoading}
        />
      </div>
    </div>
  )
} 