import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Modal from "../modal";
import { TokenDetailTypes } from "@/types/token";
import { Input } from "../../input";
import { Button } from "../../button";
import { NumberFormat, handleInputChange } from "@/utils";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { TrackedAddressContext } from "@/context";
import { useConnectModal } from "@rainbow-me/rainbowkit";

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
  const [isButtonLoading, setIsButtonLoading] = useState<string>("");
  const { trackedAddress } = useContext(TrackedAddressContext);
  const { openConnectModal } = useConnectModal();

  const handleSendToken = async (e: FormEvent) => {
    e.preventDefault();

    // setIsButtonLoading("button-token-transfer");

    // try {
    //   const ethereum = (window as any).ethereum;

    //   if (!ethereum) {
    //     toast.error("MetaMask not detected. Please install MetaMask.");
    //     return;
    //   }

    //   const provider = new ethers.BrowserProvider(ethereum);
    //   const signer = await provider.getSigner();

    //   const parsedAmount = ethers.parseUnits(
    //     formData.amount,
    //     selectedTokenDetail.decimals
    //   );

    //   const amountAsNumber = Number(parsedAmount);

    //   // Check validate address or amount
    //   if (
    //     !formData.recipient_address ||
    //     isNaN(amountAsNumber) ||
    //     amountAsNumber <= 0
    //   ) {
    //     toast.error("Invalid recipient address or amount");
    //     return;
    //   }

    //   // Switch network based on the selected token
    //   await ethereum.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [{ chainId: selectedTokenDetail.chain_id }],
    //   });

    //   // Send native token
    //   const tx = await signer.sendTransaction({
    //     to: formData.recipient_address,
    //     value: parsedAmount,
    //   });
    //   await tx.wait();

    //   toast.success("Transaction success!");
    //   setModal("");
    // } catch (error) {
    //   console.log("Error sending tokens:", error);
    //   toast.error("Transaction rejected 😔");
    // } finally {
    //   setIsButtonLoading("");
    // }
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
      {trackedAddress ? (
        <Button
          type="button"
          onClick={openConnectModal}
          withoutHoverAnim
          className={"w-full"}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          withoutHoverAnim
          isLoading={isButtonLoading === "button-token-transfer"}
          onClick={() => toast.info("Stay tune 😎")}
        >
          Send
        </Button>
      )}
    </Modal>
  );
}
