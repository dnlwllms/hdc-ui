import { type HTMLAttributes, type Ref } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { LoaderCircle } from "lucide-react";

const spinnerVariants = cva("animate-spin text-gray-500", {
  variants: {
    size: {
      sm: "w-6 h-6",
      md: "w-10 h-10",
      lg: "w-14 h-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

function Spinner(
  { size, className, ...props }: SpinnerProps,
  ref?: Ref<SVGSVGElement>
) {
  return (
    <LoaderCircle
      ref={ref}
      className={spinnerVariants({ size, className })}
      {...props}
    />
  );
}

export { Spinner };
