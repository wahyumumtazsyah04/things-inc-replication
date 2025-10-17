import React from "react";
import Image from "next/image";

type Quote = {
    handle: string;
    platform: "tiktok" | "x" | "instagram";
    text: string;
};

const ICONS: Record<Quote["platform"], { day: string; night: string; alt: string }> = {
    tiktok: {
        day: "/thingsinc/66f36058d48d217d932d7ac5_footer_tiktok-day.svg",
        night: "/thingsinc/66f36058957f8216930752e7_footer_tiktok-night.svg",
        alt: "TikTok logo",
    },
    x: {
        day: "/thingsinc/66f36058b123ca59990b0d2c_footer_x-day.svg",
        night: "/thingsinc/66f360584e79b06365002187_footer_x-night.svg",
        alt: "X logo",
    },
    instagram: {
        day: "/thingsinc/66f360582d624b679becc8a8_footer_instagram-day.svg",
        night: "/thingsinc/66f3605861a90f310acdf217_footer_instagram-night.svg",
        alt: "Instagram logo",
    },
};

const QUOTES: Quote[] = [
    { handle: "dimasvedovato", platform: "tiktok", text: "Rooms.xyz é um jogo que mistura The Sims com Roblox e o melhor de tudo: é de graça!" },
    { handle: "@weezer", platform: "x", text: "Come on a voyage with us through the Blue Rooms. We made one level for each song on the album. Follow the maze for a surprise at the end." },
    { handle: "willbwrs", platform: "instagram", text: "Incredible user-created room showcase." },
    { handle: "@rinoekakiroom", platform: "x", text: "HIDDEN GEMS OF THE APP STORE - Part 8 👀📱💎" },
    { handle: "voxel.play.yard", platform: "instagram", text: "見つけました…動画観てもらえば楽しさが伝わるはず！" },
    { handle: "cozyteagames", platform: "tiktok", text: "All my decorating energy is being channeled into Rooms.xyz and i love it 🥰" },
    { handle: "0forestmaiden0", platform: "instagram", text: "Colorful Mod Bedroom 💚💛" },
    { handle: "@jaystansfield", platform: "x", text: "Explore, create, learn to code, have fun! What else could you ask for really??" },
    { handle: "viviroominates", platform: "instagram", text: "縁側 particle effect fever dream 4/28/24/engawa" },
    { handle: "@araelric", platform: "x", text: "I created a Christmas Cozy Room where you can chat with me and other characters!" },
    { handle: "foxssei", platform: "tiktok", text: "i'm really really loving rooms by @Things, Inc. 🫠🪧💗 specially because is totally free & no ads ♡" },
    { handle: "pixelvixen_", platform: "instagram", text: "So I released this room ✨ If you want to see more details, go check it 🌸" },
    { handle: "@alcyone_chan", platform: "x", text: "Édouard Manet's A Bar at the Folies-Bergère" },
    { handle: "rooms.xyz_vn", platform: "tiktok", text: "Rooms.xyz é um jogo que mistura The Sims com Roblox e o melhor de tudo: é de graça!" },
    { handle: "@sofiroom", platform: "x", text: "My new cozy reading nook in Rooms is everything. ☕📚✨" },
    { handle: "roomsoftheday", platform: "instagram", text: "Today's pick: a stunning neon cyberpunk loft. Absolutely mesmerizing." },
    { handle: "craftycozy", platform: "tiktok", text: "Can't stop decorating in Rooms.xyz… send help 😂" },
    { handle: "@pixelatelier", platform: "x", text: "Teaching my kid loops and variables with Rooms. Never seen them so excited to learn!" },
    { handle: "lofimornings", platform: "instagram", text: "Built a lo-fi studio and now I just chill here while I work IRL." },
    { handle: "cookiewaves", platform: "tiktok", text: "This cooking sim kitchen I made in Rooms is my happy place." },
];

export default function Testimonials() {
    return (
        <section className="mx-auto mt-16 max-w-6xl px-4">
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Here are some of the things people have said about Rooms</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {QUOTES.map((q, i) => {
                    const icon = ICONS[q.platform];
                    const handle = q.handle.replace(/^@/, "");
                    const profileUrl =
                        q.platform === "tiktok"
                            ? `https://www.tiktok.com/@${handle}`
                            : q.platform === "instagram"
                                ? `https://www.instagram.com/${handle}/`
                                : `https://x.com/${handle}`;
                    return (
                        <figure key={i} className="rounded-lg border p-4">
                            <div className="flex items-center gap-2 text-sm text-[color:var(--zenotika-muted)]">
                                <Image src={icon.day} alt={icon.alt} width={16} height={16} className="theme-day-only" />
                                <Image src={icon.night} alt={icon.alt} width={16} height={16} className="theme-night-only" />
                                <a
                                    href={profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${q.handle} on ${q.platform} (opens in new tab)`}
                                    className="underline-anim link-reset hover:text-[color:var(--link-hover)]"
                                >
                                    {q.handle}
                                </a>
                            </div>
                            <blockquote className="mt-2 text-[color:var(--foreground)]/90">{q.text}</blockquote>
                        </figure>
                    );
                })}
            </div>
        </section>
    );
}
