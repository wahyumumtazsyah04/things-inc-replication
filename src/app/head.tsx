export default function Head() {
  return (
    <>
      {/* Preconnect hints for Next Font (defense-in-depth; next/font also inlines its own) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* NOTE: We intentionally avoid preloading CSS here since next/font handles font loading with inlined CSS */}
    </>
  );
}
