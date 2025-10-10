export type BlogPostMeta = { slug: string; title: string; summary?: string; date?: string };

// Placeholder: switch to reading MDX files or CMS
export async function listBlogPosts(): Promise<BlogPostMeta[]> {
  return [
    { slug: "artikel-pertama", title: "Artikel Pertama", summary: "Pengantar rekonstruksi modern", date: "2025-10-01" },
    { slug: "artikel-kedua", title: "Artikel Kedua", summary: "Migrasi animasi ke GSAP + React", date: "2025-10-05" },
  ];
}
