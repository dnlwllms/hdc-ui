import { type HTMLAttributes, type Ref } from "react";
import { CircleAlert, Inbox } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const emptyVariants = cva(
  "inline-flex flex-col items-center justify-center text-gray-500 py-2",
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

const iconVariants = cva("", {
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
  icon?: "warning" | "box";
  description?: string;
}

function Empty(
  { size, icon, description = "Description", className, ...props }: EmptyProps,
  ref?: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(emptyVariants({ size, className }))}
      {...props}
    >
      {icon === "warning" && (
        <CircleAlert className={cn(iconVariants({ size }))} />
      )}
      {icon === "box" && <Inbox className={cn(iconVariants({ size }))} />}
      <p title={description}>{description}</p>
    </div>
  );
}

export { Empty };
