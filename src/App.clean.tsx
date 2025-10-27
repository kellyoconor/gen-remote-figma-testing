import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { AdaptiveRemote } from "./components/AdaptiveRemote";
import { VoiceListening } from "./components/VoiceListening";
import { GenerativeLoader } from "./components/GenerativeLoader";

export type RemoteMode = "tv" | "sports" | "music" | "game";

export default function App() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [showVoiceListening, setShowVoiceListening] =
    useState(false);
  const [currentMode, setCurrentMode] =
    useState<RemoteMode>("tv");
  const [pendingMode, setPendingMode] =
    useState<RemoteMode | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(65);

  // Initial app load - show generation animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Handle mode changes with generative loader
  useEffect(() => {
    if (pendingMode !== null) {
      setIsGenerating(true);
      const timer = setTimeout(() => {
        setCurrentMode(pendingMode);
        setPendingMode(null);
        setIsGenerating(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [pendingMode]);

  const handleModeChange = (mode: RemoteMode) => {
    if (mode !== currentMode) {
      setPendingMode(mode);
    }
  };

  const handleVoiceActivate = () => {
    setShowVoiceListening(true);
  };

  const handleVoiceModeChange = (mode: RemoteMode) => {
    handleModeChange(mode);
  };

  const handleVoiceClose = () => {
    setShowVoiceListening(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white overflow-hidden">
      {/* Generative Loader → Adaptive Remote */}
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <GenerativeLoader
            key="generating"
            mode={pendingMode || currentMode}
          />
        ) : (
          <AdaptiveRemote
            key="remote"
            mode={currentMode}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            volume={volume}
            setVolume={setVolume}
            onVoiceActivate={handleVoiceActivate}
          />
        )}
      </AnimatePresence>

      {/* Voice Listening Overlay */}
      <AnimatePresence>
        {showVoiceListening && (
          <VoiceListening
            currentMode={currentMode}
            onModeChange={handleVoiceModeChange}
            onClose={handleVoiceClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}