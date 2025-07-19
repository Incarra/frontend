'use client'

import { useEffect, useState } from 'react'

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 px-6 py-3 rounded-xl font-mono text-sm bg-[#1a1a2e]/50 border border-[#00bfff]/20 text-[#00bfff]/60">
        <div className="w-4 h-4 bg-[#00bfff]/20 rounded animate-pulse" />
        <span>Loading Wallet...</span>
      </div>
    )
  }

  return <>{children}</>
} 