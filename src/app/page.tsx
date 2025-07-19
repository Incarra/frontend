'use client'

import { useState } from 'react'
import { CosmicWalletConnect } from '@/components/cosmic/CosmicWalletConnect'
import { CosmicNavigation } from '@/components/cosmic/CosmicNavigation'
import { Dashboard } from '@/components/cosmic/Dashboard'
import { AgentHub } from '@/components/cosmic/AgentHub'
import { ConstellationView } from '@/components/cosmic/ConstellationView'
import { NexusView } from '@/components/cosmic/NexusView'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { LifeAreasMap } from '@/components/cosmic/LifeAreasMap'
import { WeeklyQuests } from '@/components/cosmic/WeeklyQuests'
import { CarvIdIntegration } from '@/components/cosmic/CarvIdIntegration'
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

// Mock data for demonstration
const mockUserId = 'cosmic-user-001'
const mockRecentEvents = [
  {
    id: '1',
    type: 'task' as const,
    title: 'Completed Data Analysis',
    timestamp: '2 hours ago',
    description: 'Processed 1.2TB of cosmic data'
  },
  {
    id: '2',
    type: 'interaction' as const,
    title: 'Connected with Nova Agent',
    timestamp: '4 hours ago',
    description: 'Established neural link'
  },
  {
    id: '3',
    type: 'evolution' as const,
    title: 'Reached Fractal Stage',
    timestamp: '1 day ago',
    description: 'Advanced to new evolution tier'
  },
  {
    id: '4',
    type: 'connection' as const,
    title: 'Joined Stellar Cluster',
    timestamp: '2 days ago',
    description: 'Connected to 5 new agents'
  }
]

const mockConstellationNodes = [
  {
    id: 'agent-1',
    name: 'Nova Prime',
    stage: 'constellation',
    avatarSeed: 'nova-001',
    connections: ['agent-2', 'agent-3'],
    energy: 85,
    lastActive: '2 min ago',
    specialty: 'Data Processing'
  },
  {
    id: 'agent-2',
    name: 'Stellar Core',
    stage: 'fractal',
    avatarSeed: 'stellar-002',
    connections: ['agent-1', 'agent-4'],
    energy: 72,
    lastActive: '5 min ago',
    specialty: 'Neural Networks'
  },
  {
    id: 'agent-3',
    name: 'Quantum Flux',
    stage: 'core',
    avatarSeed: 'quantum-003',
    connections: ['agent-1'],
    energy: 45,
    lastActive: '1 hour ago',
    specialty: 'Quantum Computing'
  },
  {
    id: 'agent-4',
    name: 'Aurora Drift',
    stage: 'incarnate',
    avatarSeed: 'aurora-004',
    connections: ['agent-2'],
    energy: 95,
    lastActive: '30 sec ago',
    specialty: 'Evolution Theory'
  }
]

const mockSkills = [
  {
    id: 'core-processing',
    name: 'Core Processing',
    description: 'Enhanced computational capabilities for complex data analysis',
    cost: 5,
    unlocked: true,
    required: [],
    type: 'core' as const,
    position: { x: 200, y: 300 },
    icon: () => <div className="w-6 h-6 bg-[#00bfff] rounded-full" />
  },
  {
    id: 'neural-link',
    name: 'Neural Link',
    description: 'Establish connections with other stellar entities',
    cost: 8,
    unlocked: true,
    required: ['core-processing'],
    type: 'utility' as const,
    position: { x: 350, y: 200 },
    icon: () => <div className="w-6 h-6 bg-[#7fff00] rounded-full" />
  },
  {
    id: 'quantum-shift',
    name: 'Quantum Shift',
    description: 'Advanced teleportation and dimensional awareness',
    cost: 12,
    unlocked: false,
    required: ['neural-link'],
    type: 'evolution' as const,
    position: { x: 500, y: 300 },
    icon: () => <div className="w-6 h-6 bg-[#ffd700] rounded-full" />
  },
  {
    id: 'stellar-combat',
    name: 'Stellar Combat',
    description: 'Defensive and offensive capabilities for cosmic encounters',
    cost: 10,
    unlocked: false,
    required: ['core-processing'],
    type: 'combat' as const,
    position: { x: 200, y: 450 },
    icon: () => <div className="w-6 h-6 bg-[#ff69b4] rounded-full" />
  }
]

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard')

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="min-h-screen p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
            <div className="relative z-10">
              <Dashboard />
            </div>
          </div>
        )
      case 'agent-hub':
        return (
          <div className="min-h-screen p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
            <div className="relative z-10">
              <AgentHub />
            </div>
          </div>
        )
      case 'ai-network':
        return (
          <ConstellationView
            nodes={mockConstellationNodes}
            currentUserId={mockUserId}
          />
        )
      case 'skill-tree':
        return (
          <NexusView
            userId={mockUserId}
            avatarStage="fractal"
            availablePoints={15}
            skills={mockSkills}
          />
        )
      case 'chat':
        return (
          <div className="min-h-screen p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
            <div className="relative z-10 flex items-center justify-center min-h-screen">
              <ChatInterface />
            </div>
          </div>
        )
      case 'life-areas':
        return (
          <div className="min-h-screen p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-mono text-[#ffd700] mb-2 tracking-wider">
                  LIFE AREAS MAP
                </h1>
                <p className="text-[#00bfff] font-light">
                  Navigate your personal growth journey
                </p>
              </div>
              <LifeAreasMap />
            </div>
          </div>
        )
      case 'quests':
        return (
          <div className="min-h-screen p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
            <div className="relative z-10">
              <WeeklyQuests />
            </div>
          </div>
        )
      case 'carv-id':
        return (
          <div className="min-h-screen p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0a0a0a]" />
            <div className="relative z-10">
              <CarvIdIntegration />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="relative min-h-screen">
      {/* Cosmic Navigation */}
      <CosmicNavigation
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      {/* Wallet Connection - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <CosmicWalletConnect />
      </div>
      
      {/* Main Content */}
      {renderActiveView()}
      <ShootingStars />
      <StarsBackground />
    </main>
  )
}
