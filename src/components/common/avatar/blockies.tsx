import { TrackedAddressContext } from "@/context";
import makeBlockie from "ethereum-blockies-base64";
import Image from "next/image";
import { useContext } from "react";
import { useAccount } from "wagmi";

export default function BlockiesAvatar() {
  const { trackedAddress } = useContext(TrackedAddressContext);
  const { address } = useAccount();

  return (
    <Image
      src={makeBlockie(address ? address : trackedAddress)}
      width={64}
      height={64}
      alt=""
      className="rounded-full"
    />
  );
}
