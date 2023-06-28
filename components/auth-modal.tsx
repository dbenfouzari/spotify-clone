"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import Modal from "@/components/modal";
import { useAuthModal } from "@/hooks/use-auth-modal";

export interface AuthModal {}

export function AuthModal(props: AuthModal) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [onClose, router, session]);

  const handleChange = useCallback(() => {
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onChange={handleChange}
      title="Welcome back"
      description="Login to your account"
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["github"]}
        theme="dark"
        magicLink
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
}
