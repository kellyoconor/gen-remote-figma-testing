import { motion, useMotionValue, useTransform } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, RotateCcw, RotateCw, Brain } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { RemoteMode } from '../App';
import { VoiceVisualizer } from './VoiceVisualizer';

interface PersistentOrbProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
  currentMode: RemoteMode;
  onVoiceActivate?: () => void;
}

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function PersistentOrb({ isPlaying, setIsPlaying, volume, setVolume, currentMode, onVoiceActivate }: PersistentOrbProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const orbRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const trailIdCounter = useRef(0);

  const color = '#e2e8f0'; // Light gray color - consistent across all modes

  // Add trail points while dragging
  useEffect(() => {
    if (isDragging) {
      const interval = setInterval(() => {
        setTrail((prev) => {
          const newPoint: TrailPoint = {
            x: position.x,
            y: position.y,
            id: trailIdCounter.current++,
          };
          // Keep only last 8 points
          return [...prev.slice(-7), newPoint];
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      // Fade out trail when not dragging
      const timeout = setTimeout(() => {
        setTrail([]);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isDragging, position]);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const newX = clientX - dragStart.current.x;
    const newY = clientY - dragStart.current.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      {/* Light Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed bottom-4 right-6 z-40 pointer-events-none"
          style={{ x: point.x, y: point.y }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.5,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div
            className="w-16 h-16 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${color}40, transparent)`,
            }}
          />
        </motion.div>
      ))}

      {/* Main Orb */}
      <motion.div
        ref={orbRef}
        className="fixed bottom-4 right-6 z-50 cursor-move touch-none"
        style={{ x: position.x, y: position.y }}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        onClick={(e) => {
          if (!isDragging) {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <motion.div
          className="relative backdrop-blur-xl border shadow-2xl overflow-visible"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}20)`,
            borderRadius: isExpanded ? '24px' : '50%',
            width: isExpanded ? '320px' : '56px',
            height: isExpanded ? '150px' : '56px',
            borderColor: showAI ? `${color}60` : 'rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            boxShadow: [
              `0 0 15px ${color}30`,
              `0 0 25px ${color}40`,
              `0 0 15px ${color}30`,
            ],
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            layout: { duration: 0.3 },
          }}
          layout
        >
          {/* Living Pulse Glow - Subtle */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${color}60, transparent 70%)`,
              borderRadius: isExpanded ? '24px' : '50%',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Secondary Pulse Wave */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, transparent 30%, ${color}30, transparent 80%)`,
              borderRadius: isExpanded ? '24px' : '50%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />

          {/* Audio-reactive ring (simulated) */}
          {isPlaying && !isExpanded && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 pointer-events-none"
              style={{
                borderColor: color,
                opacity: 0.2,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          
          {/* Compact View - Pure Living Orb */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Empty - just the living glow animations */}
            </motion.div>
          )}

          {/* Expanded View */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 py-2.5 relative z-10 gap-1.5"
            >
              {/* AI Assistant & Voice Row */}
              <div className="flex items-center gap-2 w-full justify-between px-1">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAI(!showAI);
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-sm border"
                  style={{
                    background: showAI ? `${color}20` : 'rgba(255, 255, 255, 0.05)',
                    borderColor: showAI ? `${color}60` : 'rgba(255, 255, 255, 0.1)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Brain className="w-3 h-3" style={{ color }} />
                  {showAI && (
                    <motion.div
                      className="w-1 h-1 rounded-full"
                      style={{ background: color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.button>
                
                <VoiceVisualizer color={color} onActivate={onVoiceActivate} />
              </div>

              {/* Playback Controls Row */}
              <div className="flex items-center justify-center gap-1">
                {/* Rewind */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Rewind');
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack className="w-4 h-4" style={{ color }} fill={color} />
                </motion.button>

                {/* 10s Back */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('10s back');
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="w-4 h-4" style={{ color }} />
                  <span className="absolute text-[8px]" style={{ color }}>10</span>
                </motion.button>

                {/* Play/Pause */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors mx-1"
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" style={{ color }} fill={color} />
                  ) : (
                    <Play className="w-5 h-5" style={{ color }} fill={color} />
                  )}
                </motion.button>

                {/* 10s Forward */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('10s forward');
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCw className="w-4 h-4" style={{ color }} />
                  <span className="absolute text-[8px]" style={{ color }}>10</span>
                </motion.button>

                {/* Fast Forward */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Fast forward');
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward className="w-4 h-4" style={{ color }} fill={color} />
                </motion.button>
              </div>

              {/* Volume Controls Row */}
              <div className="flex items-center gap-2 w-full px-2">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVolume(volume === 0 ? 65 : 0);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                  whileTap={{ scale: 0.9 }}
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4" style={{ color }} />
                  ) : (
                    <Volume2 className="w-4 h-4" style={{ color }} />
                  )}
                </motion.button>
                
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${volume}%`,
                      background: color,
                    }}
                    initial={false}
                    animate={{ width: `${volume}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
