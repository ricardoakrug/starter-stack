"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileSettingsProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export function ProfileSettings({ className, ...props }: ProfileSettingsProps) {
  const t = useTranslations("settings.profile");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage src="/avatars/01.png" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Label>{t("form.avatar.label")}</Label>
              <p className="text-sm text-muted-foreground">{t("form.avatar.description")}</p>
              <Button variant="outline" className="w-fit">
                <Camera className="mr-2 size-4" />
                {t("form.avatar.button")}
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("form.name.label")}</Label>
              <Input id="name" name="name" placeholder={t("form.name.placeholder")} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">{t("form.bio.label")}</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder={t("form.bio.placeholder")}
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">{t("form.bio.description")}</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">{t("form.location.label")}</Label>
              <Input id="location" name="location" placeholder={t("form.location.placeholder")} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">{t("form.website.label")}</Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder={t("form.website.placeholder")}
              />
            </div>
          </div>
        </div>

        <Button type="submit">{t("form.submit")}</Button>
      </form>
    </div>
  );
}
