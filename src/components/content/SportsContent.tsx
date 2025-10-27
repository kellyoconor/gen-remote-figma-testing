import { motion } from 'motion/react';
import { Users, RotateCcw, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { TiltCard } from '../TiltCard';
import { AISuggestions } from '../AISuggestions';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function SportsContent() {
  return (
    <div className="space-y-6">
      {/* LIVE SCORE - Prominent at Top */}
      <TiltCard intensity={8}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden backdrop-blur-md border"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.08))',
            borderColor: 'rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Background Action Image */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1705594858888-90d164689257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwZ2FtZSUyMGFjdGlvbnxlbnwxfHx8fDE3NjEyNDc2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Basketball Game"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/90" />
          </motion.div>

          <div className="relative z-10 p-6">
            {/* Live Indicator & Time */}
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-red-400">LIVE</span>
              </motion.div>
              <motion.div 
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <span className="text-xs text-slate-300">Q3 • 8:42</span>
              </motion.div>
            </motion.div>

            {/* Score Display - Extra Large */}
            <div className="grid grid-cols-3 gap-6 items-center mb-4">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                <p className="text-sm text-slate-300 mb-2 font-light tracking-wide">Lakers</p>
                <motion.p 
                  className="text-5xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  94
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="flex justify-center"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-emerald-400/60 to-transparent" />
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                <p className="text-sm text-slate-300 mb-2 font-light tracking-wide">Warriors</p>
                <motion.p 
                  className="text-5xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  89
                </motion.p>
              </motion.div>
            </div>

            {/* Expanded Stats Bar */}
            <motion.div 
              className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              {[
                { label: 'FG%', value: '48.2' },
                { label: '3PT%', value: '41.7' },
                { label: 'REB', value: '+8' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.1, duration: 0.4 }}
                >
                  <p className="text-xs text-slate-500 font-light tracking-widest uppercase">{stat.label}</p>
                  <p className="text-sm text-emerald-400 font-medium">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </TiltCard>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <AISuggestions mode="sports" />
      </motion.div>

      {/* Top Performers Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-light">Top Performers</p>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'L. James', points: '28', stats: 'PTS • 7 REB • 9 AST', color: 'emerald' },
            { name: 'S. Curry', points: '31', stats: 'PTS • 6 3PT • 5 AST', color: 'blue' },
          ].map((player, i) => (
            <motion.div 
              key={player.name}
              className={`rounded-xl bg-gradient-to-br from-${player.color}-500/10 to-${player.color}-600/5 backdrop-blur-sm border border-${player.color}-500/20 p-4`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 + i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-xs text-slate-400 mb-2 font-light tracking-wide">{player.name}</p>
              <p className="text-3xl font-bold mb-1">{player.points}</p>
              <p className={`text-xs text-${player.color}-400 font-light tracking-wide`}>{player.stats}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Thumb-Reach Controls at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="space-y-3 pt-2"
      >
        <p className="text-xs text-slate-400 uppercase tracking-widest font-light">Live Actions</p>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.1, duration: 0.5 }}
        >
          <Button
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/30 hover:bg-emerald-500/30 justify-start h-16"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-3 text-emerald-400" />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-emerald-300">Instant Replay</p>
              <p className="text-xs text-slate-500 font-light tracking-wide">Last 30 seconds</p>
            </div>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <Button
            className="w-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 justify-start h-16"
          >
            <Users className="w-5 h-5 mr-3 text-emerald-400" />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">Watch with Friends</p>
              <p className="text-xs text-emerald-400 italic font-light">3 online now</p>
            </div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
