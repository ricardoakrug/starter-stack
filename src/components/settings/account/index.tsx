"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail } from "lucide-react";

interface AccountSettingsProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export function AccountSettings({ className, ...props }: AccountSettingsProps) {
  const t = useTranslations("settings.account");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t("form.email.label")}</Label>
            <div className="flex gap-2">
              <Input id="email" name="email" type="email" value="user@example.com" disabled />
              <Button variant="outline" type="button">
                <Mail className="mr-2 size-4" />
                {t("form.email.button")}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{t("form.email.description")}</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="language">{t("form.language.label")}</Label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue placeholder={t("form.language.description")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="timezone">{t("form.timezone.label")}</Label>
            <Select defaultValue="utc">
              <SelectTrigger>
                <SelectValue placeholder={t("form.timezone.description")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
                <SelectItem value="pst">Pacific Time</SelectItem>
                <SelectItem value="gmt">GMT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit">{t("form.submit")}</Button>
      </form>
    </div>
  );
}
