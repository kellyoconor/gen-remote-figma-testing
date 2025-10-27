import { motion } from 'motion/react';
import { MessageSquare, Settings, Activity, Zap, Wifi, Users2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { TiltCard } from '../TiltCard';
import { AISuggestions } from '../AISuggestions';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function GameContent() {
  const [leftJoystick, setLeftJoystick] = useState({ x: 0, y: 0 });
  const [rightJoystick, setRightJoystick] = useState({ x: 0, y: 0 });

  const handleJoystickMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    side: 'left' | 'right'
  ) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.max(-35, Math.min(35, clientX - rect.left - centerX));
    const y = Math.max(-35, Math.min(35, clientY - rect.top - centerY));

    if (side === 'left') {
      setLeftJoystick({ x, y });
    } else {
      setRightJoystick({ x, y });
    }
  };

  const resetJoystick = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftJoystick({ x: 0, y: 0 });
    } else {
      setRightJoystick({ x: 0, y: 0 });
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <AISuggestions mode="game" />
      </motion.div>

      {/* Landscape-Oriented Game Card with Cover */}
      <TiltCard intensity={10}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden backdrop-blur-md border p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.08))',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            boxShadow: '0 8px 32px rgba(245, 158, 11, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex gap-4">
            {/* Game Cover - Landscape */}
            <motion.div 
              className="w-28 h-20 rounded-lg overflow-hidden border border-amber-400/20 flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1757436318222-9a75c1d46375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlbiUyMHJpbmclMjBnYW1lfGVufDF8fHx8MTc2MTE2ODYzNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Elden Ring"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Game Info */}
            <motion.div 
              className="flex-1 min-w-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h3 className="mb-1 truncate font-bold">Elden Ring</h3>
              <p className="text-xs text-slate-400 mb-2 font-light tracking-wide">Open World RPG</p>
              <p className="text-xs text-amber-400 font-medium">Leyndell, Royal Capital</p>
            </motion.div>
          </div>
        </motion.div>
      </TiltCard>

      {/* Performance Dashboard - Landscape with Latency & Friends */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="grid grid-cols-2 gap-3"
      >
        {/* Latency - Featured */}
        <motion.div 
          className="col-span-2 rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/10 backdrop-blur-sm border border-amber-500/30 p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs text-slate-400 font-light tracking-widest uppercase">Network Latency</p>
                <p className="text-3xl font-bold text-amber-400">12<span className="text-sm font-light">ms</span></p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-emerald-400 italic font-light">Optimal</p>
              <div className="flex gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-1 h-3 rounded-full bg-emerald-400"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.1 + i * 0.05, duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Stats */}
        {[
          { value: '120', label: 'FPS', color: 'amber', delay: 1.2 },
          { value: '5', label: 'Friends', color: 'green', delay: 1.3, icon: Users2 },
        ].map((stat) => (
          <motion.div 
            key={stat.label}
            className={`rounded-xl bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color === 'amber' ? 'orange' : 'emerald'}-500/5 backdrop-blur-sm border border-${stat.color}-500/20 p-3 text-center`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: stat.delay, duration: 0.4 }}
          >
            {stat.icon && <stat.icon className={`w-5 h-5 text-${stat.color}-400 mx-auto mb-1`} />}
            <p className={`${stat.icon ? 'text-lg' : 'text-2xl'} font-bold text-${stat.color}-400`}>{stat.value}</p>
            <p className="text-xs text-slate-400 font-light tracking-widest uppercase">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Friends List - Integrated */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-light">Friends Online</p>
          <Users2 className="w-4 h-4 text-amber-400" />
        </div>
        <div className="space-y-2">
          {[
            { name: 'Alex', game: 'Elden Ring', status: 'online' },
            { name: 'Jordan', game: 'Elden Ring', status: 'online' },
            { name: 'Sam', game: 'Dark Souls III', status: 'away' }
          ].map((friend, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <span className="text-sm">{friend.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{friend.name}</p>
                <p className="text-xs text-amber-400 font-light tracking-wide truncate">{friend.game}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Virtual Controller */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5"
      >
        {/* Joysticks */}
        <div className="flex justify-between items-center mb-5">
          {/* Left Joystick */}
          <motion.div
            className="relative w-24 h-24 rounded-full bg-amber-500/5 border-2 border-amber-500/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, type: 'spring', stiffness: 200, damping: 15 }}
            onMouseMove={(e) => handleJoystickMove(e, 'left')}
            onMouseLeave={() => resetJoystick('left')}
            onTouchMove={(e) => handleJoystickMove(e, 'left')}
            onTouchEnd={() => resetJoystick('left')}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-amber-400/50 shadow-lg shadow-amber-500/30"
              animate={{
                x: leftJoystick.x,
                y: leftJoystick.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.div>

          {/* Right Joystick */}
          <motion.div
            className="relative w-24 h-24 rounded-full bg-amber-500/5 border-2 border-amber-500/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, type: 'spring', stiffness: 200, damping: 15 }}
            onMouseMove={(e) => handleJoystickMove(e, 'right')}
            onMouseLeave={() => resetJoystick('right')}
            onTouchMove={(e) => handleJoystickMove(e, 'right')}
            onTouchEnd={() => resetJoystick('right')}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-amber-400/50 shadow-lg shadow-amber-500/30"
              animate={{
                x: rightJoystick.x,
                y: rightJoystick.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {['A', 'B', 'X', 'Y'].map((btn, i) => (
            <motion.button
              key={btn}
              className="aspect-square rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.1 + i * 0.05, type: 'spring', stiffness: 200, damping: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {btn}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Haptic Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="flex items-center justify-between rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium">Haptic Feedback</span>
        </div>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-4 rounded-full bg-amber-400"
              animate={{
                scaleY: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}
        className="grid grid-cols-2 gap-3"
      >
        {[
          { icon: MessageSquare, label: 'Party Chat' },
          { icon: Settings, label: 'Settings' },
        ].map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4 + i * 0.1, duration: 0.4 }}
          >
            <Button
              variant="ghost"
              className="flex items-center justify-center gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 w-full"
            >
              <action.icon className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
