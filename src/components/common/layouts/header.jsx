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
      <div className="flex items-center gap-4">
        <Link
          href={"https://github.com/salluthdev/hashcup"}
          target="_blank"
          className="flex items-center gap-1 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] py-2 px-3 hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <Image src={"/svg/icon-star.svg"} width={16} height={16} alt="" />
          <p className="font-medium text-brandeis_blue">21</p>
        </Link>
        <ConnectButton showBalance={false} chainStatus={"none"} />
      </div>
    </div>
  );
}
