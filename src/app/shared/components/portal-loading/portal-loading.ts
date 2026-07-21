import {
  Component,
  ElementRef,
  viewChild,
  afterNextRender,
  DestroyRef,
  inject,
  ChangeDetectionStrategy,
  NgZone,
  input
} from '@angular/core';

@Component({
  selector: 'app-portal-loading',
  imports: [],
  templateUrl: './portal-loading.html',
  styleUrl: './portal-loading.scss',
})
export class PortalLoading {
  // Configurable inputs via Signals
  size = input<number>(200); // Dimension in px
  color = input<string>('#12daa8'); // Default accent color

  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('loaderCanvas');
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private animFrameId: number | null = null;

  constructor() {
    afterNextRender(() => {
      this.ngZone.runOutsideAngular(() => {
        this.initLoader();
      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.animFrameId !== null) {
        cancelAnimationFrame(this.animFrameId);
      }
    });
  }

  private initLoader(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasSize = this.size();

    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const baseRadius = (canvasSize * dpr) * 0.28;

    // Particle nodes on the outer ring
    const particleCount = 12;
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      angle: (i * (Math.PI * 2)) / particleCount,
      speed: 0.02 + Math.random() * 0.01,
      size: 3 * dpr,
    }));

    let angle1 = 0;
    let angle2 = 0;
    let pulseRadius = baseRadius;
    let pulseOpacity = 1;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- 1. Outer Pulsing Glow Wave ---
      pulseRadius += 0.6 * dpr;
      pulseOpacity -= 0.012;
      if (pulseOpacity <= 0) {
        pulseRadius = baseRadius;
        pulseOpacity = 0.8;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = this.hexToRgba(this.color(), pulseOpacity * 0.35);
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();
      ctx.restore();

      // --- 2. Inner Rotating Gradient Ring ---
      angle1 += 0.03;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle1);

      ctx.beginPath();
      ctx.arc(0, 0, baseRadius, 0, Math.PI * 1.4);
      ctx.strokeStyle = this.createGradient(ctx, baseRadius, this.color());
      ctx.lineWidth = 4 * dpr;
      ctx.lineCap = 'round';
      ctx.shadowColor = this.color();
      ctx.shadowBlur = 12 * dpr;
      ctx.stroke();
      ctx.restore();

      // --- 3. Counter-Rotating Inner Ring ---
      angle2 -= 0.045;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle2);

      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 0.72, 0, Math.PI * 0.9);
      ctx.strokeStyle = this.color();
      ctx.lineWidth = 2.5 * dpr;
      ctx.lineCap = 'round';
      ctx.shadowColor = this.color();
      ctx.shadowBlur = 8 * dpr;
      ctx.stroke();
      ctx.restore();

      // --- 4. Orbiting Particles ---
      particles.forEach((p) => {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * (baseRadius + 8 * dpr);
        const py = cy + Math.sin(p.angle) * (baseRadius + 8 * dpr);

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color();
        ctx.shadowColor = this.color();
        ctx.shadowBlur = 10 * dpr;
        ctx.fill();
        ctx.restore();
      });

      // --- 5. Center Core Glow ---
      const corePulse = Math.sin(time * 0.004) * (2 * dpr) + (6 * dpr);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, corePulse, 0, Math.PI * 2);
      ctx.fillStyle = this.color();
      ctx.shadowColor = this.color();
      ctx.shadowBlur = 16 * dpr;
      ctx.fill();
      ctx.restore();

      this.animFrameId = requestAnimationFrame(render);
    };

    this.animFrameId = requestAnimationFrame(render);
  }

  private createGradient(ctx: CanvasRenderingContext2D, radius: number, hexColor: string): CanvasGradient {
    const grad = ctx.createLinearGradient(-radius, -radius, radius, radius);
    grad.addColorStop(0, this.hexToRgba(hexColor, 1));
    grad.addColorStop(0.6, this.hexToRgba(hexColor, 0.4));
    grad.addColorStop(1, this.hexToRgba(hexColor, 0));
    return grad;
  }

  private hexToRgba(hex: string, alpha: number): string {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
