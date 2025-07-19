import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Incarra - Cosmic AI Agent System',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
  ],
  ssr: true,
})

// Cosmic theme configuration for RainbowKit
export const cosmicTheme = {
  blurs: {
    modalOverlay: 'blur(20px)',
  },
  colors: {
    accentColor: '#ffd700',
    accentColorForeground: '#0a0a0a',
    connectButtonBackground: 'linear-gradient(135deg, #00bfff, #8a2be2)',
    connectButtonText: '#ffffff',
    modalBackground: 'linear-gradient(135deg, #1a1a2e, #0f0f23)',
    modalText: '#ffffff',
    modalTextSecondary: '#00bfff',
    generalBorder: 'rgba(0, 191, 255, 0.2)',
    error: '#ff69b4',
    modalBackdrop: 'rgba(10, 10, 10, 0.8)',
  },
  fonts: {
    body: 'Space Grotesk, system-ui, sans-serif',
  },
  radii: {
    connectButton: '12px',
    modal: '24px',
  },
  shadows: {
    connectButton: '0 0 20px rgba(0, 191, 255, 0.3)',
    dialog: '0 0 30px rgba(0, 191, 255, 0.2)',
  },
} 