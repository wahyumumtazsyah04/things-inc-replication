"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function NotFoundContent() {
  const messages = [
    "We couldn’t find the thing you were looking for.",
    "The page took a wrong turn at the portal.",
    "Oops—this room is still under construction.",
  ];
  const [msg, setMsg] = React.useState(messages[0]);
  React.useEffect(() => {
    setMsg(messages[Math.floor(Math.random() * messages.length)]);
  }, []);
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center" aria-labelledby="nf-title">
      <h1 id="nf-title" className="animate-in fade-in slide-in-from-top-2 duration-500 text-4xl font-bold tracking-tight">404</h1>
      <p className="animate-in fade-in slide-in-from-top-2 delay-150 duration-500 mt-2 text-[color:var(--zenotika-muted)]">{msg}</p>
      <div className="animate-in fade-in slide-in-from-bottom-2 delay-200 duration-500 mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Image src="/thingsinc/67297fcbc32f2abc0494d557_hex_room_4.webp" alt="hex room 4" width={240} height={240} className="h-auto w-full rounded-lg border object-cover" />
        <Image src="/thingsinc/67297fcb7f6587d3dc450334_hex_room_6.webp" alt="hex room 6" width={240} height={240} className="h-auto w-full rounded-lg border object-cover" />
        <Image src="/thingsinc/67297fcb79d42fdd90bf5e93_hex_room_2.webp" alt="hex room 2" width={240} height={240} className="h-auto w-full rounded-lg border object-cover" />
        <Image src="/thingsinc/67297fcbe000ef9fec53986f_hex_room_18.webp" alt="hex room 18" width={240} height={240} className="h-auto w-full rounded-lg border object-cover" />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="inline-flex items-center rounded-md border px-4 py-2 hover:opacity-90" aria-label="Go back to Home">
          Home
        </Link>
        <Link href="/about-us" className="inline-flex items-center rounded-md border px-4 py-2 hover:opacity-90" aria-label="Read about us">
          About us
        </Link>
        <Link href="/log-book" className="inline-flex items-center rounded-md border px-4 py-2 hover:opacity-90" aria-label="View the Log book">
          Log book
        </Link>
        <Link href="/contact" className="inline-flex items-center rounded-md border px-4 py-2 hover:opacity-90" aria-label="Contact us">
          Contact
        </Link>
      </div>
    </section>
  );
}
