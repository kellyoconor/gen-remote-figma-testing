# Generative UI Remote

A modern, mobile-first adaptive control surface that dynamically transforms based on user context (TV, Music, Sports, Gaming). Built with React, Motion, and Tailwind CSS with a premium dark aesthetic featuring glassmorphism and electric-blue accents.

![Generative UI Remote](https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=600&fit=crop)

## ✨ Features

- **🎭 4 Adaptive Modes** - TV, Music, Sports, and Gaming interfaces that completely rebuild themselves
- **🎨 Generative Loading** - Beautiful 1.8s animations with cycling verbs for every mode transition
- **🎤 Voice Control** - Natural language mode switching with keyword detection
- **🔮 Persistent Floating Orb** - Context-aware control hub that expands into full interfaces
- **🌊 Fluid Animations** - Smooth transitions powered by Motion (Framer Motion)
- **📱 Mobile-First** - Optimized for portrait touch interfaces (390×844px)
- **🎯 Zero Hardware Pairing** - Pure software remote concept

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/generative-ui-remote.git
cd generative-ui-remote

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` (or your dev server URL) to see the app.

## 🎮 Usage

### Demo Mode (Default)

The app launches in **Flow Overview** mode showing all 9 screens:

- **4 Generative Loaders** - One for each mode
- **1 Voice Interface** - Voice control overlay
- **4 Adaptive Remotes** - TV, Music, Sports, Game

**Toggle Flow Overview:** Set `SHOW_FLOW_OVERVIEW = false` in `App.tsx` line 12

### Production Mode

For the clean production app experience:

1. Rename files:
   ```bash
   mv App.tsx App.demo.tsx
   mv App.clean.tsx App.tsx
   ```

2. Set `SHOW_FLOW_OVERVIEW = false` (or use App.clean.tsx which doesn't have it)

3. The app will launch directly into the TV remote experience

### Controls

- **Mode Switching**: Click mode icons in the persistent orb (TV, Music, Sports, Game)
- **Voice Control**: Click microphone icon in orb → speak a mode keyword
- **Keyboard Shortcuts** (when voice overlay is open):
  - `1` - Switch to TV
  - `2` - Switch to Music  
  - `3` - Switch to Sports
  - `4` - Switch to Gaming

### Voice Keywords

- **TV**: "tv", "television", "watch"
- **Music**: "music", "song", "play music"
- **Sports**: "sports", "game", "match"
- **Gaming**: "gaming", "game controller", "play games"

## 📁 Project Structure

```
├── App.tsx                      Main app (demo mode with Flow Overview)
├── App.clean.tsx                Production app (clean version)
├── components/
│   ├── AdaptiveRemote.tsx      Main remote interface container
│   ├── GenerativeLoader.tsx    Loading animations
│   ├── VoiceListening.tsx      Voice control overlay
│   ├── PersistentOrb.tsx       Floating control orb
│   ├── FlowOverview.tsx        Documentation/demo viewer
│   ├── content/                Mode-specific content
│   │   ├── TVContent.tsx
│   │   ├── MusicContent.tsx
│   │   ├── SportsContent.tsx
│   │   └── GameContent.tsx
│   └── ui/                     shadcn/ui components
├── styles/
│   └── globals.css             Design tokens & global styles
└── CURSOR_EXPORT_GUIDE.md      Guide for clean production export
```

## 🎨 Design System

### Color Palette

- **Background**: Black → Slate-950 → Blue-950 gradient
- **Accent**: Electric Blue (#3B82F6)
- **Glass**: White with 5-20% opacity
- **Text**: White primary, Slate-400 secondary

### Typography

Defined in `styles/globals.css` - do not override with Tailwind classes unless necessary.

### Motion Principles

- **Generative Loaders**: 1.8s duration, 6 verb cycles (300ms each)
- **Mode Transitions**: Smooth fade + scale animations
- **Orb Expansion**: Spring physics with bounce
- **Voice Overlay**: Full-screen slide-up with backdrop blur

## 🛠️ Tech Stack

- **React** - UI framework
- **Motion** (Framer Motion) - Animation library
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon system
- **shadcn/ui** - Component library
- **Vite** - Build tool (assumed)

## 🚢 Deployment

### Building for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Build command: `npm run build`
4. Output directory: `dist`

### PWA Configuration (Optional)

To make this a Progressive Web App:

1. Add `public/manifest.json`:
   ```json
   {
     "name": "Generative UI Remote",
     "short_name": "Remote",
     "theme_color": "#000000",
     "background_color": "#000000",
     "display": "standalone",
     "orientation": "portrait"
   }
   ```

2. Add service worker for offline support
3. Add app icons (192×192, 512×512)

## 📸 Screenshots

### Generative Loader
![Loader Animation](https://via.placeholder.com/390x844/0F172A/3B82F6?text=Generative+Loader)

### Voice Control
![Voice Interface](https://via.placeholder.com/390x844/0F172A/22C55E?text=Voice+Control)

### TV Remote
![TV Remote](https://via.placeholder.com/390x844/0F172A/F97316?text=TV+Remote)

### Music Player
![Music Remote](https://via.placeholder.com/390x844/0F172A/8B5CF6?text=Music+Player)

## 🎯 Design Philosophy

### Remote-First
No hardware pairing required - pure software control surface.

### Generative UI
Every mode transition triggers dramatic "rebuilding" animations that make users feel the interface is being custom-generated.

### Context-Aware
The entire UI adapts to what you're doing - from layout to controls to content.

### Premium Minimal
Inspired by Apple TV Remote and Sonos products - clean, intuitive, glass-morphic.

## 🔧 Development

### Component Architecture

```
App (State Management)
├── FlowOverview (Demo Mode) OR
└── Main App
    ├── GenerativeLoader (Transitions)
    └── AdaptiveRemote
        ├── MeshBackground
        ├── AppHeader
        ├── Content (TV/Music/Sports/Game)
        └── PersistentOrb
            └── VoiceListening (Overlay)
```

### Adding a New Mode

1. Create `components/content/YourModeContent.tsx`
2. Add mode type to `RemoteMode` in `App.tsx`
3. Import and render in `AdaptiveRemote.tsx`
4. Add mode keywords to `VoiceListening.tsx`
5. Add loader variant in `GenerativeLoader.tsx`
6. Update mode selector in `PersistentOrb.tsx`

## 📝 Guides

- **[Cursor Export Guide](./CURSOR_EXPORT_GUIDE.md)** - How to export clean production code
- **[Design Guidelines](./guidelines/Guidelines.md)** - Design principles and patterns
- **[Attributions](./Attributions.md)** - Third-party assets and credits

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 🙏 Acknowledgments

- Design inspiration: Apple TV Remote, Sonos app, Generative UI patterns
- Component library: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/)
- Animation: [Motion](https://motion.dev/) (Framer Motion)

## 📬 Contact

Your Name - [@yourhandle](https://twitter.com/yourhandle)

Project Link: [https://github.com/YOUR_USERNAME/generative-ui-remote](https://github.com/YOUR_USERNAME/generative-ui-remote)

---

**Built with ❤️ using Figma Make**
