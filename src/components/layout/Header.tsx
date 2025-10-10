"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-6 w-6 rounded bg-gray-900" aria-hidden />
          <span>Things, Inc.</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-gray-700">
          <Link href="/products" className="hover:text-black">Products</Link>
          <Link href="/pricing" className="hover:text-black">Pricing</Link>
          <Link href="/blog" className="hover:text-black">Blog</Link>
          <Link href="/company/about" className="hover:text-black">About</Link>
          <Link href="#" className="rounded border px-3 py-1.5 hover:bg-gray-50">Login</Link>
        </nav>
      </div>
    </header>
  );
}
