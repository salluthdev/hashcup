import { Dispatch, SetStateAction } from "react";
import Modal from "../modal";
import { TokenDetailTypes } from "@/types/token";
import { Input } from "../../input";

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
      <Input title="Send to Address" placeholder="0x..." />
      <Input
        type="number"
        title="Amount"
        placeholder="0"
        label={selectedTokenDetail.symbol}
      />
    </Modal>
  );
}
