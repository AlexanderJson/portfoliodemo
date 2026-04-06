import { CanvasEngine } from '../Canvas/CanvasEngine';


export class SignalAnimation extends CanvasEngine {
  draw(time: number): void {
    this.ctx.fillStyle = this.t.bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const cy = this.canvas.height / 2;

    for (let i = 0; i < 40; i++) {
      this.ctx.fillStyle = this.t.signal.noise.replace('0.15', (Math.random() * 0.1).toString());
      this.ctx.fillRect(Math.random() * this.canvas.width, Math.random() * this.canvas.height, 1.5, 100);
    }

    this.ctx.beginPath(); this.ctx.strokeStyle = this.t.signal.line; this.ctx.lineWidth = 3;
    const numPoints = 300;

    for (let i = 0; i < numPoints; i++) {
      const x = (this.canvas.width / numPoints) * i;
      const pulseAmplitude = Math.pow(Math.sin(time * 0.001), 2) * 40;
      const y = cy + Math.sin(i * 0.04 + time * 0.005) * 60 + (Math.random() - 0.5) * pulseAmplitude;
      if (i === 0) this.ctx.moveTo(x, y); else this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();

    this.frame = requestAnimationFrame(this.draw);
  }
}
