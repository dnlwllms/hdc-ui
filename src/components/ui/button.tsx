import { cva, type VariantProps } from "class-variance-authority";

import { type ButtonHTMLAttributes, type Ref } from "react";

import { cn } from "../../utils";

const buttonVariants = cva(
  "cursor-pointer disabled:cursor-default border-[1px] disabled:bg-gray-200 disabled:text-white transition",
  {
    variants: {
      color: {
        gray: "bg-gray-900 text-white border-gray-900 hover:bg-gray-800 disabled:border-gray-200",
        primary:
          "bg-primary-500 text-white border-primary-500 hover:bg-primary-400 disabled:border-gray-200",
        outlined:
          "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-900 disabled:border-gray-200",
      },
      size: {
        xs: "body03R h-6 px-2 rounded-[4px]",
        sm: "body02M h-8 px-4 rounded-[4px]",
        md: "body02M h-10 px-6 rounded-[6px]",
        lg: "body01M h-12 px-8 rounded-[8px]",
        xl: "body01B h-14 px-10 rounded-[8px]",
      },
      shape: {
        capsule: "rounded-full",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {}

export function Button(
  { className, color, size, shape, ...props }: ButtonProps,
  ref?: Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ color, size, shape, className }))}
      {...props}
    ></button>
  );
}
