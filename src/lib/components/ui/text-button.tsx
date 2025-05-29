import * as Lucide from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { type ButtonHTMLAttributes, type Ref } from "react";

import { cn } from "@/lib/utils";

const textButtonVariants = cva(
  "flex gap-1 line-height- items-center cursor-pointer disabled:cursor-default disabled:text-gray-200 transition",
  {
    variants: {
      color: {
        default: "text-gray-900 hover:text-primary-500",
        gray: "text-gray-500",
      },
      size: {
        sm: "body03M h-6",
        md: "body02M h-8 leading-none",
        lg: "body01M h-10",
      },
      position: {
        row: "",
        "reverse-row": "flex-row-reverse",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
    },
  }
);

export interface TextButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof textButtonVariants> {
  icon?: keyof typeof Lucide.icons;
}

export function TextButton(
  {
    className,
    color,
    size,
    icon,
    position,
    children,
    ...props
  }: TextButtonProps,
  ref?: Ref<HTMLButtonElement>
) {
  let Comp;
  let iconSize = 0;
  if (icon) {
    Comp = Lucide[icon];

    switch (size) {
      case "sm": {
        iconSize = 12;
        break;
      }
      case "md": {
        iconSize = 14;
        break;
      }
      case "lg": {
        iconSize = 16;
        break;
      }
    }
  }
  return (
    <button
      ref={ref}
      className={cn(textButtonVariants({ color, size, className, position }))}
      {...props}
    >
      <span>{children}</span>
      {Comp && <Comp width={iconSize} height={iconSize} />}
    </button>
  );
}
