"use client";

import { Link } from "@nextui-org/react";
import NextLink from "next/link";

const links = [
  { name: "About" },
  { name: "Help" },
  { name: "Pers" },
  { name: "API" },
  { name: "Jobs" },
  { name: "Privacy" },
  { name: "Terms" },
  { name: "Location" },
  { name: "Language" },
  { name: "Verification" },
  { name: "Meta" },
];

export default function HomeFooter() {
  return links.map((val, i) => (
    <Link
      key={val.name}
      className="text-skin-accent text-xs font-medium"
      size="sm"
      as={NextLink}
      href="/"
    >
      {val.name}&nbsp;
      {i !== links.length - 1 && <span>•</span>}&nbsp;
    </Link>
  ));
}
