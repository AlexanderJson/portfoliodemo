import { useState, useEffect, useRef, useCallback } from 'react';

import { ProjectPage } from './Pages/ProjectPage';
import { SceneRenderer } from './Scene/SceneRenderer';
import { Minimize } from 'lucide-react';
import { THEMES } from './ThemeConfig/Theme';
import { IntroAnimation } from './Animation/IntroAnimation';
import type { SceneData } from './Scene/SceneData';
import { SignalAnimation } from './Animation/SignalAnimation';
import { TerminalAnimation } from './Animation/TerminalAnimation';
import { TimelineAnimation } from './Animation/TimelineAnimation';
import { VaultAnimation } from './Animation/VaultAnimation';




export default function App() {

  const MOCK_DATA: SceneData[] = [
    { title: "Alexander Jansson", type: "Portfolio", desc: null, EngineClass: IntroAnimation },
    { title: "Vault", type: "Password Manager", tech: ["C#", "React", "SQL"], github: "#", desc: "A secure REST API built to safely generate and store user passwords, and transmit sensitive keys via one-time encrypted messages. Encrypted with AES-256-GCM and AAD tamper protection.", EngineClass: VaultAnimation },
    { title: "Reeltalk", type: "Project planner for filmmakers", tech: ["Java","Spring", "Kotlin", "React", "SQL"], github: "#", desc: "A project management suite for film production. Key features include role-based access control, dynamic scheduling, and automated availability tracking for crew members.", EngineClass: TimelineAnimation },
    { title: "Hyperfocus", type: "Noise Reduction AI", tech: ["Python"], github: "#", desc: "Isolates and reduces any sound using machine-learning. By training the AI on a sound, it can remove that sound from any audio.", EngineClass: SignalAnimation },
    { title: "Contact me", type: "alexanderjsn@live.com", isContact: true, desc: "Ge mig praktik.", EngineClass: TerminalAnimation }
  ];


  const [currentScene, setCurrentScene] = useState<number>(0);
  const [progressScene, setProgressScene] = useState<number>(0); 
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
  const [themeName, setThemeName] = useState<string>('prestige');
  const scrollCooldown = useRef<boolean>(false);
  const currentTheme = THEMES[themeName];
  const isLightMode = themeName === 'light' || themeName === 'noir';
  const project = MOCK_DATA[currentScene];
  const cycleTheme = () => {
    const keys = Object.keys(THEMES);
    setThemeName(keys[(keys.indexOf(themeName) + 1) % keys.length]);
  };



  const navigate = useCallback((direction: number) => {
    if (isTransitioning) return;
    const nextIndex = currentScene + direction;
    if (nextIndex >= 0 && nextIndex < MOCK_DATA.length) {
      setProgressScene(nextIndex); 
      setIsTransitioning(true); // FADE 
      
      setTimeout(() => {
        setCurrentScene(nextIndex); 
        setTimeout(() => setIsTransitioning(false), 100); 
      }, 500); 
    }
  }, [currentScene, isTransitioning]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30 || scrollCooldown.current || isTheaterMode) return;
      scrollCooldown.current = true;
      navigate(e.deltaY > 0 ? 1 : -1);
      setTimeout(() => { scrollCooldown.current = false; }, 1400);
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [navigate, isTheaterMode]);

  return (
    
    <div className="app-wrapper" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}>
      
      <div className="grain-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', opacity: currentTheme.grainOpacity }} />
    
      <div className={`transition-overlay ${isTransitioning ? 'op-100' : 'op-0'}`} style={{ backgroundColor: currentTheme.bg, transitionDuration: '500ms' }} />

      <div className="canvas-container">
        <SceneRenderer EngineClass={project.EngineClass} themeName={themeName} />
      </div>

   
      <ProjectPage 
        project={project}
        themeName={themeName}
        currentTheme={currentTheme}
        isLightMode={isLightMode}
        isTheaterMode={isTheaterMode}
        isTransitioning={isTransitioning}
        currentScene={currentScene}
        totalScenes={MOCK_DATA.length}
        onCycleTheme={cycleTheme}
        onToggleTheater={() => setIsTheaterMode(!isTheaterMode)}
        onNavigate={navigate}
      />

      <div className={`progress-wrapper ${isTheaterMode ? 'theater-hide' : ''}`} style={{ backgroundColor: `${currentTheme.uiAccent}22` }}>
        <div className="progress-fill" style={{ width: `${((progressScene + 1) / MOCK_DATA.length) * 100}%`, backgroundColor: currentTheme.accent }} />
      </div>

      {isTheaterMode && (
        <div className="theater-close-wrap">
           <button onClick={() => setIsTheaterMode(false)} className="close-btn"><Minimize size={24} /></button>
        </div>
      )}


    </div>
  );
}