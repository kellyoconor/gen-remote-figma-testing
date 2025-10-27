import { motion } from 'motion/react';
import { Tv, Music, Gamepad2, Home, Trophy } from 'lucide-react';

type RemoteMode = 'tv' | 'sports' | 'music' | 'game' | 'smart-home' | null;

interface ControlOrbProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  currentMode: RemoteMode;
}

const modeColors = {
  tv: '#3b82f6',
  sports: '#10b981',
  music: '#8b5cf6',
  game: '#f59e0b',
  'smart-home': '#06b6d4',
};

const modeIcons = {
  tv: Tv,
  sports: Trophy,
  music: Music,
  game: Gamepad2,
  'smart-home': Home,
};

export function ControlOrb({ isExpanded, setIsExpanded, currentMode }: ControlOrbProps) {
  if (!currentMode) return null;

  const Icon = modeIcons[currentMode];
  const color = modeColors[currentMode];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      className="absolute bottom-6 right-6 z-40"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-16 h-16 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}20)`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            `0 0 20px ${color}40`,
            `0 0 40px ${color}60`,
            `0 0 20px ${color}40`,
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${color}60, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center h-full"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="w-7 h-7" style={{ color }} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
