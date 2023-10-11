import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Hello() {
  return (
    <div className="max-w-sm flex flex-col items-center gap-4 text-center px-4 mx-auto">
      <Image
        src={"/img/hashcup-logo.png"}
        width={80}
        height={80}
        alt="hashcup-logo"
      />
      <h1 className="text-2xl font-bold">Say Hello to HashCup 👋</h1>
      <p>
        Simple link to your crypto wallet. Manage your multichain assets in one
        cup.
      </p>
      <ConnectButton />
    </div>
  );
}
