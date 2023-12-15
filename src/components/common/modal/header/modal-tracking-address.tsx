import { shortenAddress } from "@/utils";
import Modal from "../modal";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "../../button";
import { Dispatch, SetStateAction, useContext } from "react";
import Image from "next/image";
import { TrackedAddressContext } from "@/context";

interface ModalTrackingAddressProps {
  setModal: Dispatch<SetStateAction<string>>;
  trackedAddress: string;
}

export default function ModalTrackingAddress({
  setModal,
  trackedAddress,
}: ModalTrackingAddressProps) {
  const { openConnectModal } = useConnectModal();
  const { setTrackedAddress } = useContext(TrackedAddressContext);

  return (
    <Modal setModal={setModal} title={"Tracking Address"}>
      <div className="flex flex-col text-sm cursor-pointer mb-2">
        <p>Address:</p>
        <div className="flex items-center gap-1">
          <p className="text-pastel_brown truncate">{trackedAddress}</p>
          <Image
            src={"/svg/icon-copy.svg"}
            width={12}
            height={12}
            alt=""
            className="group-hover:scale-105 group-active:scale-95 transition"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Button withoutHoverAnim onClick={openConnectModal}>
          Connect Wallet
        </Button>
        <Button
          variant="transparent"
          withoutHoverAnim
          onClick={() => setTrackedAddress("")}
        >
          Logout
        </Button>
      </div>
    </Modal>
  );
}
