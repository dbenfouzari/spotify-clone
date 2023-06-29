"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuthModal } from "@/hooks/use-auth-modal";
import useUser from "@/hooks/use-user";

export interface LikeButtonProps {
  songId: string;
}

export function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    supabaseClient
      .from("liked_songs")
      .select("*")
      .eq("user_id", user.id)
      .eq("song_id", songId)
      .single()
      .then(({ data, error }) => {
        if (!error && data) return setIsLiked(true);
      });
  }, [songId, supabaseClient, user?.id]);

  const handleLike = useCallback(async () => {
    if (!user) return authModal.onOpen();

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }

    router.refresh();
  }, [authModal, isLiked, songId, supabaseClient, user]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button
      className="
        hover:opacity-75
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
}
