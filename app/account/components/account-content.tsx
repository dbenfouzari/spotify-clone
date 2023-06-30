"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/button";
import { useSubscribeModal } from "@/hooks/use-subscribe-modal";
import useUser from "@/hooks/use-user";
import { postData } from "@/libs/helpers";

export interface AccountContentProps {}

export function AccountContent({}: AccountContentProps) {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading: isLoadingUser, subscription, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && !user) router.replace("/");
  }, [isLoadingUser, router, user]);

  const redirectToCustomerPortal = useCallback(async () => {
    setIsLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error).message);
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="mb-7">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}

      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription.prices?.products?.name}</b> plan.
          </p>

          <Button
            className="w-[300px]"
            disabled={isLoading || isLoadingUser}
            onClick={redirectToCustomerPortal}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
