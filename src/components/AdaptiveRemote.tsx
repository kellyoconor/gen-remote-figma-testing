import { motion, AnimatePresence } from 'motion/react';
import { RemoteMode } from '../App';
import { TVContent } from './content/TVContent';
import { SportsContent } from './content/SportsContent';
import { MusicContent } from './content/MusicContent';
import { GameContent } from './content/GameContent';
import { PersistentOrb } from './PersistentOrb';
import { MeshBackground } from './MeshBackground';
import { AppHeader } from './AppHeader';

interface AdaptiveRemoteProps {
  mode: RemoteMode;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
  onVoiceActivate?: () => void;
  onModeChange?: (mode: RemoteMode) => void;
}

export function AdaptiveRemote({ mode, isPlaying, setIsPlaying, volume, setVolume, onVoiceActivate, onModeChange }: AdaptiveRemoteProps) {
  return (
    <div className="h-full flex flex-col relative overflow-x-hidden">
      {/* Animated Mesh Background */}
      <MeshBackground mode={mode} />
      
      {/* App Header with Settings */}
      <AppHeader currentMode={mode} onModeChange={onModeChange} />
      
      {/* Adaptive Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 pt-20 pb-20 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
                when: "beforeChildren",
                staggerChildren: 0.03
              }
            }}
            exit={{ 
              opacity: 0, 
              x: -20, 
              scale: 0.98,
              transition: {
                duration: 0.3,
                ease: "easeIn"
              }
            }}
            className="h-full"
          >
            {mode === 'tv' && <TVContent />}
            {mode === 'sports' && <SportsContent />}
            {mode === 'music' && <MusicContent volume={volume} setVolume={setVolume} />}
            {mode === 'game' && <GameContent />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent Orb */}
      <PersistentOrb 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        currentMode={mode}
        onVoiceActivate={onVoiceActivate}
      />
    </div>
  );
}
