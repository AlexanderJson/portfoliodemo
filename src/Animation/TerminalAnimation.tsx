import { CanvasEngine } from '../Canvas/CanvasEngine';

export class TerminalAnimation extends CanvasEngine {
  draw(time: number): void {
    this.ctx.fillStyle = this.t.bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const cx = this.canvas.width / 2, cy = this.canvas.height * 0.4;
    this.ctx.strokeStyle = this.t.horizon.line; this.ctx.lineWidth = 1;

    for (let i = -15; i <= 15; i++) {
      this.ctx.beginPath(); this.ctx.moveTo(cx + i * 160, this.canvas.height); this.ctx.lineTo(cx, cy); this.ctx.stroke();
    }

    for (let i = 0; i < 12; i++) {
      const y = cy + Math.pow(1.6, i) * 12 + (time * 0.05 % 25);
      const w = (y - cy) * 8;
      this.ctx.beginPath(); this.ctx.moveTo(cx - w, y); this.ctx.lineTo(cx + w, y); this.ctx.stroke();
    }

    this.frame = requestAnimationFrame(this.draw);
  }
}
