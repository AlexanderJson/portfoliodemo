
export interface Theme {
  name: string;
  bg: string;
  text: string;
  subtext: string;
  accent: string;
  uiAccent: string;
  grainOpacity: number;
  vault: ThemeVault;
  reel: ThemeReel;
  signal: ThemeSignal;
  horizon: ThemeHorizon;
}

export const THEMES: ThemeConfig = {
  dark: { name: 'Dark', bg: '#000000', text: '#ffffff', subtext: 'rgba(255, 255, 255, 0.45)', accent: '#dc2626', uiAccent: '#991b1b', grainOpacity: 0.03, vault: { ring: 'rgba(127, 29, 29, 0.6)', notch: 'rgba(220, 38, 38, 0.8)', core: '#ef4444' }, reel: { film: 'rgba(120, 20, 20, 0.2)', sprocket: '#000000', highlight: '#dc2626' }, signal: { line: '#ff0000', noise: 'rgba(220, 38, 38, 0.15)' }, horizon: { line: 'rgba(220, 38, 38, 0.3)', node: '#ff0000' } },
  light: { name: 'Light', bg: '#f2f2f2', text: '#0a0a0a', subtext: 'rgba(10, 10, 10, 0.9)', accent: '#0a0a0a', uiAccent: '#9ca3af', grainOpacity: 0.06, vault: { ring: 'rgba(0, 0, 0, 0.25)', notch: 'rgba(0, 0, 0, 0.5)', core: '#000000' }, reel: { film: 'rgba(0, 0, 0, 0.08)', sprocket: '#f2f2f2', highlight: 'rgba(0, 0, 0, 0.4)' }, signal: { line: '#000000', noise: 'rgba(0, 0, 0, 0.1)' }, horizon: { line: 'rgba(0, 0, 0, 0.18)', node: '#000000' } },
  noir: { name: 'Noir', bg: '#ffffff', text: '#000000', subtext: 'rgba(0, 0, 0, 0.95)', accent: '#000000', uiAccent: '#6b7280', grainOpacity: 0.08, vault: { ring: 'rgba(0, 0, 0, 0.35)', notch: '#000000', core: '#000000' }, reel: { film: 'rgba(0, 0, 0, 0.15)', sprocket: '#ffffff', highlight: '#000000' }, signal: { line: '#000000', noise: 'rgba(0, 0, 0, 0.2)' }, horizon: { line: 'rgba(0, 0, 0, 0.2)', node: '#000000' } },
  midnight: { name: 'Midnight', bg: '#020617', text: '#f8fafc', subtext: 'rgba(148, 163, 184, 0.6)', accent: '#22d3ee', uiAccent: '#164e63', grainOpacity: 0.04, vault: { ring: 'rgba(22, 78, 99, 0.6)', notch: 'rgba(34, 211, 238, 0.7)', core: '#22d3ee' }, reel: { film: 'rgba(8, 51, 68, 0.4)', sprocket: '#020617', highlight: '#22d3ee' }, signal: { line: '#22d3ee', noise: 'rgba(34, 211, 238, 0.1)' }, horizon: { line: 'rgba(34, 211, 238, 0.3)', node: '#22d3ee' } },
  prestige: { name: 'Prestige', bg: '#1a1a1a', text: '#fdf6e3', subtext: 'rgba(212, 175, 55, 0.6)', accent: '#d4af37', uiAccent: '#78350f', grainOpacity: 0.05, vault: { ring: 'rgba(212, 175, 55, 0.3)', notch: '#d4af37', core: '#d4af37' }, reel: { film: 'rgba(212, 175, 55, 0.12)', sprocket: '#1a1a1a', highlight: '#d4af37' }, signal: { line: '#d4af37', noise: 'rgba(212, 175, 55, 0.1)' }, horizon: { line: 'rgba(212, 175, 55, 0.3)', node: '#d4af37' } },
  arcane: { name: 'Arcane', bg: '#1a0f2e', text: '#f5f3ff', subtext: 'rgba(192, 132, 252, 0.6)', accent: '#fbbf24', uiAccent: '#581c87', grainOpacity: 0.07, vault: { ring: 'rgba(192, 132, 252, 0.4)', notch: '#fbbf24', core: '#c084fc' }, reel: { film: 'rgba(88, 28, 135, 0.3)', sprocket: '#1a0f2e', highlight: '#fbbf24' }, signal: { line: '#c084fc', noise: 'rgba(192, 132, 252, 0.2)' }, horizon: { line: 'rgba(192, 132, 252, 0.3)', node: '#fbbf24' } }
};
export type ThemeConfig = Record<string, Theme>;
export interface ThemeVault { ring: string; notch: string; core: string; }
export interface ThemeReel { film: string; sprocket: string; highlight: string; }
export interface ThemeSignal { line: string; noise: string; }
export interface ThemeHorizon { line: string; node: string; }