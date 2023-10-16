import { Button } from "@/components/common/button";
import { TrackedAddressContext } from "@/context";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";

export default function Hello() {
  const { setTrackedAddress } = useContext(TrackedAddressContext);
  const { openConnectModal } = useConnectModal();
  const [address, setAddress] = useState("");

  console.log(address.length);

  return (
    <div className="max-w-sm flex flex-col items-center gap-7 text-center py-10 px-4 mx-auto">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={"/img/hashcup-logo.png"}
          width={80}
          height={80}
          alt="hashcup-logo"
        />
        <h1 className="text-2xl font-bold">Say Hello to HashCup 👋</h1>
        <p>
          Multichain assets manager. Track your wallet overview at once in one
          cup.
        </p>
      </div>
      <Button onClick={openConnectModal} withoutHoverAnim>
        Connect Wallet
      </Button>
      <div className="w-full flex items-center gap-5">
        <hr className="w-full h-px bg-gray-300 border-0" />
        <p className="text-pastel_brown">or</p>
        <hr className="w-full h-px bg-gray-300 border-0" />
      </div>
      <form
        className="w-full flex"
        onSubmit={(e) =>
          Web3.utils.isAddress(address)
            ? setTrackedAddress(address)
            : (e.preventDefault(), toast.error("Invalid Address 🤔"))
        }
      >
        <input
          placeholder="Paste your wallet address"
          className="flex-1 text-root_beer placeholder:text-pastel_brown border-2 border-very_pale_orange rounded-l-lg outline-none py-4 p-5"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="font-medium bg-very_pale_orange rounded-r-lg py-4 px-5">
          Go
        </button>
      </form>
      <p className="text-sm">
        Don&apos;t have an address?{" "}
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
