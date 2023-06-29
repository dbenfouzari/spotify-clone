import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { getSongs } from "@/actions/get-songs";
import { Song } from "@/types";

export async function getSongsByTitle(title: string): Promise<Song[]> {
  const supabase = createServerComponentClient({ cookies });

  if (!title) return getSongs();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
}
