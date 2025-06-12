import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TabMode = "box" | "text" | "vertical";

type TabSizeType = "xs" | "sm" | "md" | "lg";

type TabsBoxProps = {
  mode?: "box" | undefined;
  size?: Exclude<TabSizeType, "lg">;
};

type TabsTextProps = {
  mode: "text";
  size?: Exclude<TabSizeType, "xs">;
};

type TabsVerticalProps = {
  mode: "vertical";
  size?: never;
};

type TabsVariantProps = TabsBoxProps | TabsTextProps | TabsVerticalProps;

type TabsContextType = {
  mode: TabMode;
  size?: TabSizeType;
};

const TabsContext = React.createContext<TabsContextType | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("<Tabs> 내부에서만 사용할 수 있는 컴포넌트입니다.");
  }
  return context;
}

const tabsVariants = cva("flex gap-2", {
  variants: {
    mode: {
      box: "flex-col",
      text: "flex-col",
      vertical: "flex-row",
    },
  },
  defaultVariants: {
    mode: "box",
  },
});

const tabListVariants = cva("inline-flex w-full overflow-x-auto items-center", {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
    mode: {
      text: "pl-2 pt-1 border-b border-b-gray-200",
      box: "gap-x-1 p-1 bg-gray-200",
      vertical: "flex flex-col justify-start",
    },
  },
  defaultVariants: {
    size: "md",
    mode: "box",
  },
  compoundVariants: [
    { mode: "box", size: "xs", class: "rounded-sm" },
    { mode: "box", size: "sm", class: "rounded-md" },
    { mode: "box", size: "md", class: "rounded-lg" },
  ],
});

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
        box: "data-[state=active]:bg-white flex-1",
        vertical:
          "gap-x-2 justify-start px-6 py-2 body02M w-full min-w-[224px] h-10 border-r-2 border-r-gray-200 data-[state=active]:border-r-gray-900",
      },
    },
    defaultVariants: {
      size: "md",
      mode: "box",
    },
    compoundVariants: [
      { mode: "text", size: "sm", class: "body02M h-7" },
      { mode: "text", size: "md", class: "body02M h-9" },
      { mode: "text", size: "lg", class: "body01M h-11" },
      { mode: "box", size: "xs", class: "px-2 h-8 rounded-sm body03R" },
      { mode: "box", size: "sm", class: "px-2 h-10 rounded-md body02M" },
      { mode: "box", size: "md", class: "px-4 h-12 rounded-lg body02M" },
    ],
  }
);

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsVariants> &
  TabsVariantProps;

function Tabs({ mode = "box", size = "md", className, ...props }: TabsProps) {
  return (
    <TabsContext.Provider value={{ mode, size }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn(tabsVariants({ mode }), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { mode, size } = useTabsContext();
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabListVariants({ mode, size }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { mode, size } = useTabsContext();
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
