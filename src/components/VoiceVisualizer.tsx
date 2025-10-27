import { motion } from 'motion/react';
import { Mic } from 'lucide-react';
import { useState } from 'react';

interface VoiceVisualizerProps {
  color: string;
  onActivate?: () => void;
}

export function VoiceVisualizer({ color, onActivate }: VoiceVisualizerProps) {
  const [isListening, setIsListening] = useState(false);

  const bars = Array.from({ length: 5 });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onActivate) {
      onActivate();
    } else {
      setIsListening(!isListening);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative flex items-center justify-center gap-1.5 px-4 py-2 rounded-full backdrop-blur-xl border"
      style={{
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        borderColor: isListening ? `${color}60` : `${color}30`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Mic icon */}
      <Mic className="w-3.5 h-3.5" style={{ color }} />

      {/* Voice bars */}
      <div className="flex items-center gap-0.5 h-4">
        {bars.map((_, i) => (
          <motion.div
            key={i}
            className="w-0.5 rounded-full"
            style={{ background: color }}
            animate={
              isListening
                ? {
                    height: ['20%', '100%', '20%'],
                  }
                : {
                    height: '20%',
                  }
            }
            transition={{
              duration: 0.5,
              repeat: isListening ? Infinity : 0,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Listening text */}
      {isListening && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          className="text-xs ml-1"
          style={{ color }}
        >
          Listening...
        </motion.span>
      )}

      {/* Pulsing ring when active */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.button>
  );
}
