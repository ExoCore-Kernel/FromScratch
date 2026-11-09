(() => {
  if (typeof window === 'undefined') {
    self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
    self.addEventListener('fetch', event => {
      if (new URL(event.request.url).origin !== self.location.origin ||
          (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')) return;
      event.respondWith((async () => {
        const response = await fetch(event.request);
        if (response.status === 0) return response;
        const headers = new Headers(response.headers);
        headers.set('Cross-Origin-Opener-Policy', 'same-origin');
        headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
        return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
      })());
    });
    return;
  }
  if (!window.isSecureContext || !navigator.serviceWorker || window.crossOriginIsolated) return;
  navigator.serviceWorker.addEventListener('controllerchange', () => location.reload(), {once: true});
  navigator.serviceWorker.register(new URL('coi-serviceworker.js', document.baseURI)).then(registration => {
    if (registration.active && !navigator.serviceWorker.controller) location.reload();
  }).catch(console.error);
})();
