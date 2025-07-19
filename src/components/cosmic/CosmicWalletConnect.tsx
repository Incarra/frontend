'use client'

import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { cn, cosmicBorders } from '@/lib/utils'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'
import { useState, useRef } from 'react'
import { useDisconnect } from 'wagmi'

export function CosmicWalletConnect() {
  const [copied, setCopied] = useState(false)
  const currentAddressRef = useRef<string | undefined>()
  const { disconnect } = useDisconnect()

  const copyAddress = async () => {
    if (currentAddressRef.current) {
      await navigator.clipboard.writeText(currentAddressRef.current)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return 'Unknown Address'
    
    // Handle different address formats
    if (addr.length >= 10) {
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    } else {
      return addr // Return as-is if too short to format
    }
  }

  const openExplorer = () => {
    if (currentAddressRef.current) {
      // Handle different blockchain explorers
      if (currentAddressRef.current.length === 44) {
        // Solana address format
        window.open(`https://solscan.io/account/${currentAddressRef.current}`, '_blank')
      } else {
        // Ethereum address format (default)
        window.open(`https://etherscan.io/address/${currentAddressRef.current}`, '_blank')
      }
    }
  }

  const handleDisconnect = () => {
    try {
      console.log('Attempting to disconnect...')
      disconnect()
      currentAddressRef.current = undefined
      console.log('Disconnect called successfully')
    } catch (error) {
      console.error('Disconnect error:', error)
      // Force reload as last resort
      window.location.reload()
    }
  }

  return (
    <div className="relative">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted
          const connected = ready && account && chain

          // Update current address when account changes (simple approach)
          if (account?.address && account.address !== currentAddressRef.current) {
            currentAddressRef.current = account.address
          }

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        onClick={openConnectModal}
                        className={cn(
                          "flex items-center space-x-2 px-6 py-3 rounded-xl font-mono text-sm transition-all",
                          "bg-gradient-to-r from-[#00bfff] to-[#8a2be2] text-white",
                          "hover:from-[#00bfff]/90 hover:to-[#8a2be2]/90",
                          "shadow-[0_0_20px_rgba(0,191,255,0.3)]",
                          "border border-[#00bfff]/20"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Wallet className="w-4 h-4" />
                        <span>Connect Stellar Wallet</span>
                      </motion.button>
                    </motion.div>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <motion.button
                      onClick={openChainModal}
                      className={cn(
                        "flex items-center space-x-2 px-6 py-3 rounded-xl font-mono text-sm transition-all",
                        "bg-gradient-to-r from-[#ff69b4] to-[#ff0000] text-white",
                        "hover:from-[#ff69b4]/90 hover:to-[#ff0000]/90",
                        "shadow-[0_0_20px_rgba(255,105,180,0.3)]",
                        "border border-[#ff69b4]/20"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Wrong Network</span>
                    </motion.button>
                  )
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "p-4 rounded-xl border backdrop-blur-sm",
                      cosmicBorders.glow
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider">
                        Connected Wallet
                      </h3>
                      <motion.button
                        onClick={handleDisconnect}
                        className="text-[#ff69b4] hover:text-[#ff69b4]/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LogOut className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[#00bfff]/80 text-xs">Address</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[#ffd700] font-mono text-xs">
                            {formatAddress(account.address)}
                          </span>
                          <motion.button
                            onClick={copyAddress}
                            className="text-[#00bfff] hover:text-[#00bfff]/80 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Copy className="w-3 h-3" />
                          </motion.button>
                          <motion.button
                            onClick={openExplorer}
                            className="text-[#00bfff] hover:text-[#00bfff]/80 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>

                      {copied && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-[#7fff00] text-xs text-center"
                        >
                          Address copied to clipboard!
                        </motion.div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-[#00bfff]/80 text-xs">Network</span>
                        <div className="flex items-center space-x-2">
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          <span className="text-[#ffd700] font-mono text-xs">{chain.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#00bfff]/80 text-xs">Status</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-[#7fff00] animate-pulse" />
                          <span className="text-[#7fff00] text-xs font-mono">Connected</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </div>
  )
} 