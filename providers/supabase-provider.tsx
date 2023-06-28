"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ReactNode, useRef } from "react";
import { Database } from "@/type_db";

export interface SupabaseProviderProps {
  children: ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  const supabaseClient = useRef(
    createClientComponentClient<Database>()
  ).current;

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
