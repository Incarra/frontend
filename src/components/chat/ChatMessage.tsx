'use client'

import { motion } from 'framer-motion'
import { cn, cosmicBorders } from '@/lib/utils'
import { ChatAvatar } from './ChatAvatar'
import { Message } from './ChatInterface'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === 'ai'
  const timestamp = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <motion.div
      className={cn(
        "flex gap-3",
        isAI ? "justify-start" : "justify-end"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* AI Avatar (only for AI messages) */}
      {isAI && <ChatAvatar size="sm" />}

      {/* Message Content */}
      <div className={cn(
        "flex flex-col max-w-xs lg:max-w-md",
        isAI ? "items-start" : "items-end"
      )}>
        <div className={cn(
          "px-4 py-3 rounded-2xl",
          "backdrop-blur-sm border",
          isAI 
            ? [
                "bg-gradient-to-r from-[#00bfff]/10 to-[#8a2be2]/10",
                "border-[#00bfff]/20",
                "text-[#ffffff]"
              ]
            : [
                "bg-gradient-to-r from-[#ffd700]/10 to-[#ff69b4]/10",
                "border-[#ffd700]/20",
                "text-[#ffffff]"
              ]
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        {/* Timestamp */}
        <span className={cn(
          "text-xs mt-1 px-2",
          "text-[#00bfff]/40 font-mono"
        )}>
          {timestamp}
        </span>
      </div>

      {/* User Avatar (only for user messages) */}
      {!isAI && (
        <div className="flex items-end">
          <div className={cn(
            "w-8 h-8 rounded-full",
            "bg-gradient-to-r from-[#ffd700] to-[#ff69b4]",
            "flex items-center justify-center",
            "border-2 border-[#ffd700]/20"
          )}>
            <span className="text-[#0a0a0a] text-xs font-bold">U</span>
          </div>
        </div>
      )}
    </motion.div>
  )
} 