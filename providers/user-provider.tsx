"use client";

import { ReactNode } from "react";
import { MyUserContextProvider } from "@/hooks/use-user";

export interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider(props: UserProviderProps) {
  return <MyUserContextProvider>{props.children}</MyUserContextProvider>;
}
