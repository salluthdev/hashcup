import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "../modal";
import { TokenDetailTypes } from "@/types/token";
import { Input } from "../../input";
import { Button } from "../../button";
import { NumberFormat, handleInputChange } from "@/utils";
import { toast } from "react-toastify";
import { ethers } from "ethers";

interface ModalTokenTransferProps {
  setModal: Dispatch<SetStateAction<string>>;
  selectedTokenDetail: TokenDetailTypes;
}

export default function ModalTokenTransfer({
  setModal,
  selectedTokenDetail,
}: ModalTokenTransferProps) {
  const [formData, setFormData] = useState({
    recipient_address: "",
    amount: "",
  });

  const handleSendToken = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const ethereum = (window as any).ethereum;

      if (!ethereum) {
        toast.error("MetaMask not detected. Please install MetaMask.");
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const parsedAmount = ethers.parseUnits(
        formData.amount,
        selectedTokenDetail.decimals
      );

      const amountAsNumber = Number(parsedAmount);

      if (
        !formData.recipient_address ||
        isNaN(amountAsNumber) ||
        amountAsNumber <= 0
      ) {
        toast.error("Invalid recipient address or amount");
        return;
      }

      // Send native token
      const tx = await signer.sendTransaction({
        to: formData.recipient_address,
        value: parsedAmount,
      });
      await tx.wait();

      toast.success("Transaction success!");
      setModal("");
    } catch (error) {
      console.log("Error sending tokens:", error);
      toast.error("Transaction rejected 😔");
    }
  };

  return (
    <Modal
      setModal={setModal}
      title={`Send ${selectedTokenDetail.symbol}`}
      onSubmit={handleSendToken}
    >
      <Input
        name="recipient_address"
        title="Send to Address"
        placeholder="0x..."
        value={formData.recipient_address}
        onChange={(e) => handleInputChange(e, setFormData)}
      />
      <Input
        name="amount"
        type="number"
        title="Amount"
        subTitle={`Balance: ${NumberFormat(
          selectedTokenDetail.balance / 10 ** selectedTokenDetail.decimals
        )}`}
        placeholder="0"
        value={formData.amount}
        maxButton
        label={selectedTokenDetail.symbol}
        onChange={(e) => handleInputChange(e, setFormData)}
      />
      <Button withoutHoverAnim>Send</Button>
    </Modal>
  );
}
