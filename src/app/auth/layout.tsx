import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const links = [
  "Meta",
  "About",
  "Blog",
  "Jobs",
  "Help",
  "API",
  "Privacy",
  "Terms",
  "Locations",
  "Instagram Lite",
  "Threads",
  "Contact Uploading & Non-Users",
  "Meta Verified",
  "Meta Indonesia",
];

export default function Layout({ children }: Props) {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center py-4">
      {children}
      <footer className="mt-2 w-full">
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {links.map((link, i) => (
            <a key={i} className="text-skin-muted block text-xs" href="">
              {link}
            </a>
          ))}
        </div>
        <p className="text-skin-muted pt-4 text-center text-xs">
          &copy; {new Date().getFullYear()} Instagram from Meta
        </p>
      </footer>
    </div>
  );
}
