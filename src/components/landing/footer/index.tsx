import { useTranslations } from "next-intl";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  description?: string;
  copyright?: string;
}

const Footer = ({ description, copyright }: FooterProps) => {
  const t = useTranslations("footer");

  const links = [
    {
      title: t("links.product.title"),
      items: [
        { label: t("links.product.features"), href: "#" },
        { label: t("links.product.pricing"), href: "#" },
        { label: t("links.product.changelog"), href: "#" },
        { label: t("links.product.roadmap"), href: "#" },
      ],
    },
    {
      title: t("links.company.title"),
      items: [
        { label: t("links.company.about"), href: "#" },
        { label: t("links.company.blog"), href: "#" },
        { label: t("links.company.careers"), href: "#" },
        { label: t("links.company.contact"), href: "#" },
      ],
    },
    {
      title: t("links.resources.title"),
      items: [
        { label: t("links.resources.documentation"), href: "#" },
        { label: t("links.resources.guides"), href: "#" },
        { label: t("links.resources.support"), href: "#" },
        { label: t("links.resources.api"), href: "#" },
      ],
    },
    {
      title: t("links.legal.title"),
      items: [
        { label: t("links.legal.privacy"), href: "#" },
        { label: t("links.legal.terms"), href: "#" },
        { label: t("links.legal.cookies"), href: "#" },
        { label: t("links.legal.security"), href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: t("social.twitter"), href: "#" },
    { icon: Github, label: t("social.github"), href: "#" },
    { icon: Linkedin, label: t("social.linkedin"), href: "#" },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <p className="text-muted-foreground">{description || t("description")}</p>
          </div>
          {links.map(section => (
            <div key={section.title}>
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.items.map(item => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">{copyright || t("copyright")}</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{t("social.title")}</span>
            {socialLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
