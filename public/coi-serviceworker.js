(() => {
  const base = document.baseURI;

  const mobileStyle = document.createElement('link');
  mobileStyle.rel = 'stylesheet';
  mobileStyle.href = new URL('mobile-interface.css?v=1', base).href;
  document.head.append(mobileStyle);

  const mobileScript = document.createElement('script');
  mobileScript.src = new URL('mobile-interface.js?v=1', base).href;
  mobileScript.defer = true;
  document.head.append(mobileScript);

  if (!window.isSecureContext || !navigator.serviceWorker || window.crossOriginIsolated) return;
  navigator.serviceWorker
    .register(new URL('coi-serviceworker.js', base))
    .then((registration) => {
      if (registration.active && !navigator.serviceWorker.controller) location.reload();
    })
    .catch(console.error);
})();
