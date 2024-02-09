import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

interface ModalProps {
  setModal: Dispatch<SetStateAction<string>>;
  children: ReactNode;
  title: string;
  onSubmit?: (e: FormEvent) => Promise<void>;
}

export default function Modal({
  setModal,
  children,
  title,
  onSubmit,
}: ModalProps) {
  return (
    <div
      className="w-full h-full fixed flex justify-center items-center bg-[rgba(0,0,0,0.3)] animate-opacity inset-0 z-20"
      onClick={() => setModal("")}
    >
      <form
        className="w-[calc(100%-32px)] max-w-xs flex flex-col items-center gap-4 bg-white rounded-xl p-4 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}
      >
        <p className="font-bold">{title}</p>
        <hr className="w-full h-px bg-gray-300 border-0" />
        <div className="w-full flex flex-col gap-4">{children}</div>
      </form>
    </div>
  );
}
