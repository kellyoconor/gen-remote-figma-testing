import { motion } from 'motion/react';
import { RemoteMode } from '../App';

interface AnimatedBackgroundProps {
  mode: RemoteMode;
}

const modeBackgrounds = {
  tv: {
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    description: 'Cinematic Deep Blue',
  },
  sports: {
    primary: '#064e3b',
    secondary: '#10b981',
    accent: '#34d399',
    description: 'Energetic Green',
  },
  music: {
    primary: '#581c87',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    description: 'Vibrant Purple',
  },
  game: {
    primary: '#78350f',
    secondary: '#f59e0b',
    accent: '#fbbf24',
    description: 'Electric Amber',
  },
  'smart-home': {
    primary: '#164e63',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    description: 'Tech Cyan',
  },
};

export function AnimatedBackground({ mode }: AnimatedBackgroundProps) {
  const colors = modeBackgrounds[mode];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at 20% 30%, ${colors.primary}80, transparent 50%), 
                       radial-gradient(circle at 80% 70%, ${colors.secondary}60, transparent 50%),
                       radial-gradient(circle at 50% 50%, ${colors.accent}30, transparent 70%)`,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Animated mesh blobs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: colors.primary }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute right-0 bottom-0 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{ background: colors.secondary }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: colors.accent }}
        animate={{
          x: [-50, 50, -50],
          y: [-50, 50, -50],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
