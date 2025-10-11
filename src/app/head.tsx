export default function Head() {
  return (
    <>
      {/* Preconnect hints for Next Font (defense-in-depth; next/font also inlines its own) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* Preload sweep/tunnel mask used in CSS masks and overlays */}
      <link rel="preload" as="image" href="/thingsinc/673a97406afd64c0cd3e355b_tunnel-with-mask.svg" type="image/svg+xml" />
      {/* NOTE: We intentionally avoid preloading CSS here since next/font handles font loading with inlined CSS */}
    </>
  );
}
