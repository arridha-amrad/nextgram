"use client";

import { changeLang } from "@/lib/actions/language";
import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function SelectLanguage() {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const lang = localStorage.getItem("lang") ?? "en";
    setLanguage(lang);
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    await changeLang(selectedLang);
    setLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };

  return (
    <Select
      onChange={handleChange}
      value={language}
      name="status"
      aria-label="Project status"
    >
      <option className="bg-background text-foreground" value="en">
        English
      </option>
      <option className="bg-background text-foreground" value="jp">
        日本語
      </option>
    </Select>
  );
}
