import { Button } from "../../button";
import Modal from "../modal";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function ModalTrackingAddress({ setModal, trackedAddress }) {
  const { openConnectModal } = useConnectModal();

  return (
    <Modal setModal={setModal} title={"Tracking Address"}>
      <p className="text-sm">Address: {trackedAddress}</p>
      <Button onClick={openConnectModal}>Connect Wallet</Button>
      <Button variant="transparent">Logout</Button>
    </Modal>
  );
}
