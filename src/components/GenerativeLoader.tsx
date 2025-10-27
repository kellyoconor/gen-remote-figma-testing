import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { RemoteMode } from '../App';

interface GenerativeLoaderProps {
  mode: RemoteMode;
}

const modeLabels: Record<RemoteMode, string> = {
  tv: 'TV Remote',
  sports: 'Sports Hub',
  music: 'Music Player',
  game: 'Game Controller',
};

// Mode-specific generation messages for enhanced contextual feel
const modeMessages: Record<RemoteMode, string[]> = {
  tv: [
    'Analyzing viewing history',
    'Optimizing playback settings',
    'Loading your watchlist',
    'Syncing streaming services',
    'Preparing recommendations',
    'Configuring display',
  ],
  sports: [
    'Checking live games',
    'Loading team statistics',
    'Preparing live scores',
    'Syncing favorite teams',
    'Loading match schedules',
    'Connecting to sports feeds',
  ],
  music: [
    'Curating your playlist',
    'Tuning audio settings',
    'Loading your library',
    'Syncing across devices',
    'Analyzing listening habits',
    'Preparing recommendations',
  ],
  game: [
    'Loading game library',
    'Connecting to friends',
    'Optimizing performance',
    'Syncing achievements',
    'Preparing controller',
    'Loading saved games',
  ],
};

export function GenerativeLoader({ mode }: GenerativeLoaderProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messages = modeMessages[mode];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 800); // Change message every 800ms for better readability

    return () => clearInterval(interval);
  }, [messages.length]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ height: '100vh', width: '100vw' }}>
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgb(59, 130, 246)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Expanding Circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-blue-500/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2, 3],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Centered Content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        {/* Center Orb */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_60px_rgba(59,130,246,0.6)]">
            {/* Spinning gradient overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Generating Text */}
        <motion.div
          className="mt-8 space-y-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-slate-300 h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm"
              >
                {messages[currentMessageIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {modeLabels[mode]}
          </motion.div>
        </motion.div>

        {/* Loading Dots */}
        <div className="flex gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Particle Effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [-20, -60]
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 1.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
