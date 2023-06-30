"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useLoadImage } from "@/hooks/use-load-image";
import { usePlayer } from "@/hooks/use-player";
import { Song } from "@/types";

export interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

export function MediaItem({ data, onClick }: MediaItemProps) {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleClick = useCallback(() => {
    if (onClick) return onClick(data.id);
    return player.setId(data.id);
  }, [data.id, onClick, player]);

  return (
    <div
      onClick={handleClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
      "
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        <Image
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          fill
          className="object-cover"
        />
      </div>

      <div
        className="
          flex
          flex-col
          gap-y-1
          overflow-hidden
        "
      >
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
}
