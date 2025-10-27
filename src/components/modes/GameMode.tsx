import { motion } from 'motion/react';
import { MessageSquare, Settings, Wifi, Zap, Activity } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export function GameMode() {
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

    const x = Math.max(-40, Math.min(40, clientX - rect.left - centerX));
    const y = Math.max(-40, Math.min(40, clientY - rect.top - centerY));

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
      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-2"
      >
        <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-sm border border-amber-500/20 p-3 text-center">
          <p className="text-2xl text-amber-400">120</p>
          <p className="text-xs text-slate-400">FPS</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-sm border border-amber-500/20 p-3 text-center">
          <p className="text-2xl text-amber-400">12</p>
          <p className="text-xs text-slate-400">ms</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-sm border border-amber-500/20 p-3 text-center">
          <Activity className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-xs text-slate-400">Optimal</p>
        </div>
      </motion.div>

      {/* Virtual Controller */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
      >
        {/* Joysticks */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Joystick */}
          <div
            className="relative w-28 h-28 rounded-full bg-amber-500/5 border-2 border-amber-500/20"
            onMouseMove={(e) => handleJoystickMove(e, 'left')}
            onMouseLeave={() => resetJoystick('left')}
            onTouchMove={(e) => handleJoystickMove(e, 'left')}
            onTouchEnd={() => resetJoystick('left')}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-amber-400/50 shadow-lg shadow-amber-500/30"
              animate={{
                x: leftJoystick.x,
                y: leftJoystick.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>

          {/* Right Joystick */}
          <div
            className="relative w-28 h-28 rounded-full bg-amber-500/5 border-2 border-amber-500/20"
            onMouseMove={(e) => handleJoystickMove(e, 'right')}
            onMouseLeave={() => resetJoystick('right')}
            onTouchMove={(e) => handleJoystickMove(e, 'right')}
            onTouchEnd={() => resetJoystick('right')}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-2 border-amber-400/50 shadow-lg shadow-amber-500/30"
              animate={{
                x: rightJoystick.x,
                y: rightJoystick.y,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <motion.button
            className="aspect-square rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            A
          </motion.button>
          <motion.button
            className="aspect-square rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            B
          </motion.button>
          <motion.button
            className="aspect-square rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            X
          </motion.button>
          <motion.button
            className="aspect-square rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            Y
          </motion.button>
        </div>
      </motion.div>

      {/* Haptic Feedback Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-3"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm">Haptic Feedback</span>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-3"
      >
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <span className="text-sm">Party Chat</span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2 h-auto py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <Settings className="w-4 h-4 text-amber-400" />
          <span className="text-sm">Settings</span>
        </Button>
      </motion.div>
    </div>
  );
}
