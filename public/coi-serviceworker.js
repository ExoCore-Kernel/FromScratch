/*! coi-serviceworker v0.1.7 - Guido Zuidhof and contributors, MIT licensed */
let coepCredentialless = false;

if (typeof window === 'undefined') {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener('message', (event) => {
    if (!event.data) return;
    if (event.data.type === 'deregister') {
      self.registration
        .unregister()
        .then(() => self.clients.matchAll())
        .then((clients) => clients.forEach((client) => client.navigate(client.url)));
    } else if (event.data.type === 'coepCredentialless') {
      coepCredentialless = Boolean(event.data.value);
    }
  });

  self.addEventListener('fetch', (event) => {
    const original = event.request;
    if (original.cache === 'only-if-cached' && original.mode !== 'same-origin') return;

    const request = coepCredentialless && original.mode === 'no-cors'
      ? new Request(original, {credentials: 'omit'})
      : original;

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) return response;

          const headers = new Headers(response.headers);
          headers.set(
            'Cross-Origin-Embedder-Policy',
            coepCredentialless ? 'credentialless' : 'require-corp',
          );
          if (!coepCredentialless) {
            headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
          }
          headers.set('Cross-Origin-Opener-Policy', 'same-origin');

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        })
        .catch((error) => {
          console.error('COI service worker fetch failed:', error);
          return fetch(original);
        }),
    );
  });
} else {
  (() => {
    const base = document.baseURI;
    if (!document.querySelector('link[data-fromscratch-mobile]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = new URL('mobile-interface.css?v=3', base).href;
      style.dataset.fromscratchMobile = 'true';
      document.head.append(style);
    }
    if (!document.querySelector('script[data-fromscratch-mobile]')) {
      const script = document.createElement('script');
      script.src = new URL('mobile-interface.js?v=3', base).href;
      script.defer = true;
      script.dataset.fromscratchMobile = 'true';
      document.head.append(script);
    }

    const reloadedBySelf = sessionStorage.getItem('coiReloadedBySelf');
    sessionStorage.removeItem('coiReloadedBySelf');
    const coepDegrading = reloadedBySelf === 'coepdegrade';

    const options = {
      shouldRegister: () => !reloadedBySelf,
      shouldDeregister: () => false,
      coepCredentialless: () => true,
      coepDegrade: () => true,
      doReload: () => location.reload(),
      quiet: false,
      ...window.coi,
    };

    const serviceWorker = navigator.serviceWorker;
    const controlling = serviceWorker?.controller;
    let reloadScheduled = false;

    function reloadForIsolation(reason) {
      if (reloadScheduled) return;
      reloadScheduled = true;
      sessionStorage.setItem('coiReloadedBySelf', reason);
      options.doReload(reason);
    }

    if (serviceWorker) {
      serviceWorker.addEventListener('controllerchange', () => {
        if (!window.crossOriginIsolated) reloadForIsolation('controllerchange');
      });
    }

    if (controlling && !window.crossOriginIsolated) {
      sessionStorage.setItem('coiCoepHasFailed', 'true');
    }
    const coepHasFailed = sessionStorage.getItem('coiCoepHasFailed');

    if (controlling) {
      const reloadToDegrade = options.coepDegrade()
        && !(coepDegrading || window.crossOriginIsolated);
      controlling.postMessage({
        type: 'coepCredentialless',
        value: reloadToDegrade || (coepHasFailed && options.coepDegrade())
          ? false
          : options.coepCredentialless(),
      });
      if (reloadToDegrade) {
        reloadForIsolation('coepdegrade');
        return;
      }
      if (options.shouldDeregister()) controlling.postMessage({type: 'deregister'});
    }

    if (window.crossOriginIsolated !== false || !options.shouldRegister()) return;
    if (!window.isSecureContext) {
      if (!options.quiet) console.error('Cross-origin isolation requires HTTPS or localhost.');
      return;
    }
    if (!serviceWorker) {
      if (!options.quiet) console.error('Service workers are unavailable in this browser mode.');
      return;
    }

    const workerUrl = new URL(document.currentScript.src);
    workerUrl.searchParams.set('fromscratch-sw', '4');

    serviceWorker.register(workerUrl.href, {updateViaCache: 'none'}).then(
      (registration) => {
        if (!options.quiet) console.log('COOP/COEP service worker registered:', registration.scope);
        registration.update().catch(() => {});
        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          installing?.addEventListener('statechange', () => {
            if (installing.state === 'activated' && !window.crossOriginIsolated) {
              reloadForIsolation('updatefound');
            }
          });
        });
        if (registration.active && !serviceWorker.controller) {
          reloadForIsolation('notcontrolling');
        }
      },
      (error) => {
        if (!options.quiet) console.error('COOP/COEP service worker registration failed:', error);
      },
    );
  })();
}
