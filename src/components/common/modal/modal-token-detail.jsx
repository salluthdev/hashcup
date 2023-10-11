import { USDFormat } from "@/utils";
import { Modal } from ".";

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
          <p className="truncate">{selectedTokenDetail.token_address}</p>
        </div>
      )}
    </Modal>
  );
}
