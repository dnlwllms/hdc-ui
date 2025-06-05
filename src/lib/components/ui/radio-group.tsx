"use client";

import { type ComponentPropsWithoutRef, type Ref } from "react";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

const disabledStyle =
  "disabled:border-gray-200 disabled:bg-gray-100 data-[state=checked]:disabled:border-gray-200 data-[state=checked]:disabled:text-gray-200";

const radioGroupVariants = cva(
  `group border-gray-500 text-gray-900 data-[state=checked]:border-gray-900 aspect-square rounded-full border outline-none ${disabledStyle}`,
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

const lucideVariants = cva(
  "fill-gray-900 group-disabled:fill-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  {
    variants: {
      size: {
        xs: "size-2",
        sm: "size-2.5 ",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

export interface radioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupVariants> {}

function RadioGroupItem(
  { className, size, ...props }: radioGroupItemProps,
  ref?: Ref<HTMLButtonElement>
) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      ref={ref}
      className={cn(radioGroupVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className={lucideVariants({ size })} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
