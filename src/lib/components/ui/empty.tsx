import { type HTMLAttributes, type Ref, createElement } from "react";
import * as Lucide from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const emptyVariants = cva(
  "flex flex-col items-center justify-center text-gray-500 py-2",
  {
    variants: {
      size: {
        md: "body02M px-6 gap-y-1",
        lg: "body01M px-8 gap-y-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const iconsVariants = cva("text-inherit", {
  variants: {
    size: {
      md: "w-4 h-4",
      lg: "w-6 h-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface EmptyProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyVariants> {
  icons?: keyof typeof Lucide.icons;
  iconsClassName?: string;
  description?: string;
}

function Empty(
  {
    size,
    icons,
    description = "Description",
    className,
    iconsClassName,
    ...props
  }: EmptyProps,
  ref?: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(emptyVariants({ size, className }))}
      {...props}
    >
      {icons &&
        createElement(Lucide.icons[icons as keyof typeof Lucide.icons], {
          className: cn(iconsVariants({ size }), iconsClassName),
        })}
      <p title={description}>{description}</p>
    </div>
  );
}

export { Empty };
