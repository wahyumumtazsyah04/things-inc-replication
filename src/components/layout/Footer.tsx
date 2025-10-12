import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const social = {
    youtube: "https://www.youtube.com/@things-inc",
    x: "https://x.com/things",
    threads: "https://www.threads.net/@things_incorporated?hl=en",
    tiktok: "https://www.tiktok.com/@things",
    discord: "https://discord.gg/rooms",
    instagram: "https://www.instagram.com/things_incorporated/",
};

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="relative border-t pt-16 pb-10 text-sm text-[color:var(--zenotika-muted)]">
            {/* Clouds bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden">
                <Image
                    src="/thingsinc/66f367a805dd39bee16d5312_footer-clouds-bottom_day.png"
                    alt="clouds bottom day"
                    width={1600}
                    height={200}
                    className="theme-day-only absolute inset-x-0 bottom-0 h-auto w-full object-cover"
                />
                <Image
                    src="/thingsinc/66f367a8a723298ff33cee0f_footer-clouds-bottom_night.png"
                    alt="clouds bottom night"
                    width={1600}
                    height={200}
                    className="theme-night-only absolute inset-x-0 bottom-0 h-auto w-full object-cover"
                />
            </div>
            <div className="relative mx-auto max-w-6xl px-4">
                <Reveal selector=":scope > *" stagger={0.08} className="grid grid-cols-2 gap-8 grid-gap-responsive sm:grid-cols-4">
                    <div>
                        <h4 className="text-[color:var(--foreground)]">Explore</h4>
                        <ul className="mt-3 space-y-2">
                            <li><Link href="/" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">Home</Link></li>
                            <li><Link href="/about-us" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">About us</Link></li>
                            <li><Link href="/log-book" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">Log book</Link></li>
                            <li><Link href="/contact" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[color:var(--foreground)]">Our Things</h4>
                        <ul className="mt-3 space-y-2">
                            <li><Link href="/rooms" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">Rooms</Link></li>
                            <li><Link href="/a-bunch-of-things" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">A Bunch of Things</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[color:var(--foreground)]">Legal</h4>
                        <ul className="mt-3 space-y-2">
                            <li><Link href="/privacy" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">Terms & Conditions</Link></li>
                            <li><Link href="/assets" className="cursor-hoverable underline-anim link-reset transition-colors text-[color:var(--foreground)]/80 hover:text-[color:var(--link-hover)]">Media Assets</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[color:var(--foreground)]">Follow</h4>
                        <Reveal selector=":scope > a" stagger={0.06} className="mt-3 flex items-center gap-3">
                            {/* Order per live site: Discord, Tiktok, Instagram, X/Twitter, Youtube, Threads */}
                            <a href={social.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord" className="transition-opacity hover:opacity-80">
                                <Image src="/thingsinc/66f36059c82b1e5845d15655_footer_discord-day.svg" alt="Discord" width={24} height={24} className="theme-day-only" />
                                <Image src="/thingsinc/66f3602a274968c5aa7bb8ff_footer_discord-night.svg" alt="Discord" width={24} height={24} className="theme-night-only" />
                            </a>
                            <a href={social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-opacity hover:opacity-80">
                                <Image src="/thingsinc/66f36058d48d217d932d7ac5_footer_tiktok-day.svg" alt="TikTok" width={24} height={24} className="theme-day-only" />
                                <Image src="/thingsinc/66f36058957f8216930752e7_footer_tiktok-night.svg" alt="TikTok" width={24} height={24} className="theme-night-only" />
                            </a>
                            <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-80">
                                <Image src="/thingsinc/66f360582d624b679becc8a8_footer_instagram-day.svg" alt="Instagram" width={24} height={24} className="theme-day-only" />
                                <Image src="/thingsinc/66f3605861a90f310acdf217_footer_instagram-night.svg" alt="Instagram" width={24} height={24} className="theme-night-only" />
                            </a>
                            <a href={social.x} target="_blank" rel="noopener noreferrer" aria-label="X" className="transition-opacity hover:opacity-80">
                                <Image src="/thingsinc/66f36058b123ca59990b0d2c_footer_x-day.svg" alt="X" width={24} height={24} className="theme-day-only" />
                                <Image src="/thingsinc/66f360584e79b06365002187_footer_x-night.svg" alt="X" width={24} height={24} className="theme-night-only" />
                            </a>
                            <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-opacity hover:opacity-80">
                                <Image src="/thingsinc/66f36059e1b812491915e08b_footer_youtube-day.svg" alt="YouTube" width={24} height={24} className="theme-day-only" />
                                <Image src="/thingsinc/66f360594367a3be3f06f61a_footer_youtube-night.svg" alt="YouTube" width={24} height={24} className="theme-night-only" />
                            </a>
                            <a href={social.threads} target="_blank" rel="noopener noreferrer" aria-label="Threads" className="transition-opacity hover:opacity-80">
                                <Image src="/thingsinc/66f3605939c6b8addd616a6c_footer_threads-day.svg" alt="Threads" width={24} height={24} className="theme-day-only" />
                                <Image src="/thingsinc/66f3609217acabd402d408dc_footer_threads-night.svg" alt="Threads" width={24} height={24} className="theme-night-only" />
                            </a>
                        </Reveal>
                    </div>
                </Reveal>

                <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs text-[color:var(--foreground)]/60 sm:flex-row">
                    <p>© {year} Things, Inc. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        <Link href="/privacy" className="cursor-hoverable underline-anim link-reset transition-colors hover:text-[color:var(--link-hover)]">Privacy Policy</Link>
                        <Link href="/terms" className="cursor-hoverable underline-anim link-reset transition-colors hover:text-[color:var(--link-hover)]">Terms & Conditions</Link>
                        <Link href="/assets" className="cursor-hoverable underline-anim link-reset transition-colors hover:text-[color:var(--link-hover)]">Media Assets</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
