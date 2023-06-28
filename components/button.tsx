import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      type={type}
      className={twMerge(
        "w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition",
        className
      )}
    />
  )
);

Button.displayName = "Button";

export default Button;
