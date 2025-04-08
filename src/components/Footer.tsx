import Link from "next/link";

const links = [
  "Meta",
  "About",
  "Blog",
  "Jobs",
  "Help",
  "API",
  "Privacy",
  "Terms",
  "Location",
  "Instagram Lite",
  "Threads",
  "Contact Uploading & Non-Users",
  "Meta Verified",
  "Meta in Indonesia",
];

function Footer() {
  return (
    <footer className="text-skin-muted mt-6 mb-10 text-xs">
      <div className="flex items-center justify-between gap-2">
        {links.map((link, i) => (
          <Link className="block" href="/" key={i}>
            {link}
          </Link>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <p>English</p>
        <p>&copy; {new Date().getFullYear()} Nextgram from Arridha Amrad</p>
      </div>
    </footer>
  );
}

export default Footer;
