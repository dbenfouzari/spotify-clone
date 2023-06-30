import { useCallback } from "react";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { usePlayer } from "@/hooks/use-player";
import { useSubscribeModal } from "@/hooks/use-subscribe-modal";
import useUser from "@/hooks/use-user";
import { Song } from "@/types";

export function useOnPlay(songs: Song[]) {
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const { user, subscription } = useUser();

  const onPlay = useCallback(
    (songId: string) => {
      if (!user) return authModal.onOpen();
      if (!subscription) return subscribeModal.onOpen();

      player.setId(songId);
      player.setIds(songs.map((song) => song.id));
    },
    [authModal, player, songs, subscribeModal, subscription, user]
  );

  return onPlay;
}
