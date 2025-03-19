"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User, Settings, Bell, Shield, CreditCard, Link as LinkIcon, Palette } from "lucide-react";

interface SettingsSidebarProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export function SettingsSidebar({ className, ...props }: SettingsSidebarProps) {
  const t = useTranslations("settings.sidebar");
  const pathname = usePathname();

  const navigation = [
    {
      name: t("navigation.profile"),
      href: "/settings/profile",
      icon: User,
    },
    {
      name: t("navigation.account"),
      href: "/settings/account",
      icon: Settings,
    },
    {
      name: t("navigation.notifications"),
      href: "/settings/notifications",
      icon: Bell,
    },
    {
      name: t("navigation.security"),
      href: "/settings/security",
      icon: Shield,
    },
    {
      name: t("navigation.billing"),
      href: "/settings/billing",
      icon: CreditCard,
    },
    {
      name: t("navigation.integrations"),
      href: "/settings/integrations",
      icon: LinkIcon,
    },
    {
      name: t("navigation.preferences"),
      href: "/settings/preferences",
      icon: Palette,
    },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <h2 className="text-lg font-semibold">{t("title")}</h2>
      <nav className="flex flex-col gap-1">
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
