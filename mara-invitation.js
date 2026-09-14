// The existing silent Cloudflare clip is an invitation, never a voice session.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
for (const container of document.querySelectorAll('.mara-video-invitation')) {
  const video = container.querySelector('video');
  const toggle = container.querySelector('.mara-motion-toggle');
  if (!video || !toggle) continue;
  let visible = false;
  let userPaused = false;
  let failed = false;
  let navigating = false;
  const mayPlay = () => visible && !document.hidden && !reducedMotion.matches && !userPaused && !failed && !navigating;
  function syncPlayback() {
    if (!mayPlay()) {
      video.pause();
      if (reducedMotion.matches || failed) video.classList.remove('is-ready');
      return;
    }
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.muted = true;
    if (video.paused) video.play().catch(() => video.classList.remove('is-ready'));
  }
  video.addEventListener('playing', () => {
    if (!mayPlay()) return syncPlayback();
    video.classList.add('is-ready');
    toggle.hidden = false;
  });
  video.addEventListener('error', () => {
    failed = true;
    toggle.hidden = true;
    syncPlayback();
  });
  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.setAttribute('aria-label', userPaused ? 'Animation abspielen' : 'Animation pausieren');
    toggle.textContent = userPaused ? '▶' : 'Ⅱ';
    syncPlayback();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: .1 }).observe(container);
  }
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', syncPlayback);
  document.querySelectorAll('a[href="/mara"]').forEach(link => link.addEventListener('click', () => {
    navigating = true;
    syncPlayback();
  }));
  window.addEventListener('pagehide', () => { navigating = true; video.pause(); });
  window.addEventListener('pageshow', () => { navigating = false; syncPlayback(); });
}
