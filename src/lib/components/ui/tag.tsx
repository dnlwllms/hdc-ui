import { type HTMLAttributes, type Ref } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const TagVariants = cva(
  "inline-flex justify-center items-center transition text-gray-500 body03M border border-gray-200 h-6 px-2",
  {
    variants: {
      color: {
        gray: "bg-gray-200",
        outlined: "bg-white",
      },

      shape: {
        box: "rounded-sm",
        capsule: "rounded-full",
      },
    },
    defaultVariants: {
      shape: "box",
      color: "outlined",
    },
  }
);

export interface TagProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof TagVariants> {}

export function Tag(
  { color, shape, className, ...props }: TagProps,
  ref?: Ref<HTMLSpanElement>
) {
  return (
    <span
      ref={ref}
      className={cn(TagVariants({ color, shape, className }))}
      {...props}
    />
  );
}
