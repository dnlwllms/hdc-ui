"use client";

import { type ComponentPropsWithoutRef, type ReactNode, type Ref } from "react";

import { RadioGroup as RadioPrimitive } from "radix-ui";
import { CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioPrimitive.Root>) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

const radioVariants = cva(
  cn(
    "group border-gray-500 text-gray-900 data-[state=checked]:border-gray-900 aspect-square rounded-full border outline-none",
    "disabled:border-gray-200 disabled:bg-gray-100 data-[state=checked]:disabled:border-gray-200 data-[state=checked]:disabled:text-gray-200"
  ),
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

export interface RadioProps
  extends ComponentPropsWithoutRef<typeof RadioPrimitive.Item>,
    VariantProps<typeof radioVariants> {}

function Radio(
  { className, size, ...props }: RadioProps,
  ref?: Ref<HTMLButtonElement>
) {
  return (
    <RadioPrimitive.Item
      data-slot="radio-group-item"
      ref={ref}
      className={cn(radioVariants({ size }), className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className={lucideVariants({ size })} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Item>
  );
}

const radioButtonVariants = cva("", {
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

export interface RadioButtonProps
  extends ComponentPropsWithoutRef<typeof RadioPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  children?: ReactNode;
  htmlFor?: string;
  name?: string;
}

function RadioButton({ size, children, htmlFor, ...props }: RadioButtonProps) {
  return (
    <div className="inline-flex items-center gap-x-1 group">
      <Radio
        className="group-hover:border-gray-900 duration-300 transition-[border-color] peer"
        size={size}
        {...props}
      />
      <label htmlFor={htmlFor} className={cn(radioButtonVariants({ size }), "peer-disabled:text-gray-200")}>
        {children}
      </label>
    </div>
  );
}

export { RadioGroup, Radio, RadioButton };
