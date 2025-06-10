import * as React from "react";

import { Select as SelectPrimitive } from "radix-ui";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

const selectTriggerVariants = cva(
  cn(
    "group border border-gray-200 data-[placeholder]:text-gray-900 data-[placeholder]:disabled:text-gray-200 flex w-fit items-center justify-between gap-x-1 bg-transparent whitespace-nowrap outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:bg-gray-100 disabled:text-gray-200 transition-[box-shadow]",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
    "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
  ),
  {
    variants: {
      size: {
        xs: "h-8 px-2 rounded-sm body02M",
        sm: "h-8 px-4 rounded-sm body02M",
        md: "h-10 px-4 rounded-md body02M",
        lg: "h-12 px-4 rounded-lg body01M",
      },
      isError: {
        true: "border-red-500",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      isError: false,
    },
  }
);

function SelectTrigger({
  className,
  size,
  isError,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size, isError }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-3.5 group-data-[size=lg]:size-4 group-data-[state=open]:rotate-180 transition-[rotate] duration-300 group-disabled:text-gray-200" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

const selectContentVariants = cva(
  "bg-white text-gray-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto border border-gray-200",
  {
    variants: {
      size: {
        xs: "rounded-sm body03R",
        sm: "rounded-sm body02M",
        md: "rounded-md body02M",
        lg: "rounded-md body01M",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function SelectContent({
  className,
  children,
  position = "popper",
  size,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> &
  VariantProps<typeof selectContentVariants>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          selectContentVariants({ size }),
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

const selectItemVariants = cva(
  "focus:bg-gray-100 focus:text-gray-900 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:bg-gray-100 data-[disabled]:text-gray-200",
  {
    variants: {
      size: {
        xs: "h-8 px-2 rounded-sm",
        sm: "h-8 px-2 rounded-sm",
        md: "h-10 px-2 rounded-md",
        lg: "h-12 px-2 rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function SelectItem({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> &
  VariantProps<typeof selectItemVariants>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemVariants({ size }), className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
};
