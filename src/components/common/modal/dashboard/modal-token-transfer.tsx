import { Dispatch, SetStateAction } from "react";
import Modal from "../modal";
import { TokenDetailTypes } from "@/types/token";
import { Input } from "../../input";
import { Button } from "../../button";
import { NumberFormat } from "@/utils";
import { toast } from "react-toastify";

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
        subTitle={`Balance: ${NumberFormat(
          selectedTokenDetail.balance / 10 ** selectedTokenDetail.decimals
        )}`}
        placeholder="0"
        maxButton
        label={selectedTokenDetail.symbol}
      />
      <Button withoutHoverAnim onClick={() => toast.info("Stay Tune 😎")}>
        Send
      </Button>
    </Modal>
  );
}
