import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { RemoteMode } from '../App';
import { GenerativeLoader } from './GenerativeLoader';
import { VoiceListening } from './VoiceListening';
import { AdaptiveRemote } from './AdaptiveRemote';
import { ModeSelector } from './ModeSelector';

type FlowScreen = 
  | 'generator-tv'
  | 'generator-music'
  | 'generator-sports'
  | 'generator-game'
  | 'voice-listening'
  | 'remote-tv'
  | 'remote-music'
  | 'remote-sports'
  | 'remote-game';

interface ScreenPreviewProps {
  title: string;
  description: string;
  screen: FlowScreen;
  onClick: () => void;
  isActive: boolean;
}

function ScreenPreview({ title, description, screen, onClick, isActive }: ScreenPreviewProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative group cursor-pointer text-left transition-all ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Mini phone frame */}
      <div className="aspect-[9/19.5] bg-slate-900 rounded-[20px] border-2 border-slate-700 overflow-hidden relative pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden">
          {/* Render the actual screen */}
          <ScreenContent screen={screen} />
        </div>
        
        {/* Mini notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-b-2xl z-50" />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors pointer-events-none" />
      </div>
      
      {/* Label */}
      <div className="mt-2 px-1">
        <h3 className="text-sm text-white">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </motion.div>
  );
}

function ScreenContent({ screen }: { screen: FlowScreen }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(65);

  // Extract mode from screen name
  const getMode = (): RemoteMode => {
    if (screen.includes('tv')) return 'tv';
    if (screen.includes('music')) return 'music';
    if (screen.includes('sports')) return 'sports';
    if (screen.includes('game')) return 'game';
    return 'tv';
  };

  if (screen.startsWith('generator-')) {
    return <GenerativeLoader mode={getMode()} />;
  }

  if (screen === 'voice-listening') {
    return <VoiceListening currentMode="tv" onModeChange={() => {}} onClose={() => {}} />;
  }

  if (screen.startsWith('remote-')) {
    return (
      <AdaptiveRemote
        mode={getMode()}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
      />
    );
  }

  return null;
}

interface FlowOverviewProps {
  onBackToApp?: () => void;
  currentMode: RemoteMode;
  onModeChange: (mode: RemoteMode) => void;
}

export function FlowOverview({ onBackToApp, currentMode, onModeChange }: FlowOverviewProps) {
  const [activeScreen, setActiveScreen] = useState<FlowScreen>('voice-listening');
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');

  const screens: { screen: FlowScreen; title: string; description: string; category: string }[] = [
    // Generative Loaders
    { screen: 'generator-tv', title: 'Generator: TV', description: '1.8s load animation', category: 'Loaders' },
    { screen: 'generator-music', title: 'Generator: Music', description: '1.8s load animation', category: 'Loaders' },
    { screen: 'generator-sports', title: 'Generator: Sports', description: '1.8s load animation', category: 'Loaders' },
    { screen: 'generator-game', title: 'Generator: Game', description: '1.8s load animation', category: 'Loaders' },
    
    // Voice Control
    { screen: 'voice-listening', title: 'Voice Control', description: 'Activated by mic button', category: 'Voice' },
    
    // Remote Modes
    { screen: 'remote-tv', title: 'TV Remote', description: 'Main TV interface', category: 'Remotes' },
    { screen: 'remote-music', title: 'Music Remote', description: 'Music player interface', category: 'Remotes' },
    { screen: 'remote-sports', title: 'Sports Remote', description: 'Sports hub interface', category: 'Remotes' },
    { screen: 'remote-game', title: 'Game Remote', description: 'Game controller interface', category: 'Remotes' },
  ];

  const categories = ['Loaders', 'Voice', 'Remotes'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {onBackToApp && (
              <button
                onClick={onBackToApp}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </button>
            )}
          </div>
          <h1 className="text-3xl mb-2">Flow Overview</h1>
          <p className="text-slate-400 mb-6">All screens and states in the Generative UI Remote</p>
          
          {/* Mode Selector */}
          <ModeSelector 
            currentMode={currentMode}
            setCurrentMode={onModeChange}
          />
          
          {/* View Mode Toggle */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('detail')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'detail'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              Detail View
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          // Grid View - All screens in categories
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-xl text-slate-300 mb-4 flex items-center gap-2">
                  {category}
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    {screens.filter(s => s.category === category).length}
                  </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {screens
                    .filter(s => s.category === category)
                    .map(({ screen, title, description }) => (
                      <ScreenPreview
                        key={screen}
                        screen={screen}
                        title={title}
                        description={description}
                        onClick={() => {
                          setActiveScreen(screen);
                          setViewMode('detail');
                        }}
                        isActive={activeScreen === screen}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Detail View - Single large screen
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 space-y-1">
              {categories.map((category) => (
                <div key={category} className="mb-4">
                  <h3 className="text-xs text-slate-500 mb-2 px-3">{category}</h3>
                  {screens
                    .filter(s => s.category === category)
                    .map(({ screen, title, description }) => (
                      <button
                        key={screen}
                        onClick={() => setActiveScreen(screen)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          activeScreen === screen
                            ? 'bg-blue-500 text-white'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div>{title}</div>
                        <div className="text-xs opacity-70">{description}</div>
                      </button>
                    ))}
                </div>
              ))}
            </div>

            {/* Large Preview */}
            <div className="flex-1">
              <div className="sticky top-8">
                <div className="relative mx-auto aspect-[9/19.5] bg-slate-900 rounded-[40px] border-4 border-slate-800 shadow-2xl overflow-hidden max-w-[390px]">
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden overflow-x-hidden">
                    <ScreenContent screen={activeScreen} />
                  </div>
                  
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-50" />
                </div>

                {/* Screen Info */}
                <div className="mt-6 text-center max-w-[390px] mx-auto">
                  <h2 className="text-xl text-white mb-2">
                    {screens.find(s => s.screen === activeScreen)?.title}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {screens.find(s => s.screen === activeScreen)?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flow Diagram */}
        <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
          <h2 className="text-xl mb-6">User Flow</h2>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 border border-blue-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                App Launch
              </div>
              <div className="text-slate-500">→</div>
              <div className="bg-purple-500/20 border border-purple-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                GenerativeLoader
                <div className="text-xs text-slate-400 mt-1">1.8 seconds</div>
              </div>
              <div className="text-slate-500">→</div>
              <div className="bg-orange-500/20 border border-orange-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                AdaptiveRemote
                <div className="text-xs text-slate-400 mt-1">Main interface (TV mode)</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="bg-orange-500/20 border border-orange-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                Mode Switch
              </div>
              <div className="text-slate-500">→</div>
              <div className="bg-purple-500/20 border border-purple-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                GenerativeLoader
                <div className="text-xs text-slate-400 mt-1">1.8 seconds</div>
              </div>
              <div className="text-slate-500">→</div>
              <div className="bg-orange-500/20 border border-orange-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                New Mode Remote
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="bg-orange-500/20 border border-orange-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                Click Mic Button
              </div>
              <div className="text-slate-500">→</div>
              <div className="bg-green-500/20 border border-green-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                Voice Listening
                <div className="text-xs text-slate-400 mt-1">Full-screen overlay</div>
              </div>
              <div className="text-slate-500">→</div>
              <div className="bg-purple-500/20 border border-purple-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                GenerativeLoader
                <div className="text-xs text-slate-400 mt-1">1.8 seconds (if mode change)</div>
              </div>
              <div className="text-slate-500">→</div>
              <div className="bg-orange-500/20 border border-orange-500/50 px-4 py-2 rounded-lg min-w-[200px] text-center">
                New Mode Remote
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
