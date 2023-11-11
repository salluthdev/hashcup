import { Modal } from ".";

export function ModalTokenTransfer({ setModal, selectedTokenDetail }) {
  return (
    <Modal setModal={setModal} title={`Send ${selectedTokenDetail.symbol}`}>
      <p className="text-sm">Coming Soon!</p>
    </Modal>
  );
}
