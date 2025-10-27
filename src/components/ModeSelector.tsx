import { motion } from 'motion/react';
import { Tv, Trophy, Music, Gamepad2 } from 'lucide-react';
import { RemoteMode } from '../App';

interface ModeSelectorProps {
  currentMode: RemoteMode;
  setCurrentMode: (mode: RemoteMode) => void;
}

const modes: { id: RemoteMode; icon: any; label: string; color: string }[] = [
  { id: 'tv', icon: Tv, label: 'TV', color: '#3b82f6' },
  { id: 'sports', icon: Trophy, label: 'Sports', color: '#10b981' },
  { id: 'music', icon: Music, label: 'Music', color: '#8b5cf6' },
  { id: 'game', icon: Gamepad2, label: 'Game', color: '#f59e0b' },
];

export function ModeSelector({ currentMode, setCurrentMode }: ModeSelectorProps) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
      <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider">Switch Context</p>
      <div className="grid grid-cols-4 gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          
          return (
            <motion.button
              key={mode.id}
              onClick={() => setCurrentMode(mode.id)}
              className="relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
              style={{
                background: isActive 
                  ? `linear-gradient(135deg, ${mode.color}20, ${mode.color}10)`
                  : 'rgba(255, 255, 255, 0.03)',
                borderColor: isActive ? `${mode.color}40` : 'rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-mode"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${mode.color}30, transparent 70%)`,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon 
                className="w-5 h-5 relative z-10" 
                style={{ color: isActive ? mode.color : '#94a3b8' }}
              />
              <span 
                className="text-xs relative z-10"
                style={{ color: isActive ? mode.color : '#94a3b8' }}
              >
                {mode.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
