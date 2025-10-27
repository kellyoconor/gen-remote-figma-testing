import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { RemoteMode } from '../App';
import { Slider } from './ui/slider';

interface PersistentControlsProps {
  mode: RemoteMode;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
}

const modeColors = {
  tv: '#3b82f6',
  sports: '#10b981',
  music: '#8b5cf6',
  game: '#f59e0b',
  'smart-home': '#06b6d4',
};

export function PersistentControls({ mode, isPlaying, setIsPlaying, volume, setVolume }: PersistentControlsProps) {
  const color = modeColors[mode];

  return (
    <motion.div
      layout
      className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl border-t border-white/10 p-4 space-y-3"
      style={{
        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85))',
      }}
    >
      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4" style={{ color }} />
        <Slider
          value={[volume]}
          onValueChange={([v]) => setVolume(v)}
          max={100}
          className="flex-1"
        />
        <span className="text-xs text-slate-400 w-8 text-right">{volume}</span>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-4">
        <motion.button
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <SkipBack className="w-4 h-4 text-white/80" />
        </motion.button>

        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-14 h-14 rounded-full border shadow-lg flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            borderColor: `${color}40`,
            boxShadow: `0 0 20px ${color}40`,
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" fill="white" />
          ) : (
            <Play className="w-6 h-6 ml-1 text-white" fill="white" />
          )}
        </motion.button>

        <motion.button
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <SkipForward className="w-4 h-4 text-white/80" />
        </motion.button>
      </div>

      {/* Mode Indicator */}
      <div className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border"
          style={{
            background: `${color}10`,
            borderColor: `${color}30`,
            color,
          }}
          layout
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span>Remote-First Core Active</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
