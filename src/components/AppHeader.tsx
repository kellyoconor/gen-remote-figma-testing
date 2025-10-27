import { motion } from 'motion/react';
import { ProfileMenu } from './ProfileMenu';
import { RemoteMode } from '../App';

interface AppHeaderProps {
  currentMode: RemoteMode;
  onModeChange?: (mode: RemoteMode) => void;
}

export function AppHeader({ currentMode, onModeChange }: AppHeaderProps) {
  return (
    <motion.div 
      className="absolute top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {/* Subtle frosted header region */}
      <div className="relative">
        {/* Frosted glass effect - very subtle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm" />
        
        {/* Header content */}
        <div className="relative flex items-center justify-end px-6 pt-8 pb-4">
          <ProfileMenu currentMode={currentMode} onModeChange={onModeChange} />
        </div>
      </div>
    </motion.div>
  );
}
