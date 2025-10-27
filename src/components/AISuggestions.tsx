import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { RemoteMode } from '../App';

interface AISuggestionsProps {
  mode: RemoteMode;
}

const suggestions = {
  tv: [
    { text: "Continue watching Stranger Things", subtext: "38 min left in S4E8", confidence: 95 },
    { text: "You usually watch at 9 PM", subtext: "Right on schedule", confidence: 88 },
  ],
  sports: [
    { text: "Lakers game starts in 15 min", subtext: "Your favorite team is playing", confidence: 92 },
    { text: "Highlight reel ready", subtext: "From last night's game", confidence: 85 },
  ],
  music: [
    { text: "You usually listen to jazz at this time", subtext: "Chill Vibes playlist ready", confidence: 90 },
    { text: "New releases from your artists", subtext: "3 new albums this week", confidence: 87 },
  ],
  game: [
    { text: "Resume Elden Ring campaign", subtext: "Last played 2 hours ago", confidence: 93 },
    { text: "Friend online: Alex", subtext: "Playing Valorant", confidence: 80 },
  ],
  'smart-home': [
    { text: "Evening routine ready", subtext: "Lights, temp, and music", confidence: 91 },
    { text: "Energy optimization available", subtext: "Save 12% this month", confidence: 84 },
  ],
};

const modeColors = {
  tv: '#3b82f6',
  sports: '#10b981',
  music: '#8b5cf6',
  game: '#f59e0b',
  'smart-home': '#06b6d4',
};

export function AISuggestions({ mode }: AISuggestionsProps) {
  const modeSuggestions = suggestions[mode];
  const color = modeColors[mode];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      {/* Suggestions */}
      {modeSuggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="w-full rounded-xl backdrop-blur-xl border p-3 flex items-start gap-3 text-left group hover:scale-[1.02] transition-all relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
            borderColor: `${color}30`,
          }}
          whileHover={{
            borderColor: `${color}60`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Chromatic aberration effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: `linear-gradient(90deg, ${color}10, transparent, ${color}10)`,
              mixBlendMode: 'screen',
            }}
          />

          <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium mb-0.5" style={{ color }}>{suggestion.text}</p>
            <p className="text-xs text-slate-400 italic font-light">{suggestion.subtext}</p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
