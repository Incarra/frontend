'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { StellarAvatar } from './StellarAvatar'
import { cn, cosmicBorders, cosmicGradients, seededRandom } from '@/lib/utils'
import { Users, Star, Zap, MessageCircle, Share2 } from 'lucide-react'

interface ConstellationNode {
  id: string
  name: string
  stage: string
  avatarSeed: string
  connections: string[]
  energy: number
  lastActive: string
  specialty?: string
}

interface ConstellationViewProps {
  nodes: ConstellationNode[]
  currentUserId: string
}

export function ConstellationView({ nodes, currentUserId }: ConstellationViewProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState('all') // 'all' | 'connections' | 'nearby'

  // Calculate positions for constellation layout
  const calculatePositions = (nodes: ConstellationNode[]) => {
    const centerX = 400
    const centerY = 300
    const radius = 200
    
    return nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      return {
        ...node,
        x,
        y,
        angle
      }
    })
  }

  const positionedNodes = calculatePositions(nodes)

  // Draw connection lines
  const drawConnections = () => {
    const connections: Array<{ from: string; to: string; strength: number }> = []
    
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        if (!connections.find(c => 
          (c.from === node.id && c.to === connectionId) || 
          (c.from === connectionId && c.to === node.id)
        )) {
          connections.push({
            from: node.id,
            to: connectionId,
            strength: seededRandom(currentUserId + node.id + connectionId, connections.length) * 0.5 + 0.5
          })
        }
      })
    })
    
    return connections
  }

  const connections = drawConnections()

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
      
      {/* Nebula Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#ff69b4]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-[#00bfff]/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
            AI NETWORK
          </h1>
          <p className="text-[#00bfff] font-light mb-4">
            Your connected AI companions and their relationships
          </p>
          
          {/* View Controls */}
          <div className="flex justify-center space-x-4">
            {['all', 'connections', 'nearby'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-4 py-2 rounded-lg font-mono text-sm transition-all",
                  viewMode === mode 
                    ? "bg-[#00bfff]/20 text-[#00bfff] border border-[#00bfff]/30" 
                    : "text-[#00bfff]/60 hover:text-[#00bfff] hover:bg-[#00bfff]/10"
                )}
              >
                {mode === 'all' && 'ALL AGENTS'}
                {mode === 'connections' && 'CONNECTIONS'}
                {mode === 'nearby' && 'NEARBY'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Constellation Canvas */}
        <div className="relative w-full h-[600px] bg-[#0a0a0a]/50 rounded-2xl border border-[#00bfff]/20 overflow-hidden">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map((connection, index) => {
              const fromNode = positionedNodes.find(n => n.id === connection.from)
              const toNode = positionedNodes.find(n => n.id === connection.to)
              
              if (!fromNode || !toNode) return null
              
              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth={connection.strength * 2}
                  opacity={0.3}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              )
            })}
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00bfff" />
                <stop offset="50%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
            </defs>
          </svg>

          {/* Constellation Nodes */}
          {positionedNodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute"
              style={{ left: node.x - 24, top: node.y - 24 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              <StellarAvatar
                userId={node.avatarSeed}
                stage={node.stage as any}
                size="md"
                isInteractive={true}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedNode === node.id && "ring-2 ring-[#ffd700] ring-offset-2 ring-offset-[#0a0a0a]"
                )}
              />
              
              {/* Node Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-xs font-mono text-[#ffd700] whitespace-nowrap">
                  {node.name}
                </p>
                <div className="w-full h-1 bg-[#1a1a2e] rounded-full mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00bfff] to-[#7fff00] rounded-full"
                    style={{ width: `${node.energy}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Node Details Panel */}
        {selectedNode && (
          <motion.div
            className="mt-8 p-6 rounded-2xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn("mt-8 p-6 rounded-2xl border", cosmicBorders.glow)}
          >
            {(() => {
              const node = nodes.find(n => n.id === selectedNode)
              if (!node) return null
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center">
                    <StellarAvatar
                      userId={node.avatarSeed}
                      stage={node.stage as any}
                      size="lg"
                      isInteractive={false}
                      className="mb-4"
                    />
                    <h3 className="text-xl font-mono text-[#ffd700] mb-2">
                      {node.name}
                    </h3>
                    <p className="text-[#00bfff] text-sm font-mono uppercase">
                      {node.stage === 'seed' && 'Digital Seed'}
                      {node.stage === 'core' && 'Smart Core'}
                      {node.stage === 'fractal' && 'Growing Mind'}
                      {node.stage === 'constellation' && 'Network Mind'}
                      {node.stage === 'incarnate' && 'Full Intelligence'}
                    </p>
                  </div>

                  {/* Stats Section */}
                  <div className="space-y-4">
                    <h4 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider">
                      Status
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[#00bfff]/80 text-sm">Processing Power</span>
                        <span className="text-[#ffd700] font-mono">{node.energy}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[#00bfff]/80 text-sm">Connections</span>
                        <span className="text-[#ffd700] font-mono">{node.connections.length}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[#00bfff]/80 text-sm">Last Active</span>
                        <span className="text-[#ffd700] font-mono text-xs">{node.lastActive}</span>
                      </div>
                      
                      {node.specialty && (
                        <div className="flex justify-between items-center">
                          <span className="text-[#00bfff]/80 text-sm">Specialty</span>
                          <span className="text-[#ffd700] font-mono text-xs">{node.specialty}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="space-y-4">
                    <h4 className="text-[#ffd700] font-mono text-sm uppercase tracking-wider">
                      Actions
                    </h4>
                    
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#00bfff]/10 text-[#00bfff] hover:bg-[#00bfff]/20 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">Send Message</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#7fff00]/10 text-[#7fff00] hover:bg-[#7fff00]/20 transition-colors">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm">Share Data</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#ff69b4]/10 text-[#ff69b4] hover:bg-[#ff69b4]/20 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Collaborate</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </div>
    </div>
  )
} 