// Mapa de calor de clics sobre el esquema de cada pantalla (window.PANTALLAS).
// Cada punto: {s: pantalla, x, y (relativos al frame que se hace scroll), ox, oy (scroll), sf (frame del scroll), ok (tuvo respuesta), t, tarea}
window.Calor = (function () {
  function desde(d, extra) {
    const p = d.nearestScrollingFrameMousePosition, o = d.nearestScrollingFrameOffset || { x: 0, y: 0 };
    return Object.assign({
      s: d.presentedNodeId || null,
      sf: d.nearestScrollingFrameId || null,
      x: p ? p.x : null, y: p ? p.y : null, ox: o.x || 0, oy: o.y || 0,
      tx: d.targetNodeMousePosition ? d.targetNodeMousePosition.x : null,
      ty: d.targetNodeMousePosition ? d.targetNodeMousePosition.y : null,
      id: d.targetNodeId || null, ok: !!d.handled
    }, extra || {});
  }
  // Posición final en coordenadas del frame. sumarScroll: suma el desplazamiento (ajuste por si Figma ya lo incluye).
  function pos(p, sumarScroll) {
    if (p.x == null) return null;
    if (p.sf && p.s && p.sf !== p.s && !String(p.sf).startsWith(String(p.s))) {
      // scroll interno (ej. carrusel): no sabemos dónde está ese frame; se usa igual, marcado como aproximado
      return { x: p.x, y: p.y, aprox: true };
    }
    return { x: p.x + (sumarScroll ? p.ox : 0), y: p.y + (sumarScroll ? p.oy : 0), aprox: false };
  }
  const PAL = (() => { // azul → verde → amarillo → rojo
    const c = document.createElement('canvas'); c.width = 256; c.height = 1; const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 256, 0);
    gr.addColorStop(0, 'rgba(0,0,255,0)'); gr.addColorStop(0.25, '#2b6cff'); gr.addColorStop(0.5, '#22c55e'); gr.addColorStop(0.75, '#facc15'); gr.addColorStop(1, '#ef4444');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 1); return g.getImageData(0, 0, 256, 1).data;
  })();
  function render(canvas, screenId, puntos, opt) {
    opt = Object.assign({ ancho: canvas.parentElement ? canvas.parentElement.clientWidth : 380, sumarScroll: true, soloFallidos: false, nombres: true }, opt || {});
    const P = (window.PANTALLAS || {})[screenId];
    const w = P ? P.w : 1920, h = P ? P.h : 1080;
    const W = Math.max(200, opt.ancho), k = W / w, H = Math.round(h * k), dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    const g = canvas.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#faf7f2'; g.fillRect(0, 0, W, H);
    g.font = '10px Poppins, system-ui, sans-serif'; g.textBaseline = 'top';
    if (P) {
      for (const [x, y, ww, hh, n] of P.s) { g.fillStyle = '#efe9e1'; g.strokeStyle = '#d9d0c4'; g.lineWidth = 1; g.fillRect(x * k, y * k, ww * k, hh * k); g.strokeRect(x * k + .5, y * k + .5, ww * k - 1, hh * k - 1); if (opt.nombres) { g.fillStyle = '#6f6860'; g.font = (W > 700 ? '600 13px' : '600 10px') + ' Poppins, system-ui, sans-serif'; g.fillText(n, x * k + 6, y * k + 4) } }
    }
    const pts = puntos.filter(p => p.s === screenId && (!opt.soloFallidos || !p.ok) && (!opt.tarea || p.tarea === opt.tarea));
    const xy = pts.map(p => ({ p, q: pos(p, opt.sumarScroll) })).filter(o => o.q);
    // zonas con clic + conteo
    const hits = [];
    if (P) {
      g.setLineDash([3, 3]);
      for (const [x, y, ww, hh, n] of P.k) {
        const c = xy.filter(o => o.q.x >= x && o.q.x <= x + ww && o.q.y >= y && o.q.y <= y + hh).length;
        hits.push({ n, c });
        g.fillStyle = 'rgba(255,255,255,.75)'; g.fillRect(x * k, y * k, Math.max(2, ww * k), Math.max(2, hh * k)); g.strokeStyle = c ? 'rgba(61,55,106,.9)' : 'rgba(61,55,106,.45)'; g.lineWidth = 1; g.strokeRect(x * k + .5, y * k + .5, Math.max(2, ww * k - 1), Math.max(2, hh * k - 1));
      }
      g.setLineDash([]);
    }
    // calor
    if (xy.length) {
      const off = document.createElement('canvas'); off.width = W; off.height = H; const o = off.getContext('2d');
      const r = Math.max(14, Math.min(40, 36 * k * (w > 1000 ? 1.4 : 1)));
      for (const { q } of xy) { const gr = o.createRadialGradient(q.x * k, q.y * k, 0, q.x * k, q.y * k, r); gr.addColorStop(0, 'rgba(0,0,0,.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); o.fillStyle = gr; o.fillRect(q.x * k - r, q.y * k - r, r * 2, r * 2) }
      const img = o.getImageData(0, 0, W, H), d = img.data;
      for (let i = 0; i < d.length; i += 4) { const a = d[i + 3]; if (!a) continue; const j = Math.min(255, a * 1.4 | 0) * 4; d[i] = PAL[j]; d[i + 1] = PAL[j + 1]; d[i + 2] = PAL[j + 2]; d[i + 3] = Math.min(220, a * 1.6) }
      const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H; tmp.getContext('2d').putImageData(img, 0, 0); g.drawImage(tmp, 0, 0);
      // clics sin respuesta: aro rojo
      for (const { p, q } of xy) if (!p.ok) { g.strokeStyle = '#b4233c'; g.lineWidth = 1.5; g.beginPath(); g.arc(q.x * k, q.y * k, 4, 0, Math.PI * 2); g.stroke() }
    }
    // contadores en zonas
    if (P) {
      g.font = '600 10px Poppins, system-ui, sans-serif';
      P.k.forEach(([x, y, ww], i) => { const c = hits[i].c; if (!c) return; const cx = (x + ww) * k, cy = y * k; g.fillStyle = '#3d376a'; g.beginPath(); g.arc(cx, cy, 8, 0, Math.PI * 2); g.fill(); g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(c), cx, cy); g.textAlign = 'left'; g.textBaseline = 'top' });
    }
    return {
      total: pts.length, ubicados: xy.length, sinPos: pts.length - xy.length,
      fallidos: pts.filter(p => !p.ok).length,
      fuera: xy.filter(o => o.q.x < 0 || o.q.y < 0 || o.q.x > w || o.q.y > h).length,
      zonas: hits.filter(z => z.c).sort((a, b) => b.c - a.c)
    };
  }
  function pantallasCon(puntos) { const m = {}; for (const p of puntos) if (p.s) m[p.s] = (m[p.s] || 0) + 1; return m }
  return { desde, render, pantallasCon, pos };
})();
