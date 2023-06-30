"use client";

import { useEffect, useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { SubscribeModal } from "@/components/subscribe-modal";
import { UploadModal } from "@/components/upload-modal";
import { ProductWithPrice } from "@/types";

export interface ModalProviderProps {
  products: ProductWithPrice[];
}

export default function ModalProvider({ products }: ModalProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return !isMounted ? null : (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
}
