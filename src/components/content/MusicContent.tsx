import { motion } from 'motion/react';
import { Heart, Radio, Shuffle, Repeat } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { TiltCard } from '../TiltCard';
import { AISuggestions } from '../AISuggestions';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MusicContentProps {
  volume: number;
  setVolume: (value: number) => void;
}

export function MusicContent({ volume, setVolume }: MusicContentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [multiRoom, setMultiRoom] = useState(false);

  const handleVolumeDialClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    const angle = Math.atan2(y, x);
    const degrees = (angle * 180) / Math.PI + 90;
    const normalizedDegrees = (degrees + 360) % 360;
    const newVolume = Math.round((normalizedDegrees / 360) * 100);
    setVolume(newVolume);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* AI Suggestions */}
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <AISuggestions mode="music" />
      </motion.div>

      {/* Dominant Album Art - Front and Center */}
      <TiltCard intensity={12}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            boxShadow: '0 30px 80px rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          <motion.div
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1552267094-b4c3771bd5e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGUlMjB3ZWVrbmQlMjBhbGJ1bXxlbnwxfHx8fDE3NjEyNDc2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Album Art - Blinding Lights"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
            animate={{
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Like Button on Album */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Heart 
              className="w-5 h-5 text-white"
              fill={isLiked ? '#ffffff' : 'none'}
            />
          </motion.button>
        </motion.div>
      </TiltCard>

      {/* Song Info - Elegant Typography */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center space-y-1 w-full"
      >
        <h3 className="text-2xl font-bold">Blinding Lights</h3>
        <p className="text-sm text-slate-400 font-light tracking-wide">The Weeknd • After Hours</p>
      </motion.div>

      {/* Enhanced Circular Volume Dial */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-48 h-48 flex items-center justify-center"
      >
        {/* Background circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle
            cx="96"
            cy="96"
            r="75"
            fill="none"
            stroke="rgba(139, 92, 246, 0.1)"
            strokeWidth="12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          />
          <motion.circle
            cx="96"
            cy="96"
            r="75"
            fill="none"
            stroke="url(#volumeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 471' }}
            animate={{ strokeDasharray: `${(volume / 100) * 471} 471` }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="volumeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Interactive dial */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 15 }}
          onClick={handleVolumeDialClick}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 cursor-pointer flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <p className="text-4xl font-bold">{volume}</p>
            <p className="text-xs text-purple-400 font-light tracking-widest uppercase">Volume</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quick Actions - Refined Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="w-full grid grid-cols-4 gap-3"
      >
        {[
          { icon: Shuffle, label: 'Shuffle', onClick: () => {} },
          { icon: Heart, label: 'Like', onClick: () => setIsLiked(!isLiked), fill: isLiked },
          { icon: Repeat, label: 'Repeat', onClick: () => {} },
          { icon: Radio, label: 'Radio', onClick: () => {} },
        ].map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + i * 0.1, duration: 0.4 }}
            onClick={action.onClick}
            className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <action.icon 
              className="w-4 h-4 text-purple-400"
              fill={action.fill ? '#a855f7' : 'none'}
            />
            <span className="text-xs text-slate-400 font-light tracking-wide">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Multi-room Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="w-full rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-purple-400" />
            <div>
              <p className="text-sm font-medium">Multi-room Audio</p>
              <p className="text-xs text-slate-400 italic font-light">Sync across devices</p>
            </div>
          </div>
          <Switch checked={multiRoom} onCheckedChange={setMultiRoom} />
        </div>
      </motion.div>
    </div>
  );
}
