import { motion } from 'motion/react';
import { Users, RotateCcw, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { useState } from 'react';

export function SportsMode() {
  const [replayPosition, setReplayPosition] = useState([50]);

  return (
    <div className="space-y-6">
      {/* Live Score Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden backdrop-blur-md border border-emerald-500/20 p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05))',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-red-400">LIVE</span>
          </div>
          <span className="text-xs text-slate-400">Q3 • 8:42</span>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-center">
            <p className="text-sm text-slate-400 mb-1">Lakers</p>
            <p className="text-3xl">94</p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400 mb-1">Warriors</p>
            <p className="text-3xl">89</p>
          </div>
        </div>
      </motion.div>

      {/* Replay Scrubber */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Instant Replay</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20"
          >
            <RotateCcw className="w-3 h-3 mr-2 text-emerald-400" />
            <span className="text-xs text-emerald-400">Replay</span>
          </Button>
        </div>
        
        <Slider
          value={replayPosition}
          onValueChange={setReplayPosition}
          max={100}
          className="w-full"
        />

        <div className="flex gap-2">
          <div className="flex-1 h-1 rounded-full bg-emerald-500/30" />
          <div className="flex-1 h-1 rounded-full bg-emerald-500/60" />
          <div className="flex-1 h-1 rounded-full bg-emerald-500/30" />
          <div className="flex-1 h-1 rounded-full bg-emerald-500/30" />
        </div>
      </motion.div>

      {/* Watch with Friends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          className="w-full rounded-xl bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 hover:bg-emerald-500/20"
          size="lg"
        >
          <Users className="w-5 h-5 mr-2 text-emerald-400" />
          <span className="text-emerald-400">Watch with Friends (3 online)</span>
        </Button>
      </motion.div>

      {/* Player Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400">Top Performers</span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3">
            <p className="text-xs text-slate-500 mb-1">L. James</p>
            <p className="text-xl mb-1">28</p>
            <p className="text-xs text-emerald-400">PTS</p>
          </div>

          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3">
            <p className="text-xs text-slate-500 mb-1">S. Curry</p>
            <p className="text-xl mb-1">31</p>
            <p className="text-xs text-emerald-400">PTS</p>
          </div>

          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3">
            <p className="text-xs text-slate-500 mb-1">A. Davis</p>
            <p className="text-xl mb-1">12</p>
            <p className="text-xs text-emerald-400">REB</p>
          </div>

          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3">
            <p className="text-xs text-slate-500 mb-1">D. Green</p>
            <p className="text-xl mb-1">9</p>
            <p className="text-xs text-emerald-400">AST</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
