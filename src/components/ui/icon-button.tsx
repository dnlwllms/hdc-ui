import { cva, type VariantProps } from "class-variance-authority";

import { type ButtonHTMLAttributes, type Ref } from "react";
import * as Lucide from "lucide-react";

import { cn } from "../../utils";

const iconButtonVariants = cva(
  "flex items-center justify-center cursor-pointer disabled:cursor-default text-gray-900 hover:text-gray-800 rounded-full disabled:text-gray-200 transition disabled:hover:bg-white",
  {
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
      },
      state: {
        selected: "bg-gray-100",
        disabled: "",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: keyof typeof Lucide.icons;
}

export function IconButton(
  { className, children, size, icon, state, ...props }: IconButtonProps,
  ref?: Ref<HTMLButtonElement>
) {
  let iconSize = 0;

  switch (size) {
    case "xs": {
      iconSize = 16;
      break;
    }
    case "sm":
    case "md": {
      iconSize = 24;
      break;
    }
  }

  const Comp = Lucide[icon];

  return (
    <button
      ref={ref}
      className={cn(
        iconButtonVariants({
          size,
          state: props.disabled ? "disabled" : state,
          className,
        })
      )}
      {...props}
    >
      {children || <Comp width={iconSize} height={iconSize} />}
    </button>
  );
}
