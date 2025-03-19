"use client";

import { useTranslations } from "next-intl";

export default function VerifyContent() {
  const t = useTranslations("verify");

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
    </div>
  );
}
