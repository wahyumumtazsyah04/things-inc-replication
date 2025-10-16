export default function Head() {
  return (
    <>
      {/* Early motion preference init: set data-motion before hydration to avoid flashes */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(() => { try {
            var pref = localStorage.getItem('motionPref') || 'auto';
            var reduced = pref === 'reduced' ? true : (pref === 'full' ? false : window.matchMedia('(prefers-reduced-motion: reduce)').matches);
            var val = reduced ? 'reduced' : (pref === 'full' ? 'full' : 'auto');
            document.documentElement.setAttribute('data-motion', val);
            if (reduced) {
              document.documentElement.style.setProperty('--motion-disabled', '1');
            }
          } catch(e){} })();`,
        }}
      />
      {/* Dynamic theme-color for address bar and system UI */}
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f0e16" />
      {/* Preconnect hints for Next Font (defense-in-depth; next/font also inlines its own) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Preload sweep/tunnel mask used in CSS masks and overlays */}
      <link rel="preload" as="image" href="/thingsinc/673a97406afd64c0cd3e355b_tunnel-with-mask.svg" type="image/svg+xml" />
      {/* Preload hero logo variants to improve LCP (match Hero.tsx assets) */}
      <link rel="preload" as="image" href="/thingsinc/6724406f04b26f75915dd8c2_Home-logo_day.webp" type="image/webp" />
      <link rel="preload" as="image" href="/thingsinc/6705b9208ebb9e666ec8413b_Home-logo_night.webp" type="image/webp" />
      {/* Optional analytics preconnects when GA is enabled */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        </>
      )}
      {/* Optional CDN preconnect if serving remote images */}
      <link rel="dns-prefetch" href="//cdn.prod.website-files.com" />
      <link rel="preconnect" href="https://cdn.prod.website-files.com" crossOrigin="anonymous" />
      {/* NOTE: We intentionally avoid preloading CSS here since next/font handles font loading with inlined CSS */}
    </>
  );
}
