import Image from "next/image";
import Link from "next/link";

const CREATOR_SOCIAL = [
  {
    name: "instagram",
    link: "https://www.instagram.com/salluthdev/",
  },
  {
    name: "twitter",
    link: "https://twitter.com/salluthdev",
  },
  {
    name: "linkedin",
    link: "https://linkedin.com/in/salluthdev",
  },
];

export default function Footer() {
  return (
    <div className="w-full flex flex-col gap-5 items-center bg-very_pale_orange py-10 px-4">
      <p>Connect with The Creator - @salluthdev</p>
      <div className="flex items-center gap-4">
        {CREATOR_SOCIAL.map((social) => (
          <Link key={social.name} href={social.link} target="_blank">
            <Image
              src={`/svg/social/${social.name}.svg`}
              width={20}
              height={20}
              alt=""
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
