import { CanvasEngine } from '../Canvas/CanvasEngine';


export class TimelineAnimation extends CanvasEngine {
  draw(time: number): void {
    this.ctx.fillStyle = this.t.bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const stripWidth = 500, railWidth = 60, dividerHeight = 55, cornerRadius = 16, sprocketSize = 18;
    const startX = Math.max(this.canvas.width * 0.55, 650);
    const frameWidth = stripWidth - (railWidth * 2), frameHeight = frameWidth * 0.75;
    const cycleHeight = frameHeight + dividerHeight;
    const offset = (time * 0.08 % cycleHeight);

    this.ctx.fillStyle = this.t.reel.film;
    this.ctx.fillRect(startX, 0, stripWidth, this.canvas.height);

    const framesNeeded = Math.ceil(this.canvas.height / cycleHeight) + 2;

    for (let i = -1; i < framesNeeded; i++) {
      const y = i * cycleHeight + offset;
      this.ctx.fillStyle = this.t.bg; this.ctx.beginPath();
      this.ctx.roundRect(startX + railWidth, y + (dividerHeight / 2), frameWidth, frameHeight, cornerRadius);
      this.ctx.fill();

      this.ctx.fillStyle = this.t.reel.sprocket;
      for (let s = 0; s < 4; s++) {
        const sy = y + (s * cycleHeight / 4) + (cycleHeight / 16);
        this.ctx.beginPath(); this.ctx.roundRect(startX + (railWidth / 2) - (sprocketSize / 2), sy, sprocketSize, sprocketSize * 0.75, 2); this.ctx.fill();
        this.ctx.beginPath(); this.ctx.roundRect(startX + stripWidth - (railWidth / 2) - (sprocketSize / 2), sy, sprocketSize, sprocketSize * 0.75, 2); this.ctx.fill();
      }
    }

    this.frame = requestAnimationFrame(this.draw);
  }
}
