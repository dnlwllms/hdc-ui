import { type HTMLAttributes, type Ref } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin fill-gray-500", {
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
    <svg
      className={cn(spinnerVariants({ size, className }))}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2696 3.5735C16.2055 2.72077 16.8564 1.96432 17.7115 1.89781C27.1803 1.16136 35.4343 8.22098 36.1442 17.6632C36.8541 27.1054 29.7515 35.3594 20.2827 36.0959C10.8139 36.8323 2.55994 29.7727 1.85004 20.3305C1.78592 19.4777 2.43686 18.7213 3.29199 18.6548C4.14712 18.5883 4.90357 19.2353 4.96769 20.088C5.5487 27.8159 12.2994 33.5897 20.049 32.9869C27.7986 32.3842 33.6076 25.6335 33.0266 17.9057C32.4455 10.1778 25.6949 4.40399 17.9453 5.00672C17.0902 5.07323 16.3337 4.42623 16.2696 3.5735Z"
      />
    </svg>
  );
}

export { Spinner };
