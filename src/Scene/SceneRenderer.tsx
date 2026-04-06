
import  { useRef, useEffect } from "react";
import type { CanvasEngine } from "../Canvas/CanvasEngine";
import { THEMES, type Theme } from "../ThemeConfig/Theme";




interface SceneRendererProps {
  EngineClass: new (canvas: HTMLCanvasElement, themeObj: Theme) => CanvasEngine;
  themeName: string;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({ EngineClass, themeName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<CanvasEngine | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    engineRef.current = new EngineClass(canvasRef.current, THEMES[themeName]);
    engineRef.current.start();
    return () => {
      if (engineRef.current) engineRef.current.stop();
    };
  }, [EngineClass, themeName]); 

  useEffect(() => {
    if (engineRef.current) engineRef.current.updateTheme(THEMES[themeName]);
  }, [themeName]);

  return <canvas ref={canvasRef} className="full-canvas" />;
};
