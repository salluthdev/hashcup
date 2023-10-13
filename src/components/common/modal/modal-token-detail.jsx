import { USDFormat, shortenAddress } from "@/utils";
import { Modal } from ".";
import Image from "next/image";
import { toast } from "react-toastify";

export function ModalTokenDetail({ setModal, selectedTokenDetail }) {
  return (
    <Modal setModal={setModal} title={`About ${selectedTokenDetail.symbol}`}>
      <div className="flex justify-between items-center gap-4 text-sm">
        <p>Name:</p>
        <p>{selectedTokenDetail.name ? selectedTokenDetail.name : "-"}</p>
      </div>
      <div className="flex justify-between items-center gap-4 text-sm">
        <p>Price:</p>
        <p>
          {USDFormat(
            selectedTokenDetail.price ? selectedTokenDetail.price : "-"
          )}
        </p>
      </div>
      {selectedTokenDetail.token_address && (
        <div className="flex justify-between items-center gap-4 text-sm">
          <p>Address:</p>
          <div
            className="group flex items-center gap-1 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(selectedTokenDetail.token_address);
              toast.success("Address Copied");
            }}
          >
            <p className="truncate">
              {shortenAddress(selectedTokenDetail.token_address)}
            </p>
            <Image
              src={"/svg/icon-copy.svg"}
              width={12}
              height={12}
              alt=""
              className="group-hover:scale-105 group-active:scale-95 transition"
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
