"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  logo?: string;
}

const Navbar = ({ logo }: NavbarProps) => {
  const t = useTranslations("navbar");
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: t("navigation.home"), href: "/" },
    { name: t("navigation.features"), href: "/features" },
    { name: t("navigation.pricing"), href: "/pricing" },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.contact"), href: "/contact" },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          {logo || t("logo")}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Button variant="ghost">{t("auth.login")}</Button>
            <Button>{t("auth.signup")}</Button>
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("mobile.close") : t("mobile.menu")}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="container mx-auto space-y-4 px-4 py-4">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="w-full">
                {t("auth.login")}
              </Button>
              <Button className="w-full">{t("auth.signup")}</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export { Navbar };
