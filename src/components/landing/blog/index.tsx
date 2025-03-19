import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

interface BlogProps {
  badge?: string;
  heading?: string;
  description?: string;
  readMore?: string;
  articles?: Article[];
}

const Blog = ({ badge, heading, description, readMore, articles }: BlogProps) => {
  const t = useTranslations("blog");

  const defaultArticles = [
    {
      title: t("articles.article1.title"),
      description: t("articles.article1.description"),
      author: t("articles.article1.author"),
      date: t("articles.article1.date"),
      imageSrc: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
      imageAlt: "Article 1",
      href: "#",
    },
    {
      title: t("articles.article2.title"),
      description: t("articles.article2.description"),
      author: t("articles.article2.author"),
      date: t("articles.article2.date"),
      imageSrc: "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
      imageAlt: "Article 2",
      href: "#",
    },
    {
      title: t("articles.article3.title"),
      description: t("articles.article3.description"),
      author: t("articles.article3.author"),
      date: t("articles.article3.date"),
      imageSrc: "https://shadcnblocks.com/images/block/placeholder-dark-3.svg",
      imageAlt: "Article 3",
      href: "#",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge || t("badge")}</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            {heading || t("heading")}
          </h1>
          <p className="text-muted-foreground">{description || t("description")}</p>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(articles || defaultArticles).map((article, index) => (
            <Link
              key={index}
              href={article.href}
              className="group relative overflow-hidden rounded-xl bg-muted/70 p-6 transition-colors hover:bg-muted"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={article.imageSrc}
                  alt={article.imageAlt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="mt-2 text-muted-foreground">{article.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.author}</span>
                  <span className="text-sm text-muted-foreground">{article.date}</span>
                </div>
                <Button variant="ghost" className="mt-4">
                  {readMore || t("readMore")}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog };
