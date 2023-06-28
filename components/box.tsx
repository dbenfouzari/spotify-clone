import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface BoxProps {
  className?: string;
}

export default function Box({
  children,
  className,
}: PropsWithChildren<BoxProps>) {
  return (
    <div
      className={twMerge(
        `
          bg-neutral-900
          rounded-lg
          h-fit
          w-full
        `,
        className
      )}
    >
      {children}
    </div>
  );
}
