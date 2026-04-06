import type { Theme } from '../ThemeConfig/Theme';


export abstract class CanvasEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  t: Theme;
  frame: number | null;

  constructor(canvas: HTMLCanvasElement, themeObj: Theme) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Failed to get 2D context');
    this.ctx = context;
    this.t = themeObj;
    this.frame = null;

    this.resize = this.resize.bind(this);
    this.draw = this.draw.bind(this);

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start(): void {
    this.draw(0);
  }

  stop(): void {
    if (this.frame !== null) cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.resize);
  }

  updateTheme(newTheme: Theme): void {
    this.t = newTheme;
  }

  abstract draw(time: number): void;
}
