import { motion } from 'motion/react';
import { Play, SkipForward, SkipBack, Heart, Radio, Shuffle, Repeat } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export function MusicMode() {
  const [volume, setVolume] = useState(65);
  const [isLiked, setIsLiked] = useState(false);
  const [multiRoom, setMultiRoom] = useState(false);

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div className="space-y-6">
      {/* Album Art */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Song Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-1"
      >
        <h3 className="text-lg">Blinding Lights</h3>
        <p className="text-sm text-slate-400">The Weeknd</p>
      </motion.div>

      {/* Circular Volume Dial */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative mx-auto w-48 h-48 flex items-center justify-center"
      >
        {/* Background circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="none"
            stroke="rgba(139, 92, 246, 0.1)"
            strokeWidth="12"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="80"
            fill="none"
            stroke="url(#volumeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 502' }}
            animate={{ strokeDasharray: `${(volume / 100) * 502} 502` }}
            transition={{ duration: 0.3 }}
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
          onClick={handleVolumeChange}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 cursor-pointer flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-center">
            <p className="text-3xl">{volume}</p>
            <p className="text-xs text-purple-400">Volume</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Playback Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-3"
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <Shuffle className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border border-purple-400/30 shadow-lg shadow-purple-500/30 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-6 h-6 ml-1" fill="white" />
        </motion.button>

        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <SkipForward className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <Repeat className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Multi-room & Like */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <Radio className="w-4 h-4 text-purple-400" />
            <Switch checked={multiRoom} onCheckedChange={setMultiRoom} />
          </div>
          <p className="text-xs text-slate-400">Multi-room</p>
        </div>

        <motion.button
          onClick={() => setIsLiked(!isLiked)}
          className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-left hover:bg-white/10 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Heart
            className="w-4 h-4 mb-2 text-purple-400"
            fill={isLiked ? '#a855f7' : 'none'}
          />
          <p className="text-xs text-slate-400">Like</p>
        </motion.button>
      </motion.div>
    </div>
  );
}
