// Sala de test · respaldo
// Corre dentro del prototipo de Figma cuando está insertado en la Sala de test.
// Envía a la sala: un saludo, cada clic (posición y tamaño de la vista) y cada cambio de dirección (node-id = pantalla).
// No lee contenido, no guarda nada y no hace nada si el prototipo no está dentro de otra página.
(() => {
  if (window.top === window) return; // solo cuando está insertado en la sala
  const send = (msg) => {
    try { window.top.postMessage({ source: "sala-respaldo", t: Date.now(), ...msg }, "*"); } catch (e) {}
  };
  send({ type: "hola", href: location.href });

  // Clics (fase de captura: llegan aunque Figma los detenga después)
  window.addEventListener("pointerdown", (e) => {
    send({ type: "clic", x: e.clientX, y: e.clientY, vw: window.innerWidth, vh: window.innerHeight });
  }, true);

  // Cambios de pantalla: Figma actualiza node-id en la dirección al navegar
  let last = location.href;
  const check = () => {
    if (location.href !== last) { last = location.href; send({ type: "url", href: last }); }
  };
  ["pushState", "replaceState"].forEach((fn) => {
    const orig = history[fn];
    history[fn] = function () { const r = orig.apply(this, arguments); setTimeout(check, 0); return r; };
  });
  window.addEventListener("popstate", check);
  setInterval(check, 500);
  send({ type: "url", href: location.href });
})();
