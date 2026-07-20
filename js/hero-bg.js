(function initHeroBackground() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let nodes = [];
  let pulses = [];
  let animationId = null;
  let lastTime = 0;

  const NODE_COUNT = 48;
  const MAX_DISTANCE = 140;
  const RGB = { r: 56, g: 148, b: 255 };
  const COLORS = {
    node: `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, 0.92)`,
    nodeGlow: `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, 0.38)`,
    pulse: `rgba(120, 185, 255, 0.9)`,
    grid: `rgba(40, 100, 200, 0.08)`,
    fade: `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, 0)`,
  };

  function resize() {
    const hero = canvas.closest(".hero");
    if (!hero) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.85,
      vy: (Math.random() - 0.5) * 0.85,
      radius: 1.2 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function spawnPulse(a, b) {
    if (pulses.length > 32) return;
    pulses.push({
      from: a,
      to: b,
      t: 0,
      speed: 0.012 + Math.random() * 0.014,
    });
  }

  function drawGrid() {
    const step = 48;
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  function drawConnections(time) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > MAX_DISTANCE) continue;

        const alpha = (1 - dist / MAX_DISTANCE) * 0.55;
        ctx.strokeStyle = `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, ${alpha * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (Math.random() < 0.0025) spawnPulse(a, b);
      }
    }

    pulses = pulses.filter((pulse) => {
      pulse.t += pulse.speed;
      if (pulse.t >= 1) return false;

      const x = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.t;
      const y = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.t;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
      glow.addColorStop(0, COLORS.pulse);
      glow.addColorStop(1, COLORS.fade);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      return true;
    });
  }

  function drawNodes(time) {
    nodes.forEach((node) => {
      const pulse = 0.65 + Math.sin(time * 0.005 + node.phase) * 0.35;
      const r = node.radius * pulse;

      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
      glow.addColorStop(0, COLORS.nodeGlow);
      glow.addColorStop(1, COLORS.fade);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = COLORS.node;
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function updateNodes() {
    nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));
    });
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawConnections(time);
    drawNodes(time);
    updateNodes();
  }

  function loop(time) {
    if (time - lastTime > 16) {
      draw(time);
      lastTime = time;
    }
    animationId = requestAnimationFrame(loop);
  }

  function start() {
    resize();
    createNodes();
    if (animationId) cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => {
    resize();
    createNodes();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
      animationId = null;
    } else if (!animationId) {
      animationId = requestAnimationFrame(loop);
    }
  });

  start();
})();
