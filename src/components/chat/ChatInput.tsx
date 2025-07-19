'use client'

import { useState, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, Mic } from 'lucide-react'
import { cn, cosmicBorders } from '@/lib/utils'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: (message: string) => void
  onMicClick: () => void
  disabled?: boolean
}

export function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  onMicClick, 
  disabled = false 
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={cn(
      "flex items-center gap-3",
      "p-3 rounded-xl border backdrop-blur-sm",
      "bg-gradient-to-r from-[#0a0a0a]/50 to-[#1a1a2e]/50",
      "border-[#00bfff]/20",
      isFocused && "border-[#00bfff]/40 shadow-[0_0_20px_rgba(0,191,255,0.1)]",
      "transition-all duration-300"
    )}>
      {/* Text Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Type your message to the cosmic AI..."
        disabled={disabled}
        className={cn(
          "flex-1 bg-transparent outline-none focus:outline-none focus-visible:outline-none",
          "text-[#ffffff] placeholder-[#00bfff]/40",
          "font-mono text-sm",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "border-none focus:border-none focus-visible:border-none"
        )}
        style={{ outline: 'none', border: 'none' }}
      />

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Mic Button */}
        <motion.button
          onClick={onMicClick}
          disabled={disabled}
          className={cn(
            "p-2 rounded-lg",
            "bg-gradient-to-r from-[#8a2be2]/20 to-[#ff69b4]/20",
            "border border-[#8a2be2]/30",
            "text-[#8a2be2] hover:text-[#ff69b4]",
            "hover:border-[#ff69b4]/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className="w-4 h-4" />
        </motion.button>

        {/* Send Button */}
        <motion.button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={cn(
            "p-2 rounded-lg",
            value.trim() && !disabled
              ? [
                  "bg-gradient-to-r from-[#00bfff] to-[#8a2be2]",
                  "text-white",
                  "shadow-[0_0_15px_rgba(0,191,255,0.3)]"
                ]
              : [
                  "bg-gradient-to-r from-[#00bfff]/20 to-[#8a2be2]/20",
                  "text-[#00bfff]/40",
                  "border border-[#00bfff]/20"
                ],
            "disabled:cursor-not-allowed",
            "transition-all duration-200"
          )}
          whileHover={value.trim() && !disabled ? { scale: 1.05 } : {}}
          whileTap={value.trim() && !disabled ? { scale: 0.95 } : {}}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
} 