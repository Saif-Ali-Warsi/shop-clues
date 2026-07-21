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

interface PortalParticle {
  angle: number;
  distance: number;
  speed: number;
  size: number;
  opacity: number;
}

@Component({
  selector: 'app-portal-loading',
  imports: [],
  templateUrl: './portal-loading.html',
  styleUrl: './portal-loading.scss',
})
export class PortalLoading {
  size = input<number>(220);
  color = input<string>('#12daa8');

  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('portalCanvas');
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  private animFrameId: number | null = null;

  constructor() {
    afterNextRender(() => {
      this.ngZone.runOutsideAngular(() => {
        this.initPortal();
      });
    });

    this.destroyRef.onDestroy(() => {
      if (this.animFrameId !== null) {
        cancelAnimationFrame(this.animFrameId);
      }
    });
  }

  private initPortal(): void {
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
    const portalRadius = (canvasSize * dpr) * 0.32;

    const particleCount = 45;
    const particles: PortalParticle[] = [];

    const createParticle = (): PortalParticle => ({
      angle: Math.random() * Math.PI * 2,
      distance: portalRadius + (Math.random() * 20 * dpr),
      speed: (0.2 + Math.random() * 0.35) * dpr,
      size: (0.8 + Math.random() * 1.2) * dpr,
      opacity: 0.15 + Math.random() * 0.65,
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let arcAngle = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- 1. Soft Rotating Arc (No Sharp Borders) ---
      arcAngle += 0.02;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(arcAngle);

      ctx.beginPath();
      ctx.arc(0, 0, portalRadius, 0, Math.PI * 0.7);

      // Soft fading ends on both sides of the arc
      const grad = ctx.createLinearGradient(-portalRadius, 0, portalRadius, 0);
      grad.addColorStop(0, this.hexToRgba(this.color(), 0));
      grad.addColorStop(0.5, this.hexToRgba(this.color(), 0.35));
      grad.addColorStop(1, this.hexToRgba(this.color(), 0));

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5 * dpr; // Thinner, smoother stroke
      ctx.lineCap = 'round';
      ctx.shadowColor = this.color();
      ctx.shadowBlur = 12 * dpr; // Soft blur feathering instead of crisp edge
      ctx.stroke();
      ctx.restore();

      // --- 2. Inward Swirling Dust Particles ---
      particles.forEach((p, index) => {
        p.distance -= p.speed;
        p.angle += 0.008;

        const px = cx + Math.cos(p.angle) * p.distance;
        const py = cy + Math.sin(p.angle) * p.distance;

        const distanceRatio = p.distance / (portalRadius + 20 * dpr);
        const currentOpacity = p.opacity * Math.max(0, distanceRatio);

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = this.hexToRgba(this.color(), currentOpacity);
        ctx.shadowColor = this.color();
        ctx.shadowBlur = 5 * dpr;
        ctx.fill();
        ctx.restore();

        if (p.distance <= 3 * dpr) {
          particles[index] = createParticle();
        }
      });

      // --- 3. Subtle Core Point ---
      const corePulse = Math.sin(time * 0.003) * (0.6 * dpr) + (2 * dpr);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, corePulse, 0, Math.PI * 2);
      ctx.fillStyle = this.color();
      ctx.shadowColor = this.color();
      ctx.shadowBlur = 10 * dpr;
      ctx.fill();
      ctx.restore();

      this.animFrameId = requestAnimationFrame(render);
    };

    this.animFrameId = requestAnimationFrame(render);
  }

  private hexToRgba(hex: string, alpha: number): string {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map((c) => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
