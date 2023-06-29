"use client";

import { useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { MediaItem } from "@/components/media-item";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useOnPlay } from "@/hooks/use-on-play";
import { useUploadModal } from "@/hooks/use-upload-modal";
import useUser from "@/hooks/use-user";
import { Song } from "@/types";

export interface LibraryProps {
  songs: Song[];
}

export default function Library({ songs }: LibraryProps) {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);

  const handleClick = useCallback(() => {
    if (!user) return authModal.onOpen();

    // TODO: Check for subscription

    return uploadModal.onOpen();
  }, [authModal, uploadModal, user]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your library</p>
        </div>

        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem key={song.id} onClick={onPlay} data={song} />
        ))}
      </div>
    </div>
  );
}
