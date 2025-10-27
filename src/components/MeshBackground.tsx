import { motion } from 'motion/react';
import { RemoteMode } from '../App';

interface MeshBackgroundProps {
  mode: RemoteMode;
}

const modeGradients = {
  tv: {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
  },
  sports: {
    primary: '#10b981',
    secondary: '#047857',
    accent: '#34d399',
  },
  music: {
    primary: '#8b5cf6',
    secondary: '#6d28d9',
    accent: '#a78bfa',
  },
  game: {
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24',
  },
  'smart-home': {
    primary: '#06b6d4',
    secondary: '#0891b2',
    accent: '#22d3ee',
  },
};

export function MeshBackground({ mode }: MeshBackgroundProps) {
  const colors = modeGradients[mode];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        key={`orb1-${mode}`}
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{
          background: `radial-gradient(circle, ${colors.primary}, transparent)`,
        }}
        initial={{ 
          x: -100, 
          y: -100,
          opacity: 0 
        }}
        animate={{
          x: [-100, 100, -100],
          y: [-100, 50, -100],
          scale: [1, 1.2, 1],
          opacity: 0.3,
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.8, ease: 'easeInOut' },
        }}
      />
      
      <motion.div
        key={`orb2-${mode}`}
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors.secondary}, transparent)`,
          right: -100,
          top: '30%',
        }}
        initial={{ opacity: 0 }}
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
          opacity: 0.2,
        }}
        transition={{
          x: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.8, ease: 'easeInOut', delay: 0.1 },
        }}
      />

      <motion.div
        key={`orb3-${mode}`}
        className="absolute w-[350px] h-[350px] rounded-full blur-[90px] opacity-25"
        style={{
          background: `radial-gradient(circle, ${colors.accent}, transparent)`,
          left: '20%',
          bottom: -50,
        }}
        initial={{ opacity: 0 }}
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
          opacity: 0.25,
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.8, ease: 'easeInOut', delay: 0.2 },
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
