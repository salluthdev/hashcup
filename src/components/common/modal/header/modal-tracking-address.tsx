import { shortenAddress } from "@/utils";
import Modal from "../modal";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "../../button";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface ModalTrackingAddressProps {
  setModal: Dispatch<SetStateAction<string>>;
  trackedAddress: string;
}

export default function ModalTrackingAddress({
  setModal,
  trackedAddress,
}: ModalTrackingAddressProps) {
  const { openConnectModal } = useConnectModal();

  return (
    <Modal setModal={setModal} title={"Tracking Address"}>
      <div className="flex items-center gap-1 cursor-pointer">
        <p className="text-sm">Address: {shortenAddress(trackedAddress)}</p>
        <Image
          src={"/svg/icon-copy.svg"}
          width={12}
          height={12}
          alt=""
          className="group-hover:scale-105 group-active:scale-95 transition"
        />
      </div>
      <Button onClick={openConnectModal}>Connect Wallet</Button>
      <Button variant="transparent" withoutHoverAnim>
        Logout
      </Button>
    </Modal>
  );
}
