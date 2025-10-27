import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { RemoteMode } from '../App';

interface VoiceOnboardingProps {
  onComplete: (mode: RemoteMode) => void;
}

type OnboardingPhase = 'idle' | 'listening' | 'wave' | 'responding' | 'transitioning';

export function VoiceOnboarding({ onComplete }: VoiceOnboardingProps) {
  const [phase, setPhase] = useState<OnboardingPhase>('idle');
  const [userText, setUserText] = useState('');
  const [aiText, setAiText] = useState('');

  const startSequence = () => {
    // Phase 1: Listening
    setTimeout(() => {
      setPhase('listening');
    }, 500);

    // Phase 2: Transform to wave & show user text
    setTimeout(() => {
      setPhase('wave');
      // Animate text appearing character by character
      const text = 'Hey Remote, show me what\'s on';
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setUserText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }, 1500);

    // Phase 3: AI Response
    setTimeout(() => {
      setPhase('responding');
      const text = 'Lakers game starts in 12 minutes. Should I get it ready?';
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setAiText(text.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);
    }, 4000);

    // Phase 4: User confirms
    setTimeout(() => {
      setUserText('Yes');
    }, 7500);

    // Phase 5: Transition out
    setTimeout(() => {
      setPhase('transitioning');
    }, 8500);

    setTimeout(() => {
      onComplete('sports');
    }, 9500);
  };

  useEffect(() => {
    // Auto-start after a brief delay
    const timeout = setTimeout(startSequence, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)',
        }}
        animate={{
          scale: phase === 'listening' || phase === 'wave' ? [1, 1.2, 1] : 1,
          opacity: phase === 'transitioning' ? 0 : 1,
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 1 },
        }}
      />

      {/* Main Content Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-6 py-8">
        {/* Brand */}
        <motion.div
          className="absolute top-16 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: phase === 'transitioning' ? 0 : 0.6, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="text-center">
            <h1 className="text-2xl tracking-wider text-slate-300">REMOTE</h1>
            <p className="text-[10px] text-slate-500 mt-0.5 tracking-widest">VOICE ENABLED</p>
          </div>
        </motion.div>

        {/* Text Display Area - Top */}
        <div className="absolute top-32 left-0 right-0 flex flex-col items-center gap-4 px-6">
          <AnimatePresence mode="wait">
            {userText && phase !== 'responding' && (
              <motion.div
                key="user"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <p className="text-slate-400 text-xs mb-1">You said</p>
                <p className="text-lg text-white">{userText}</p>
              </motion.div>
            )}

            {aiText && phase === 'responding' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-xs"
              >
                <p className="text-slate-400 text-xs mb-1">Remote</p>
                <p className="text-lg text-white leading-relaxed">{aiText}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center - Orb or Waveform */}
        <div className="relative w-full flex items-center justify-center min-h-[160px]">
          <AnimatePresence mode="wait">
            {(phase === 'idle' || phase === 'listening') && (
              <OrbVisual key="orb" phase={phase} />
            )}

            {(phase === 'wave' || phase === 'responding') && (
              <WaveformVisual key="wave" phase={phase} />
            )}

            {phase === 'transitioning' && (
              <TransitionEffect key="transition" />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom - Tap to continue hint (only in idle) */}
        {phase === 'idle' && (
          <motion.div
            className="absolute bottom-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-slate-500 text-xs">Initializing voice assistant...</p>
          </motion.div>
        )}

        {/* Skip button */}
        {phase !== 'transitioning' && (
          <motion.button
            onClick={() => onComplete('tv')}
            className="absolute top-8 right-6 text-slate-500 hover:text-slate-300 text-xs transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
          >
            Skip →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// Orb that pulses and glows
function OrbVisual({ phase }: { phase: OnboardingPhase }) {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: phase === 'listening' ? 1.3 : 1,
        opacity: 1,
      }}
      transition={{ 
        scale: { duration: 0.8, ease: 'easeOut' },
        opacity: { duration: 0.5 }
      }}
    >
      {/* Main orb */}
      <motion.div
        className="w-24 h-24 rounded-full backdrop-blur-xl border-2"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.4))',
          borderColor: 'rgba(59, 130, 246, 0.8)',
        }}
        animate={{
          boxShadow: [
            '0 0 30px rgba(59, 130, 246, 0.6)',
            '0 0 60px rgba(139, 92, 246, 0.8)',
            '0 0 30px rgba(59, 130, 246, 0.6)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Pulsing rings */}
      {phase === 'listening' && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: 'rgba(59, 130, 246, 0.6)',
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 2 + i * 0.5, 2.5 + i * 0.5],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

// Horizontal waveform that orb morphs into
function WaveformVisual({ phase }: { phase: OnboardingPhase }) {
  const barCount = 30;
  
  return (
    <motion.div
      className="flex items-center justify-center gap-1 h-24"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        // Create a symmetrical pattern
        const centerDistance = Math.abs(i - barCount / 2) / (barCount / 2);
        const baseHeight = (1 - centerDistance * 0.7) * 80;
        
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: '3px',
              background: 'linear-gradient(180deg, rgba(59, 130, 246, 1), rgba(139, 92, 246, 1))',
            }}
            animate={{
              height: phase === 'responding' 
                ? [
                    `${baseHeight * 0.3}px`,
                    `${baseHeight * (0.5 + Math.random() * 0.5)}px`,
                    `${baseHeight * 0.3}px`,
                  ]
                : `${baseHeight * 0.3}px`,
            }}
            transition={{
              duration: 0.5,
              repeat: phase === 'responding' ? Infinity : 0,
              delay: i * 0.02,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </motion.div>
  );
}

// Transition explosion effect
function TransitionEffect() {
  return (
    <motion.div
      className="relative w-24 h-24"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 2, 0], opacity: [1, 0.5, 0] }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Central flash */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 1), transparent)',
        }}
        animate={{
          scale: [1, 2.5, 4],
          opacity: [1, 0.3, 0],
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Particle rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-12 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(59, 130, 246, 1), transparent)',
              left: '50%',
              top: '50%',
              transformOrigin: 'top center',
              rotate: `${angle}rad`,
            }}
            animate={{
              y: [0, -60, -80],
              opacity: [1, 0.5, 0],
              scaleY: [1, 1.5, 0],
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </motion.div>
  );
}
