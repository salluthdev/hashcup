import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full max-w-2xl flex justify-between items-center pt-8 px-4 mx-auto">
      <Link href={"/"}>
        <Image
          src={"/img/hashcup-logo.png"}
          width={40}
          height={40}
          alt="hashcup logo"
        />
      </Link>
      <ConnectButton showBalance={false} chainStatus={"none"} />
    </div>
  );
}
