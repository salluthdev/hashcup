import { Button } from "@/components/common/button";
import { TrackedAddressContext } from "@/context";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useContext } from "react";

export default function Hello() {
  const { setTrackedAddress } = useContext(TrackedAddressContext);
  const { openConnectModal } = useConnectModal();

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
      <Button onClick={openConnectModal} withoutHoverAnim>
        Connect Wallet
      </Button>
      <p className="text-sm mt-4">
        Don't have an address?{" "}
        <span
          className="font-medium underline cursor-pointer"
          onClick={() =>
            setTrackedAddress("0x49fC7F7E4FFd2a7C6066E51946E58D0Ec6DDaAfB")
          }
        >
          View demo
        </span>
      </p>
    </div>
  );
}
