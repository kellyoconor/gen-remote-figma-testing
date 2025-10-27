import { motion } from 'motion/react';
import { Play, SkipForward, SkipBack, Pause, Volume2, Cast, Subtitles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

export function TVMode() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState([45]);

  return (
    <div className="space-y-6">
      {/* Show Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
        }}
      >
        <div className="flex gap-4">
          <div className="w-20 h-28 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/20 flex items-center justify-center">
            <Cast className="w-8 h-8 text-blue-400/60" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1">Stranger Things</h3>
            <p className="text-sm text-slate-400 mb-2">S4 E8 • "Papa"</p>
            <p className="text-xs text-slate-500">Drama • Sci-Fi • 1h 25m</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <Slider
          value={progress}
          onValueChange={setProgress}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>38:24</span>
          <span>1:25:00</span>
        </div>
      </motion.div>

      {/* Playback Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-4"
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <SkipBack className="w-5 h-5" />
        </Button>

        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400/30 shadow-lg shadow-blue-500/30 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7" fill="white" />
          ) : (
            <Play className="w-7 h-7 ml-1" fill="white" />
          )}
        </motion.button>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Skip Intro Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          className="w-full rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15"
          size="lg"
        >
          Skip Intro
        </Button>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-3"
      >
        <Button
          variant="ghost"
          className="flex flex-col gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <Subtitles className="w-5 h-5 text-blue-400" />
          <span className="text-xs">Captions</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <Volume2 className="w-5 h-5 text-blue-400" />
          <span className="text-xs">Audio</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <Cast className="w-5 h-5 text-blue-400" />
          <span className="text-xs">Cast</span>
        </Button>
      </motion.div>
    </div>
  );
}
