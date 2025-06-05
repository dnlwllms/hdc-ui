"use client";

import { type ComponentPropsWithoutRef, type Ref, type ReactNode } from "react";

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

function Checkbox(
  { className, size, ...props }: CheckboxProps,
  ref?: Ref<HTMLButtonElement>
) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      ref={ref}
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

const checkboxButtonVariants = cva("", {
  variants: {
    size: {
      xs: "body03R",
      sm: "body02M",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface CheckboxButtonProps
  extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxButtonVariants> {
  children?: ReactNode;
  htmlFor?: string;
  name?: string;
}

function CheckboxButton({
  size,
  children,
  htmlFor,
  ...props
}: CheckboxButtonProps) {
  return (
    <div className="inline-flex items-center gap-x-1 group">
      <Checkbox
        className="group-hover:border-gray-900 duration-300 transition-[border-color] peer"
        size={size}
        {...props}
      />
      <label
        htmlFor={htmlFor}
        className={cn(
          checkboxButtonVariants({ size }),
          "peer-disabled:text-gray-200"
        )}
      >
        {children}
      </label>
    </div>
  );
}

export { Checkbox, CheckboxButton };
