"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { Media } from "@/lib/experience";

type Props = { media: Media; className?: string; sizes: string };

// Renders a looping muted screen recording or a still image.
// Videos only play while on screen, and never when the visitor prefers reduced motion.
export default function MediaFrame({ media, className, sizes }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (reducedMotion) {
      el.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (media.type === "image") {
    return (
      <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} className={className} />
    );
  }

  return (
    <video
      ref={video}
      className={className}
      src={media.src}
      aria-label={media.label}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
