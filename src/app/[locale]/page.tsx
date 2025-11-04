import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/modules/hero-section";
import { FeaturesSection } from "@/components/modules/features-section";
import { LocaleSwitcher } from "@/components/modules/locale-switcher";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("homepage");

  return (
    <main className="min-h-screen">
      <Container>
        {/* Locale Switcher - Example usage */}
        <div className="flex justify-end pt-8 pb-4">
          <LocaleSwitcher />
        </div>
        
        <HeroSection
          title={t("title")}
          subtitle={t("subtitle")}
          description={t("description")}
          primaryCTA={t("cta.primary")}
          secondaryCTA={t("cta.secondary")}
        />
        <FeaturesSection
          title={t("features.title")}
          features={{
            typescript: {
              title: t("features.items.typescript.title"),
              description: t("features.items.typescript.description"),
            },
            tailwind: {
              title: t("features.items.tailwind.title"),
              description: t("features.items.tailwind.description"),
            },
            animation: {
              title: t("features.items.animation.title"),
              description: t("features.items.animation.description"),
            },
            i18n: {
              title: t("features.items.i18n.title"),
              description: t("features.items.i18n.description"),
            },
          }}
        />
      </Container>
    </main>
  );
}
