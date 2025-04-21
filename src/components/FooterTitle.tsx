import { useTranslations } from "next-intl";

export default function FooterTitle() {
  const t = useTranslations("Footer");
  return (
    <p className="text-xs">
      &copy; {new Date().getFullYear()} {t("title")}
    </p>
  );
}
