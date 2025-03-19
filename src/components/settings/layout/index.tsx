"use client";

import { cn } from "@/lib/utils";
import { SettingsSidebar } from "../sidebar";

interface SettingsLayoutProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function SettingsLayout({ children, className, ...props }: SettingsLayoutProps) {
  return (
    <div className={cn("container mx-auto py-8", className)} {...props}>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-64">
          <SettingsSidebar />
        </div>
        <div className="flex-1">
          <div className="rounded-lg border bg-card p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
