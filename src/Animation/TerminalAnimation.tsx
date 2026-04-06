import { CanvasEngine } from '../Canvas/CanvasEngine';


export class TerminalAnimation extends CanvasEngine {
  draw(time: number): void {
    this.ctx.fillStyle = this.t.bg; 
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2; 
    
    this.ctx.globalCompositeOperation = 'screen';
    
    for(let i = 0; i < 4; i++) { 
      const t = time * 0.00015;
      
      const x = cx + Math.sin(t * (1.1 + i * 0.4) + i * 5) * (this.canvas.width * 0.35);
      const y = cy + Math.cos(t * (0.9 + i * 0.5) + i * 8) * (this.canvas.height * 0.35);
      
      const baseRadius = Math.min(this.canvas.width, this.canvas.height) * 0.4;
      const r = baseRadius + Math.sin(t * 2 + i) * (baseRadius * 0.2);
      
      if (r <= 0) continue; 

      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, r);
      gradient.addColorStop(0, this.t.subtext); 
      gradient.addColorStop(1, 'transparent');  
      
      this.ctx.beginPath(); 
      this.ctx.arc(x, y, r, 0, Math.PI * 2); 
      
      this.ctx.globalAlpha = 0.01 + ((Math.sin(t * 1.5 + i) + 1) / 2) * 0.02;
      this.ctx.fillStyle = gradient;
      this.ctx.fill(); 
    }
    
    this.ctx.globalAlpha = 1.0;
    this.ctx.globalCompositeOperation = 'source-over';
    
    this.frame = requestAnimationFrame(this.draw.bind(this));
  }
}