import { useCallback } from "react";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { usePlayer } from "@/hooks/use-player";
import useUser from "@/hooks/use-user";
import { Song } from "@/types";

export function useOnPlay(songs: Song[]) {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = useCallback(
    (songId: string) => {
      if (!user) return authModal.onOpen();

      player.setId(songId);
      player.setIds(songs.map((song) => song.id));
    },
    [authModal, player, songs, user]
  );

  return onPlay;
}
