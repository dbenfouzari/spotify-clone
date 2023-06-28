"use client";

import { useEffect, useState } from "react";
import { AuthModal } from "@/components/auth-modal";
import { UploadModal } from "@/components/upload-modal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return !isMounted ? null : (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
}
