"use client";

import { useTranslations } from "next-intl";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleLogin } from "@/lib/actions/auth/auth";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const t = useTranslations("auth.login");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">{t("title")}</h1>
            <div className="text-center text-sm">
              {t("subtitle")}{" "}
              <a href="#" className="underline underline-offset-4">
                {t("signupLink")}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email.label")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("email.placeholder")}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t("submit")}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        {t("terms.prefix")} <a href="#">{t("terms.termsLink")}</a> {t("terms.and")}{" "}
        <a href="#">{t("terms.privacyLink")}</a>.
      </div>
    </div>
  );
}
