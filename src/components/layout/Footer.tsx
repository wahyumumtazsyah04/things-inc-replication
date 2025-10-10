import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-10 text-sm text-gray-600">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Things, Inc. All rights reserved.</p>
          <nav className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-black">Privacy</Link>
            <Link href="/terms" className="hover:text-black">Terms</Link>
            <Link href="/contact" className="hover:text-black">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
