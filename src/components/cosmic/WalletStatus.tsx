'use client'

import { motion } from 'framer-motion'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { cn, cosmicBorders } from '@/lib/utils'
import { Wallet, Network, Coins } from 'lucide-react'

export function WalletStatus() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balance } = useBalance({
    address,
    watch: true,
  })

  // Get chain info from chainId
  const getChainInfo = (id: number) => {
    switch (id) {
      case 1:
        return { name: 'Ethereum', iconUrl: '/ethereum.svg', iconBackground: '#627EEA' }
      case 137:
        return { name: 'Polygon', iconUrl: '/polygon.svg', iconBackground: '#8247E5' }
      case 10:
        return { name: 'Optimism', iconUrl: '/optimism.svg', iconBackground: '#FF0420' }
      case 42161:
        return { name: 'Arbitrum', iconUrl: '/arbitrum.svg', iconBackground: '#28A0F0' }
      case 8453:
        return { name: 'Base', iconUrl: '/base.svg', iconBackground: '#0052FF' }
      case 7777777:
        return { name: 'Zora', iconUrl: '/zora.svg', iconBackground: '#000000' }
      default:
        return { name: 'Unknown Network', iconUrl: '', iconBackground: '#666666' }
    }
  }

  const chainInfo = getChainInfo(chainId)

  if (!isConnected || !address) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "p-4 rounded-xl border backdrop-blur-sm",
        cosmicBorders.drift
      )}
    >
      <div className="space-y-3">
        {/* Network Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Network className="w-4 h-4 text-[#00bfff]" />
            <span className="text-[#00bfff]/80 text-xs">Network</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              style={{
                background: chainInfo.iconBackground,
                width: 16,
                height: 16,
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              {chainInfo.iconUrl && (
                <img
                  alt={chainInfo.name}
                  src={chainInfo.iconUrl}
                  style={{ width: 16, height: 16 }}
                />
              )}
            </div>
            <span className="text-[#ffd700] font-mono text-xs">
              {chainInfo.name}
            </span>
          </div>
        </div>

        {/* Balance */}
        {balance && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-[#7fff00]" />
              <span className="text-[#7fff00]/80 text-xs">Balance</span>
            </div>
            <span className="text-[#ffd700] font-mono text-xs">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </span>
          </div>
        )}

        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-[#ff69b4]" />
            <span className="text-[#ff69b4]/80 text-xs">Status</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#7fff00] animate-pulse" />
            <span className="text-[#7fff00] text-xs font-mono">Connected</span>
          </div>
        </div>

        {/* Address Preview */}
        <div className="pt-2 border-t border-[#00bfff]/10">
          <span className="text-[#00bfff]/60 text-xs">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      </div>
    </motion.div>
  )
} 