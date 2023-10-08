import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full max-w-3xl flex justify-between items-center pt-8 px-4 mx-auto">
      <Image
        src={"/img/hashcup-logo-dummy.png"}
        width={40}
        height={40}
        alt="hashcup logo"
      />
      <ConnectButton showBalance={false} chainStatus={"icon"} />
    </div>
  );
}
