import Image from "next/image";

export default function InstagramDownloadLinks() {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm">Get the app.</p>
      <div className="flex items-center justify-center gap-4">
        <a href="www.google.com">
          <Image
            src="https://static.cdninstagram.com/rsrc.php/v4/yt/r/Yfc020c87j0.png"
            alt="app store"
            width={120}
            height={100}
            className="h-auto w-auto"
          />
        </a>
        <a href="www.google.com">
          <Image
            src="https://static.cdninstagram.com/rsrc.php/v4/yz/r/c5Rp7Ym-Klz.png"
            alt="app store"
            width={120}
            height={100}
            className="h-auto w-auto"
          />
        </a>
      </div>
    </div>
  );
}
