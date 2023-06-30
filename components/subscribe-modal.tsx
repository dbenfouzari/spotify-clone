"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/button";
import Modal from "@/components/modal";
import { useSubscribeModal } from "@/hooks/use-subscribe-modal";
import useUser from "@/hooks/use-user";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripe-client";
import { Price, ProductWithPrice } from "@/types";

export interface SubscribeModalProps {
  products: ProductWithPrice[];
}

function formatPrice(price: Price) {
  const priceString = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price.unit_amount || 0) / 100);

  return priceString;
}

export function SubscribeModal({ products }: SubscribeModalProps) {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = useCallback(
    (open: boolean) => {
      if (!open) subscribeModal.onClose();
    },
    [subscribeModal]
  );

  const handleCheckout = useCallback(
    async (price: Price) => {
      setPriceIdLoading(price.id);

      if (!user) {
        setPriceIdLoading(undefined);
        return toast.error("Must be logged in");
      }

      if (subscription) {
        setPriceIdLoading(undefined);
        return toast.error("Already subscribed!");
      }

      try {
        const { sessionId } = await postData({
          url: "/api/create-checkout-session",
          data: { price },
        });

        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setPriceIdLoading(undefined);
      }
    },
    [subscription, user]
  );

  let content = <div className="text-center">No products available</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4"
            >
              Subscribe for {formatPrice(price)} a month
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed</div>;
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
}
