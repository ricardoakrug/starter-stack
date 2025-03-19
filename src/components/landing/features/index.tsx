import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface FeaturesProps {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Features = ({ badge, heading, description, tabs }: FeaturesProps) => {
  const t = useTranslations("features");

  const defaultTabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: t("tabs.boostRevenue.label"),
      content: {
        badge: t("tabs.boostRevenue.badge"),
        title: t("tabs.boostRevenue.title"),
        description: t("tabs.boostRevenue.description"),
        buttonText: t("tabs.boostRevenue.buttonText"),
        imageSrc: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
        imageAlt: "placeholder",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: t("tabs.higherEngagement.label"),
      content: {
        badge: t("tabs.higherEngagement.badge"),
        title: t("tabs.higherEngagement.title"),
        description: t("tabs.higherEngagement.description"),
        buttonText: t("tabs.higherEngagement.buttonText"),
        imageSrc: "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
        imageAlt: "placeholder",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: t("tabs.stunningLayouts.label"),
      content: {
        badge: t("tabs.stunningLayouts.badge"),
        title: t("tabs.stunningLayouts.title"),
        description: t("tabs.stunningLayouts.description"),
        buttonText: t("tabs.stunningLayouts.buttonText"),
        imageSrc: "https://shadcnblocks.com/images/block/placeholder-dark-3.svg",
        imageAlt: "placeholder",
      },
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
        <Tabs defaultValue={defaultTabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {(tabs || defaultTabs).map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            {(tabs || defaultTabs).map(tab => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">{tab.content.title}</h3>
                  <p className="text-muted-foreground lg:text-lg">{tab.content.description}</p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <Image
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="rounded-xl"
                  width={1000}
                  height={1000}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Features };
