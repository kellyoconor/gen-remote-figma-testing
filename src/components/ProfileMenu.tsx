import { motion } from 'motion/react';
import { Settings, Smartphone, HelpCircle, Tv, Trophy, Music, Gamepad2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { RemoteMode } from '../App';

interface ProfileMenuProps {
  currentMode: RemoteMode;
  onModeChange?: (mode: RemoteMode) => void;
}

const modes = [
  { id: 'tv' as RemoteMode, icon: Tv, label: 'TV Mode', color: '#3b82f6' },
  { id: 'sports' as RemoteMode, icon: Trophy, label: 'Sports Mode', color: '#10b981' },
  { id: 'music' as RemoteMode, icon: Music, label: 'Music Mode', color: '#8b5cf6' },
  { id: 'game' as RemoteMode, icon: Gamepad2, label: 'Game Mode', color: '#f59e0b' },
];

export function ProfileMenu({ currentMode, onModeChange }: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className="w-48 bg-slate-900/95 backdrop-blur-xl border-slate-700/30 text-white"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-slate-400 text-xs font-normal">
          Switch Mode
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700/30" />
        
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          
          return (
            <DropdownMenuItem
              key={mode.id}
              className="cursor-pointer focus:bg-white/5"
              onClick={() => onModeChange?.(mode.id)}
            >
              <Icon 
                className="mr-3 h-4 w-4" 
                style={{ color: isActive ? mode.color : undefined }}
              />
              <span style={{ color: isActive ? mode.color : undefined }}>
                {mode.label}
              </span>
              {isActive && (
                <span className="ml-auto text-xs" style={{ color: mode.color }}>●</span>
              )}
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator className="bg-slate-700/30" />
        
        <DropdownMenuItem 
          className="cursor-pointer text-slate-300 focus:bg-white/5 focus:text-white"
        >
          <Settings className="mr-3 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="cursor-pointer text-slate-300 focus:bg-white/5 focus:text-white"
        >
          <Smartphone className="mr-3 h-4 w-4" />
          <span>Devices</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-slate-700/30" />
        
        <DropdownMenuItem 
          className="cursor-pointer text-slate-300 focus:bg-white/5 focus:text-white"
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          <span>Help</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
