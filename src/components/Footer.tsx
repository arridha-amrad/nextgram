"use client";

import Link from "next/link";
import SelectLanguage from "./SelectLanguage";
import { useTranslations } from "next-intl";

const links = [
  "meta",
  "about",
  "blog",
  "jobs",
  "help",
  "API",
  "privacy",
  "terms",
  "location",
  "instagramLite",
  "threads",
  "contactUploadingAndNonUsers",
  "metaVerified",
  "metaInIndonesia",
];

function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="text-skin-muted mt-6 mb-10 text-xs">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {links.map((link, i) => (
          <Link className="block h-max shrink-0" href="/" key={i}>
            {t(link)}
          </Link>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <SelectLanguage />
        <p>&copy; {new Date().getFullYear()} Nextgram from Arridha Amrad</p>
      </div>
    </footer>
  );
}

export default Footer;
