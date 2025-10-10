"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  rootMargin?: string;
  once?: boolean;
  className?: string;
};

export default function MountOnVisible({ children, rootMargin = "0px 0px -20% 0px", once = true, className = "" }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { root: null, rootMargin, threshold: [0, 0.05, 0.15, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return <div ref={ref} className={className}>{visible ? children : null}</div>;
}
