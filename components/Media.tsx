import Image from "next/image";
import type { CSSProperties } from "react";
import type { Img } from "@/lib/content";

type Props = {
  img?: Img;
  /** Text shown inside the gray placeholder block */
  label: string;
  /** Placeholder sizing: either a fixed height or an aspect ratio */
  height?: number;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Cover a fixed box instead of showing the image at its natural ratio */
  cover?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Shows the real image when one is set, otherwise a labeled gray placeholder.
 */
export function Media({ img, label, height, aspect, sizes, priority, cover, className, style }: Props) {
  if (!img) {
    return (
      <div
        className={`ph ${className ?? ""}`}
        style={{ height, aspectRatio: height ? undefined : aspect, ...style }}
        aria-hidden="true"
      >
        {label}
      </div>
    );
  }

  if (cover) {
    return (
      <div
        className={className}
        style={{ position: "relative", aspectRatio: aspect, height, background: "var(--ph)", ...style }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          priority={priority}
          style={{ objectFit: "cover" }}
          placeholder={img.blurDataURL ? "blur" : "empty"}
          blurDataURL={img.blurDataURL}
        />
      </div>
    );
  }

  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes ?? "(max-width: 480px) 100vw, (max-width: 1280px) 33vw, 20vw"}
      priority={priority}
      className={className}
      placeholder={img.blurDataURL ? "blur" : "empty"}
      blurDataURL={img.blurDataURL}
      style={{ display: "block", width: "100%", height: "auto", background: "var(--ph)", ...style }}
    />
  );
}
