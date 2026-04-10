/* ==============================================================
   SPLASH.JS  –  Animación de entrada cinematográfica
   Imagen Radiológica Diagnóstica S.A.S
   ============================================================== */
(function () {
  'use strict';

  // ─── CANVAS SETUP ────────────────────────────────────────────
  const canvas = document.getElementById('splash-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ─── PARTICLE SYSTEM ─────────────────────────────────────────
  const COLORS = ['#38bdf8', '#0ea5e9', '#818cf8', '#6366f1', '#22d3ee'];
  const PARTICLE_COUNT = window.innerWidth < 600 ? 40 : 70;
  const CONNECT_DIST   = 130;

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x   = Math.random() * canvas.width;
      this.y   = Math.random() * canvas.height;
      this.vx  = (Math.random() - 0.5) * 0.55;
      this.vy  = (Math.random() - 0.5) * 0.55;
      this.r   = Math.random() * 2.2 + 0.4;
      this.a   = Math.random() * 0.6 + 0.15;
      this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.pulse = Math.random() * Math.PI * 2; // phase
    }
    update(t) {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.02;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
      const alpha = this.a * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col;
      ctx.globalAlpha = alpha;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

  // ─── SCAN LINE ───────────────────────────────────────────────
  let scanY = 0;
  let scanDir = 1;

  // ─── DRAW CONNECTIONS ────────────────────────────────────────
  function drawConnections() {
    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const a = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${a})`;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = 1;
          ctx.stroke();
        }
      }
    }
  }

  // ─── SCAN LINE DRAW ──────────────────────────────────────────
  function drawScanLine() {
    const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
    grad.addColorStop(0,   'rgba(14,165,233,0)');
    grad.addColorStop(0.45,'rgba(14,165,233,0.06)');
    grad.addColorStop(0.5, 'rgba(56,189,248,0.18)');
    grad.addColorStop(0.55,'rgba(14,165,233,0.06)');
    grad.addColorStop(1,   'rgba(14,165,233,0)');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, scanY - 60, canvas.width, 120);
  }

  // ─── MAIN LOOP ───────────────────────────────────────────────
  let frame = 0;
  let rafId;
  let stopped = false;

  function loop() {
    if (stopped) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particles
    particles.forEach(p => p.update(frame));
    drawConnections();
    particles.forEach(p => p.draw());

    // Scan line
    scanY += 0.9 * scanDir;
    if (scanY > canvas.height + 60) scanDir = -1;
    if (scanY < -60) scanDir = 1;
    drawScanLine();

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(loop);
  }

  loop();

  // ─── ANIMATION TIMELINE ──────────────────────────────────────
  const logo       = document.getElementById('splash-logo');
  const fallback   = document.getElementById('splash-fallback');
  const compName   = document.getElementById('splash-company-name');
  const statusEl   = document.getElementById('splash-status-text');
  const progressEl = document.getElementById('splash-progress-bar');
  const pctEl      = document.getElementById('splash-pct');
  const splash     = document.getElementById('splash-screen');
  const app        = document.getElementById('app');

  const STATUSES = [
    'Iniciando sistema...',
    'Verificando módulos...',
    'Conectando con servidor...',
    'Cargando agenda de citas...',
    '¡Listo!'
  ];

  let pct = 0;
  let statusIdx = 0;

  // Animate progress + status text
  function animateProgress() {
    const target = statusIdx < STATUSES.length - 1
      ? [0, 20, 45, 75, 100][statusIdx + 1]
      : 100;

    const interval = setInterval(() => {
      if (stopped) { clearInterval(interval); return; }
      pct = Math.min(pct + 1, target);
      if (progressEl) progressEl.style.width = pct + '%';
      if (pctEl)      pctEl.textContent = pct + '%';
      if (pct >= target) clearInterval(interval);
    }, 18);
  }

  function setStatus(idx) {
    statusIdx = idx;
    if (statusEl) {
      statusEl.classList.add('status-fade');
      setTimeout(() => {
        statusEl.textContent = STATUSES[idx];
        statusEl.classList.remove('status-fade');
      }, 150);
    }
    animateProgress();
  }

  // Split company name into word spans for stagger animation
  function buildWordSpans() {
    if (!compName) return;
    const words = compName.innerText.replace(/\n/g, ' ').split(' ');
    compName.innerHTML = words
      .map((w, i) => `<span class="word-span" style="animation-delay:${1.1 + i * 0.12}s">${w}</span>`)
      .join(' ');
  }
  buildWordSpans();

  // Timeline
  const T = {
    logoReveal:    600,
    nameReveal:    1100,
    status1:       1400,
    status2:       1900,
    status3:       2400,
    status4:       2800,
    done:          3100,
    exit:          3600,
  };

  setTimeout(() => setStatus(1), T.status1);
  setTimeout(() => setStatus(2), T.status2);
  setTimeout(() => setStatus(3), T.status3);
  setTimeout(() => setStatus(4), T.done);

  // Exit: iris-close then reveal app
  setTimeout(() => {
    stopped = true;
    cancelAnimationFrame(rafId);

    splash.classList.add('iris-close');

    splash.addEventListener('animationend', () => {
      splash.style.display = 'none';
      app.classList.remove('hidden');
      app.classList.add('reveal');
    }, { once: true });
  }, T.exit);

  // Expose for cleanup
  window._splashStop = () => { stopped = true; cancelAnimationFrame(rafId); };

})();
