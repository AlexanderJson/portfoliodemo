import type { CanvasEngine } from '../Canvas/CanvasEngine';
import type { Theme } from '../ThemeConfig/Theme';


export interface SceneData {
  title: string;
  type: string;
  desc: string | null;
  tech?: string[];
  github?: string;
  isContact?: boolean;
  EngineClass: new (canvas: HTMLCanvasElement, themeObj: Theme) => CanvasEngine;
}
