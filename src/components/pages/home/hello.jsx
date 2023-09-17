import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Hello() {
  return (
    <div className="max-w-md flex flex-col items-center gap-4 text-center mx-auto">
      <Image
        src={"/img/hashcup-logo-dummy.png"}
        width={80}
        height={80}
        alt=""
      />
      <h1 className="text-2xl font-bold">Say Hello to HashCup 👋</h1>
      <p>
        Simple link to your crypto wallet. Share multiple assets overview at
        once in a good way.
      </p>
      <ConnectButton />
    </div>
  );
}
