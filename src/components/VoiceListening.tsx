import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { RemoteMode } from '../App';
import { X } from 'lucide-react';

interface VoiceListeningProps {
  onModeChange: (mode: RemoteMode) => void;
  onClose: () => void;
  currentMode: RemoteMode;
}

type ListeningPhase = 'listening' | 'processing' | 'responding';

const modeKeywords: Record<string, RemoteMode> = {
  'tv': 'tv',
  'television': 'tv',
  'watch': 'tv',
  'sports': 'sports',
  'game': 'sports',
  'match': 'sports',
  'music': 'music',
  'song': 'music',
  'play': 'music',
  'gaming': 'game',
  'controller': 'game',
  'xbox': 'game',
  'playstation': 'game',
};

const modeResponses: Record<RemoteMode, string> = {
  tv: 'Switching to TV mode',
  sports: 'Loading sports hub',
  music: 'Opening music player',
  game: 'Activating game controller',
};

export function VoiceListening({ onModeChange, onClose, currentMode }: VoiceListeningProps) {
  const [phase, setPhase] = useState<ListeningPhase>('listening');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  // Simulate voice detection and mode change
  useEffect(() => {
    // Auto-close after timeout if no input
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  const simulateVoiceInput = (input: string) => {
    // Show transcript
    setPhase('listening');
    let i = 0;
    const interval = setInterval(() => {
      if (i <= input.length) {
        setTranscript(input.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        // Process input
        setTimeout(() => {
          setPhase('processing');
          
          // Detect mode from input
          const detectedMode = Object.entries(modeKeywords).find(([keyword]) => 
            input.toLowerCase().includes(keyword)
          )?.[1];

          setTimeout(() => {
            setPhase('responding');
            if (detectedMode && detectedMode !== currentMode) {
              setResponse(modeResponses[detectedMode]);
              setTimeout(() => {
                onModeChange(detectedMode);
                setTimeout(onClose, 800);
              }, 1000);
            } else {
              setResponse('I\'m listening...');
              setTimeout(onClose, 1500);
            }
          }, 400);
        }, 300);
      }
    }, 30);
  };

  // Detect keyboard input for demo
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '1') simulateVoiceInput('Show me sports');
      if (e.key === '2') simulateVoiceInput('Play some music');
      if (e.key === '3') simulateVoiceInput('Switch to TV');
      if (e.key === '4') simulateVoiceInput('Open gaming mode');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentMode]);

  return (
    <motion.div
      className="absolute inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)',
        }}
        animate={{
          scale: phase === 'listening' ? [1, 1.1, 1] : 1,
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5 text-white" />
      </motion.button>

      {/* Main Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-8 py-12">
        {/* Status Text */}
        <motion.div
          className="absolute top-24 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <motion.p 
              className="text-slate-400 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {phase === 'listening' && 'Listening...'}
              {phase === 'processing' && 'Processing...'}
              {phase === 'responding' && 'Remote'}
            </motion.p>
          </div>
        </motion.div>

        {/* Transcript */}
        <AnimatePresence mode="wait">
          {transcript && (
            <motion.div
              className="absolute top-40 left-0 right-0 flex justify-center px-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="text-center max-w-md">
                <p className="text-slate-500 text-xs mb-1">You said</p>
                <p className="text-white text-lg">{transcript}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response */}
        <AnimatePresence mode="wait">
          {response && (
            <motion.div
              className="absolute top-40 left-0 right-0 flex justify-center px-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center max-w-md">
                <p className="text-blue-400 text-lg">{response}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Visualizer */}
        <div className="relative w-full flex items-center justify-center min-h-[160px]">
          <AnimatePresence mode="wait">
            {phase === 'listening' && <ListeningVisual key="listening" />}
            {phase === 'processing' && <ProcessingVisual key="processing" />}
            {phase === 'responding' && <RespondingVisual key="responding" />}
          </AnimatePresence>
        </div>

        {/* Hint Text */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-500 text-xs">Try saying:</p>
          <div className="flex flex-wrap justify-center gap-2 px-8">
            {[
              { key: '1', text: '"Show me sports"' },
              { key: '2', text: '"Play music"' },
              { key: '3', text: '"Switch to TV"' },
              { key: '4', text: '"Gaming mode"' },
            ].map((hint) => (
              <button
                key={hint.key}
                onClick={() => simulateVoiceInput(hint.text.replace(/"/g, ''))}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 text-xs transition-colors"
              >
                {hint.text}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Pulsing orb for listening state
function ListeningVisual() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'backOut' }}
    >
      {/* Main orb */}
      <motion.div
        className="w-32 h-32 rounded-full backdrop-blur-xl border-2"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.4))',
          borderColor: 'rgba(59, 130, 246, 0.8)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 40px rgba(59, 130, 246, 0.6)',
            '0 0 80px rgba(139, 92, 246, 0.8)',
            '0 0 40px rgba(59, 130, 246, 0.6)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Pulsing rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'rgba(59, 130, 246, 0.6)',
          }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 2 + i * 0.3, 2.5 + i * 0.3],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
}

// Spinning loader for processing
function ProcessingVisual() {
  return (
    <motion.div
      className="relative w-32 h-32"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <motion.div
        className="w-full h-full rounded-full border-4 border-transparent"
        style={{
          borderTopColor: 'rgba(59, 130, 246, 1)',
          borderRightColor: 'rgba(139, 92, 246, 0.5)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

// Success checkmark / waveform for responding
function RespondingVisual() {
  const barCount = 20;
  
  return (
    <motion.div
      className="flex items-center justify-center gap-1 h-32"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const centerDistance = Math.abs(i - barCount / 2) / (barCount / 2);
        const baseHeight = (1 - centerDistance * 0.6) * 60;
        
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: '3px',
              background: 'linear-gradient(180deg, rgba(59, 130, 246, 1), rgba(139, 92, 246, 1))',
            }}
            initial={{ height: '10px' }}
            animate={{
              height: [
                `${baseHeight * 0.3}px`,
                `${baseHeight * (0.6 + Math.random() * 0.4)}px`,
                `${baseHeight * 0.3}px`,
              ],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.03,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </motion.div>
  );
}
