"use client";

import type { ComponentPropsWithoutRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const disabledStyle =
  "disabled:border-gray-200 disabled:bg-gray-100 data-[state=checked]:disabled:border-gray-200 data-[state=checked]:disabled:bg-gray-100 data-[state=checked]:disabled:text-gray-200";

const checkboxVariants = cva(
  `border border-gray-500 rounded-xs data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 data-[state=checked]:text-white ${disabledStyle}`,
  {
    variants: {
      size: {
        xs: "size-3.5",
        sm: "size-4",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const lucideVariants = cva("", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-3.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

function Checkbox({ className, size, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        <CheckIcon className={lucideVariants({ size })} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
