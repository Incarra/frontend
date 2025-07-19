import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Deterministic random function for SSR-safe random values
export function seededRandom(seed: string, index: number): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Add index to create variation
  hash = ((hash << 5) - hash) + index
  hash = hash & hash
  
  // Convert to 0-1 range
  return Math.abs(hash) / 2147483647
}

// Cosmic design constants
export const cosmicGradients = {
  solar: "bg-gradient-to-r from-[#ffd700] via-[#ff8c00] to-[#ff4500]",
  nebula: "bg-gradient-to-r from-[#00bfff] via-[#8a2be2] to-[#ff69b4]",
  aurora: "bg-gradient-to-r from-[#7fff00] via-[#00ff7f] to-[#00bfff]",
  cosmic: "bg-gradient-to-r from-[#ff69b4] via-[#8a2be2] to-[#00bfff]",
  stellar: "bg-gradient-to-r from-[#ffd700] via-[#ff8c00] to-[#ff4500]",
  void: "bg-gradient-to-r from-[#2a2a3e] via-[#1a1a2e] to-[#0a0a0a]"
}

export const cosmicBorders = {
  glow: "border border-[#00bfff]/20 shadow-[0_0_20px_rgba(0,191,255,0.1)]",
  drift: "border border-[#7fff00]/20 shadow-[0_0_20px_rgba(127,255,0,0.1)]",
  pulse: "border border-[#ff69b4]/20 shadow-[0_0_20px_rgba(255,105,180,0.1)]",
  solar: "border border-[#ffd700]/20 shadow-[0_0_20px_rgba(255,215,0,0.1)]"
}

// Cosmic color palette
export const cosmicColors = {
  primary: {
    blue: '#00bfff',
    green: '#7fff00',
    pink: '#ff69b4',
    gold: '#ffd700',
    orange: '#ff8c00',
    purple: '#8a2be2'
  },
  background: {
    dark: '#0f0f23',
    medium: '#1a1a2e',
    light: '#2a2a3e',
    void: '#0a0a0a'
  },
  text: {
    primary: '#ffd700',
    secondary: '#00bfff',
    accent: '#7fff00',
    muted: '#00bfff/60'
  }
}

// Animation presets
export const cosmicAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  },
  glow: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(0,191,255,0.3)",
        "0 0 40px rgba(0,191,255,0.5)",
        "0 0 20px rgba(0,191,255,0.3)"
      ]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Avatar evolution stages
export const avatarStages = {
  seed: 'stellar-seed',
  core: 'stellar-core', 
  fractal: 'fractal-star',
  constellation: 'living-constellation',
  incarnate: 'incarnate-alignment',
} as const

// Procedural avatar generation helpers
export function generateAvatarSeed(userId: string): string {
  const hash = userId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return Math.abs(hash).toString(36)
}

export function getAvatarColors(seed: string) {
  const colors = [
    'var(--starlight-gold)',
    'var(--plasma-pink)', 
    'var(--celestial-blue)',
    'var(--electric-violet)',
    'var(--aurora-green)',
    'var(--radiant-cobalt)'
  ]
  const index = parseInt(seed, 36) % colors.length
  return colors[index]
} 