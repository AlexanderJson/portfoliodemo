import { Moon, Sun, Target, Zap, Shield, Sparkles, Maximize, Download, ChevronLeft, ChevronRight } from "lucide-react";
import type { SceneData } from "../Scene/SceneData";
import type { Theme } from "../ThemeConfig/Theme";

interface ProjectPageProps {
  project: SceneData;
  themeName: string;
  currentTheme: Theme;
  isLightMode: boolean;
  isTheaterMode: boolean;
  isTransitioning: boolean;
  currentScene: number;
  totalScenes: number;
  onCycleTheme: () => void;
  onToggleTheater: () => void;
  onNavigate: (direction: number) => void;
}


export const ProjectPage: React.FC<ProjectPageProps> = ({ 
  project, 
  themeName, 
  currentTheme, 
  isLightMode, 
  isTheaterMode, 
  isTransitioning,
  currentScene, 
  totalScenes, 
  onCycleTheme, 
  onToggleTheater, 
  onNavigate 
}) => {
  return (
    <div className="ui-layer">
        
       <div className={`ui-header transition-opacity duration-500 ${isTheaterMode ? 'theater-hide' : ''} ${isTransitioning ? 'op-0' : 'op-100'}`}>
        <div className="title-group">
          <h1 className={`main-title ${isLightMode ? 'fw-bold' : 'fw-light'}`}>{project.title}</h1>
          <p className={`sub-title ${isLightMode ? 'fw-black' : 'fw-semibold'}`} style={{ color: currentTheme.accent }}>{project.type}</p>
        </div>
        
        <div className="controls-group">
            <button onClick={onCycleTheme} className={`theme-btn ${isLightMode ? 'fw-black' : 'fw-medium'}`} style={{ color: currentTheme.subtext }}>
              {themeName === 'dark' && <Moon size={18} />}
              {themeName === 'light' && <Sun size={18} />}
              {themeName === 'noir' && <Target size={18} />}
              {themeName === 'midnight' && <Zap size={18} />}
              {themeName === 'prestige' && <Shield size={18} />}
              {themeName === 'arcane' && <Sparkles size={18} />}
             </button>
            <button onClick={onToggleTheater} className="theme-btn" style={{ color: currentTheme.subtext }}><Maximize size={20} /></button>
        </div>
      </div>

      <div className={`desc-panel transition-all duration-500 ${isTheaterMode ? 'theater-slide-hide' : ''} ${isTransitioning ? 'op-0 -translate-x-4' : 'op-100 translate-x-0'}`}>
        {project.desc && (
          <div className="desc-inner">
            <div className="divider" style={{ backgroundColor: `${currentTheme.accent}60` }} />
            <p className={`desc-text ${isLightMode ? 'fw-bold op-100' : 'fw-light'}`} style={{ color: isLightMode ? currentTheme.text : currentTheme.subtext }}>
              {project.desc}
            </p>

            {project.tech && (
              <div className="tech-tags">
                {project.tech.map(t => (
                  <span key={t} className={`tech-tag ${isLightMode ? 'fw-black' : 'op-30'}`}>{t}</span>
                ))}
              </div>
            )}

            <div className="links-area">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={`link-item ${isLightMode ? 'fw-black' : ''}`}>
                  <p /> Source
                </a>
              )}
              {project.isContact && (
                <div className="contact-block">
                  <div className="contact-row">

                  </div>
                  <button className="download-btn"><Download size={14} /> Download CV</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={`ui-footer transition-opacity duration-500 ${isTheaterMode ? 'theater-hide' : ''} ${isTransitioning ? 'op-0' : 'op-100'}`}>
        <div className="nav-controls">
          {currentScene > 0 ? (
              <button onClick={() => onNavigate(-1)} className="nav-btn" style={{ color: currentTheme.subtext }}>
                <span className={`nav-label ${isLightMode ? 'fw-black op-100' : 'fw-bold op-40'}`}>Back</span>
                <div className={`nav-action ${isLightMode ? 'fw-black' : ''}`}><ChevronLeft size={14} /> Previous</div>
              </button>
          ) : <div className="nav-btn-placeholder" />}

          {currentScene < totalScenes - 1 ? (
              <button onClick={() => onNavigate(1)} className="nav-btn" style={{ color: currentTheme.subtext }}>
                <span className={`nav-label ${isLightMode ? 'fw-black op-100' : 'fw-bold op-40'}`}>Project</span>
                <div className={`nav-action ${isLightMode ? 'fw-black' : ''}`}>Next <ChevronRight size={14} /></div>
              </button>
          ) : <div className="nav-btn-placeholder" />}
        </div>

        <div className="counter-group">
            <div className="counter-row">
              <span className={`counter-text ${isLightMode ? 'fw-black' : 'op-40'}`}>{currentScene + 1} / {totalScenes}</span>
              <div className="counter-line" />
            </div>
        </div>
      </div>
    </div>
  );
};
