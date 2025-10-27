import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { TVMode } from './modes/TVMode';
import { SportsMode } from './modes/SportsMode';
import { MusicMode } from './modes/MusicMode';
import { GameMode } from './modes/GameMode';
import { SmartHomeMode } from './modes/SmartHomeMode';

type RemoteMode = 'tv' | 'sports' | 'music' | 'game' | 'smart-home' | null;

interface RemoteInterfaceProps {
  mode: RemoteMode;
  onClose: () => void;
}

export function RemoteInterface({ mode, onClose }: RemoteInterfaceProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute inset-4 rounded-3xl backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85))',
        }}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4 text-white/80" />
        </motion.button>

        {/* Mode content */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full overflow-y-auto p-6"
        >
          {mode === 'tv' && <TVMode />}
          {mode === 'sports' && <SportsMode />}
          {mode === 'music' && <MusicMode />}
          {mode === 'game' && <GameMode />}
          {mode === 'smart-home' && <SmartHomeMode />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
