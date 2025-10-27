import { motion } from 'motion/react';
import { Play, Volume2, Subtitles, Pause, Cast, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { AISuggestions } from '../AISuggestions';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TVContent() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="space-y-6">
      {/* Cinematic Hero - Large Poster with Ambient Gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative -mx-6 rounded-3xl overflow-hidden h-80"
      >
        {/* Full Poster Background */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1579353174740-9e4e39428d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhbmdlciUyMHRoaW5ncyUyMHBvc3RlcnxlbnwxfHx8fDE3NjEyNDc2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Stranger Things"
            className="w-full h-full object-cover"
          />
          
          {/* Ambient Gradient Overlay - Film Palette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(15, 23, 42, 0.7) 70%, rgba(15, 23, 42, 0.95) 100%)',
            }}
          />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          {/* Show Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-4"
          >
            <h2 className="text-3xl font-bold mb-1.5">Stranger Things</h2>
            <p className="text-sm font-medium text-slate-300">S4 E8 • "Papa"</p>
            <p className="text-xs text-slate-400 mt-1 tracking-wide font-light">Drama • Sci-Fi • 1h 25m</p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-4"
          >
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '45%' }}
                transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <motion.div 
              className="flex justify-between text-xs text-slate-400 mt-1 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span>38:24</span>
              <span>46m remaining</span>
            </motion.div>
          </motion.div>

          {/* Floating Control Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl backdrop-blur-xl border border-white/20 p-3"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center justify-between gap-3">
              {/* Play/Pause */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 15 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400/50 flex items-center justify-center shadow-lg shadow-blue-500/30"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" fill="white" />
                ) : (
                  <Play className="w-5 h-5 text-white" fill="white" />
                )}
              </motion.button>

              {/* Volume */}
              <motion.div 
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <Volume2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '75%' }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  />
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 w-6">75</span>
              </motion.div>

              {/* Subtitles */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 200, damping: 15 }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Subtitles className="w-4 h-4 text-blue-400" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <AISuggestions mode="tv" />
      </motion.div>

      {/* Context Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="space-y-3"
      >
        <p className="text-xs text-slate-400 uppercase tracking-widest font-light">Quick Actions</p>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          <Button
            className="w-full rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 hover:bg-blue-500/20 justify-start"
            size="lg"
          >
            <Clock className="w-4 h-4 mr-3 text-blue-400" />
            <p className="text-sm font-medium text-blue-300">Skip Intro</p>
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 0.4 }}
          >
            <Button
              variant="ghost"
              className="flex flex-col gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 w-full"
            >
              <Subtitles className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-light tracking-wide">Captions</span>
              <span className="text-xs text-emerald-400 font-medium">On</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
          >
            <Button
              variant="ghost"
              className="flex flex-col gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 w-full"
            >
              <Cast className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-light tracking-wide">Cast</span>
              <span className="text-xs text-slate-500 font-light">Living Room</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Up Next */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.6 }}
        className="space-y-2"
      >
        <p className="text-xs text-slate-400 uppercase tracking-widest font-light">Up Next</p>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
          <div className="w-16 h-10 rounded overflow-hidden flex-shrink-0 relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1662338035221-8c94f599f410?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwc2VyaWVzJTIwdGh1bWJuYWlsfGVufDF8fHx8MTc2MTI0NzY4OXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Next Episode"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">S4 E9 • "The Piggyback"</p>
            <p className="text-xs text-slate-500 font-light tracking-wide">2h 19m</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
