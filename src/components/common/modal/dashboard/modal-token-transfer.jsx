import Modal from "../modal";

export default function ModalTokenTransfer({ setModal, selectedTokenDetail }) {
  return (
    <Modal setModal={setModal} title={`Send ${selectedTokenDetail.symbol}`}>
      <p className="text-sm">Coming soon 🐱‍💻</p>
      <p className="text-sm">We are building for it!</p>
    </Modal>
  );
}
