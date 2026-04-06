
import { CanvasEngine } from '../Canvas/CanvasEngine';
import type { Theme } from '../ThemeConfig/Theme';



export interface VaultRing {
  radius: number;
  thickness: number;
  dir: number;
  speed: number;
  segments: VaultRingSegment[];
}
export interface VaultRingSegment {
  start: number;
  length: number;
  isNode: boolean;
}
export class VaultAnimation extends CanvasEngine {
  rings: VaultRing[];

  constructor(canvas: HTMLCanvasElement, themeObj: Theme) {
    super(canvas, themeObj);
    this.rings = Array.from({ length: 18 }, (_, i) => {
      const numSegments = 4 + Math.floor(Math.random() * 24);
      const segments: VaultRingSegment[] = [];
      for (let j = 0; j < numSegments; j++) {
        segments.push({
          start: (j / numSegments) * Math.PI * 2,
          length: (Math.PI * 2 / numSegments) * (Math.random() * 0.7 + 0.1),
          isNode: Math.random() > 0.85
        });
      }
      return {
        radius: 60 + i * 18,
        thickness: i % 5 === 0 ? 4 : 1.5,
        dir: i % 2 === 0 ? 1 : -1,
        speed: (Math.random() * 0.0003 + 0.0001),
        segments
      };
    });
  }

  draw(time: number): void {
    this.ctx.fillStyle = this.t.bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const cx = this.canvas.width * 0.7, cy = this.canvas.height * 0.5;
    const scanAngle = (time * 0.0012) % (Math.PI * 2);

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.arc(cx, cy, 450, scanAngle - 0.5, scanAngle);
    this.ctx.lineTo(cx, cy);
    const grad = this.ctx.createLinearGradient(cx + Math.cos(scanAngle - 0.5) * 450, cy + Math.sin(scanAngle - 0.5) * 450, cx + Math.cos(scanAngle) * 450, cy + Math.sin(scanAngle) * 450);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, this.t.vault.core + '22');
    this.ctx.fillStyle = grad; this.ctx.fill();

    this.ctx.lineCap = 'butt';

    this.rings.forEach((ring) => {
      const rot = time * ring.speed * ring.dir;
      this.ctx.lineWidth = ring.thickness;

      ring.segments.forEach(seg => {
        const start = seg.start + rot, end = start + seg.length;
        let dist = (scanAngle - start) % (Math.PI * 2);
        if (dist < 0) dist += Math.PI * 2;

        let color = this.t.vault.ring, alpha = 0.2;
        if (dist < 0.6 || seg.isNode) {
          alpha = dist < 0.6 ? 0.9 - dist : 0.3;
          color = seg.isNode ? this.t.vault.core : this.t.vault.notch;
          if (dist < 0.05) alpha = 1;
        }

        this.ctx.beginPath();
        this.ctx.arc(cx, cy, ring.radius, start, end);
        this.ctx.strokeStyle = color; this.ctx.globalAlpha = alpha; this.ctx.stroke();

        if (seg.isNode && alpha > 0.4) {
          this.ctx.beginPath();
          this.ctx.arc(cx + Math.cos(start) * ring.radius, cy + Math.sin(start) * ring.radius, ring.thickness * 1.5, 0, Math.PI * 2);
          this.ctx.fillStyle = this.t.vault.core; this.ctx.fill();
        }
      });
    });

    this.ctx.beginPath(); this.ctx.moveTo(cx, cy); this.ctx.lineTo(cx + Math.cos(scanAngle) * 450, cy + Math.sin(scanAngle) * 450);
    this.ctx.strokeStyle = this.t.vault.core; this.ctx.globalAlpha = 0.9; this.ctx.lineWidth = 2; this.ctx.stroke();

    this.frame = requestAnimationFrame(this.draw);
  }
}
