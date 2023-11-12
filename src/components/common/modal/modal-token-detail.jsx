import { USDFormat, shortenAddress } from "@/utils";
import { Modal } from ".";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

export function ModalTokenDetail({ setModal, selectedTokenDetail }) {
  console.log(selectedTokenDetail);

  const tokenDetailRow = (label, value, clickAction) => (
    <div className="flex justify-between items-center gap-4 text-sm">
      <p>{label}:</p>
      {clickAction ? (
        <div
          className="group flex items-center gap-1 cursor-pointer"
          onClick={clickAction}
        >
          <p className="truncate">{value}</p>
          <Image
            src={"/svg/icon-copy.svg"}
            width={12}
            height={12}
            alt=""
            className="group-hover:scale-105 group-active:scale-95 transition"
          />
        </div>
      ) : (
        <p>{value || "-"}</p>
      )}
    </div>
  );

  return (
    <Modal setModal={setModal} title={`About ${selectedTokenDetail.symbol}`}>
      {tokenDetailRow("Name", selectedTokenDetail.name)}
      {tokenDetailRow("Symbol", selectedTokenDetail.symbol)}
      {tokenDetailRow("Price", USDFormat(selectedTokenDetail.price))}
      {selectedTokenDetail.token_address &&
        tokenDetailRow(
          "Address",
          shortenAddress(selectedTokenDetail.token_address),
          () => {
            navigator.clipboard.writeText(selectedTokenDetail.token_address);
            toast.success("Address Copied 🥳🎉");
          }
        )}
      <div className="flex justify-center items-center gap-3 mt-2">
        <Link href={"/"}>
          <Image
            src={"/svg/icon-globe.svg"}
            width={16}
            height={16}
            alt=""
            className="hover:scale-105 active:scale-95 transition"
          />
        </Link>
        <Image
          src={"/img/icon-metamask.png"}
          width={16}
          height={16}
          alt=""
          className="hover:scale-105 active:scale-95 transition cursor-pointer"
        />
        <Image
          src={"/svg/icon-trustwallet.svg"}
          width={16}
          height={16}
          alt=""
          className="hover:scale-105 active:scale-95 transition cursor-pointer"
        />
      </div>
    </Modal>
  );
}
