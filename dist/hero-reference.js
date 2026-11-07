(() => {
  const portrait = document.querySelector('.hero .portrait-frame img');
  const hero = document.querySelector('.hero');
  if (!portrait || !hero) return;
  const frame = portrait.closest('.portrait-frame');
  const mask = window.portraitMask ? atob(window.portraitMask) : '';
  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const bounds = hero.getBoundingClientRect();
    const offset = (event.clientX - bounds.left) / bounds.width - .5;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) portrait.style.translate = `${offset * 12}px 0`;
    if (!mask || !frame || !portrait.naturalWidth || event.target.closest('a, button')) { portrait.classList.remove('is-highlighted'); return; }
    const rect = portrait.getBoundingClientRect();
    const clip = frame.getBoundingClientRect();
    const x = event.clientX, y = event.clientY;
    if (x < clip.left || x >= clip.right || y < clip.top || y >= clip.bottom) { portrait.classList.remove('is-highlighted'); return; }
    const scale = Math.max(rect.width / portrait.naturalWidth, rect.height / portrait.naturalHeight);
    const imageLeft = rect.left + (rect.width - portrait.naturalWidth * scale) / 2;
    const px = Math.floor((x - imageLeft) / (portrait.naturalWidth * scale) * 135);
    const py = Math.floor((y - rect.top) / (portrait.naturalHeight * scale) * 180);
    const index = py * 135 + px;
    const visible = px >= 0 && px < 135 && py >= 0 && py < 180 && (mask.charCodeAt(index >> 3) & (1 << (index & 7))) !== 0;
    portrait.classList.toggle('is-highlighted', visible);
  });
  hero.addEventListener('pointerleave', () => { portrait.style.translate = ''; portrait.classList.remove('is-highlighted'); });
})();
