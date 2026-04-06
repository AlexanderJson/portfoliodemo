import { CanvasEngine } from '../Canvas/CanvasEngine';
import type { Theme } from '../ThemeConfig/Theme';

export class IntroAnimation extends CanvasEngine {
  vertices: number[][];
  edges: number[][];

  constructor(canvas: HTMLCanvasElement, themeObj: Theme) {
    super(canvas, themeObj);
    this.vertices = [[0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -1, 0]];
    this.edges = [[0, 1], [0, 2], [0, 3], [0, 4], [5, 1], [5, 2], [5, 3], [5, 4], [1, 2], [2, 3], [3, 4], [4, 1]];
  }

  draw(time: number): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const scale = 180 + Math.sin(time * 0.0004) * 20;
    const ax = time * 0.00015, ay = time * 0.00025;

    const proj = this.vertices.map(pt => {
      let x = pt[0], y = pt[1], z = pt[2];
      let ny = y * Math.cos(ax) - z * Math.sin(ax), nz = y * Math.sin(ax) + z * Math.cos(ax);
      y = ny; z = nz;
      let nx = x * Math.cos(ay) + z * Math.sin(ay); nz = -x * Math.sin(ay) + z * Math.cos(ay);
      x = nx; z = nz;
      const p = 4 / (4 + z);
      return [x * p * scale + this.canvas.width / 2, y * p * scale + this.canvas.height / 2];
    });

    this.ctx.strokeStyle = this.t.accent;
    this.ctx.lineWidth = 1;
    this.ctx.globalAlpha = 0.4;

    this.edges.forEach(edge => {
      this.ctx.beginPath();
      this.ctx.moveTo(proj[edge[0]][0], proj[edge[0]][1]);
      this.ctx.lineTo(proj[edge[1]][0], proj[edge[1]][1]);
      this.ctx.stroke();
    });

    this.frame = requestAnimationFrame(this.draw);
  }
}
