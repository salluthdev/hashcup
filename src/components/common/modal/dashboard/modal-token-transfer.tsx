import { Dispatch, SetStateAction } from "react";
import Modal from "../modal";
import { TokenDetailTypes } from "@/types/token";

interface ModalTokenTransferProps {
  setModal: Dispatch<SetStateAction<string>>;
  selectedTokenDetail: TokenDetailTypes;
}

export default function ModalTokenTransfer({
  setModal,
  selectedTokenDetail,
}: ModalTokenTransferProps) {
  return (
    <Modal setModal={setModal} title={`Send ${selectedTokenDetail.symbol}`}>
      <p className="text-sm">Coming soon 🐱‍💻</p>
      <p className="text-sm">We are building for it!</p>
    </Modal>
  );
}
