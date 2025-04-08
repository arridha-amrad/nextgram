import Link from "next/link";
import { Fragment } from "react";

const links = [
  "About",
  "Help",
  "Press",
  "API",
  "Jobs",
  "Privacy",
  "Terms",
  "Locations",
  "Language",
  "Meta Verified",
];

function Footer() {
  return (
    <footer className="text-skin-muted mt-10 w-full text-xs">
      <div className="flex w-full max-w-lg flex-wrap items-center gap-x-2 gap-y-1 pl-4">
        {links.map((link, i) => (
          <Fragment key={i}>
            <Link href="/" className="w-max">
              {link}
            </Link>
            {i !== links.length - 1 && <span>·</span>}
          </Fragment>
        ))}
      </div>
      <p className="mt-10 pl-4 text-sm">
        &copy; {new Date().getFullYear()} Nextgram from Arridha Amrad
      </p>
    </footer>
  );
}

export default Footer;
