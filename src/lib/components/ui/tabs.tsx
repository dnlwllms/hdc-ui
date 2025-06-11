import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TabTextSizeType = "sm" | "md" | "lg";
type TabBoxSizeType = "xs" | "sm" | "md";
type TabBaseProps = React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabListVariants>;

type TabValidType =
  | (TabBaseProps & { mode?: "box"; size?: TabBoxSizeType })
  | (TabBaseProps & { mode?: "text"; size?: TabTextSizeType })
  | (TabBaseProps & { mode?: "vertical"; size?: never });

const tabsVariants = cva("flex gap-2", {
  variants: {
    mode: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
  defaultVariants: {
    mode: "horizontal",
  },
});

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsVariants>;

function Tabs({ mode, className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(tabsVariants({ mode }), className)}
      {...props}
    />
  );
}

const tabListVariants = cva("inline-flex w-fit items-center justify-center", {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
    mode: {
      text: "pl-2 border-b border-b-gray-200",
      box: "gap-x-1 p-1 bg-gray-200",
      vertical: "flex flex-col justify-start",
    },
  },
  defaultVariants: {
    size: "md",
    mode: "box",
  },
  compoundVariants: [
    {
      mode: "text",
      size: "sm",
      class: "h-8",
    },
    {
      mode: "text",
      size: "md",
      class: "h-10",
    },
    {
      mode: "text",
      size: "lg",
      class: "h-12",
    },
    {
      mode: "box",
      size: "xs",
      class: "h-8 rounded-sm",
    },
    {
      mode: "box",
      size: "sm",
      class: "h-10 rounded-md",
    },
    {
      mode: "box",
      size: "md",
      class: "h-12 rounded-lg",
    },
  ],
});

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabListVariants> &
  TabValidType;

function TabsList({
  className,
  mode = "box",
  size = "md",
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabListVariants({ mode, size }), className)}
      {...props}
    />
  );
}

const tabsTriggerVariants = cva(
  cn(
    "text-gray-500 data-[state=active]:text-gray-900 flex items-center justify-center h-full",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:outline-1"
  ),
  {
    variants: {
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
      },
      mode: {
        text: cn(
          "px-4 relative",
          "data-[state=active]:after:content-[''] data-[state=active]:after:block",
          "data-[state=active]:after:w-[calc(100%-32px)] data-[state=active]:after:h-0.5",
          "data-[state=active]:after:absolute after:bottom-[-1px] data-[state=active]:after:z-index-1",
          "data-[state=active]:after:bg-gray-900"
        ),
        box: "data-[state=active]:bg-white",
        vertical:
          "gap-x-2 justify-start px-6 py-2 body02M w-full min-w-[224px] h-10 border-r-2 border-r-gray-200 data-[state=active]:border-r-gray-900",
      },
    },
    defaultVariants: {
      size: "md",
      mode: "box",
    },
    compoundVariants: [
      {
        mode: "text",
        size: "sm",
        class: "body02M",
      },
      {
        mode: "text",
        size: "md",
        class: "body02M",
      },
      {
        mode: "text",
        size: "lg",
        class: "body01M",
      },
      {
        mode: "box",
        size: "xs",
        class: "px-2 rounded-sm body03R",
      },
      {
        mode: "box",
        size: "sm",
        class: "px-2 rounded-md body02M",
      },
      {
        mode: "box",
        size: "md",
        class: "px-4 rounded-lg body02M",
      },
    ],
  }
);

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants> &
  TabValidType;

function TabsTrigger({
  className,
  mode = "box",
  size = "md",
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ mode, size }), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
