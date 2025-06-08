import { type InputHTMLAttributes, type Ref } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "border-gray-200 text-gray-900 placeholder:text-gray-500 disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-200 focus:border-gray-500 focus-visible:outline-none",
  {
    variants: {
      size: {
        xs: "body02M h-8 px-2 rounded-sm",
        sm: "body02M h-8 px-4 rounded-sm",
        md: "body02M h-10 px-4 rounded-md",
        lg: "body01M h-12 px-4 rounded-lg",
        xl: "body01M h-14 px-10 rounded-lg",
      },
      shape: {
        box: "border",
        line: "border-b px-0 rounded-none disabled:border-dashed disabled:bg-white",
      },
      align: {
        left: "text-left",
        right: "text-right",
      },
      isError: {
        true: "border-red-500 focus:border-red-500",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "box",
      align: "left",
      isError: false,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export function Input(
  { size, shape, align, isError, className, ...props }: InputProps,
  ref?: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      className={cn(inputVariants({ size, shape, align, isError, className }))}
      {...props}
    />
  );
}
