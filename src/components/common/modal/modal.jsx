export function Modal({ setModal, children, title }) {
  return (
    <div
      className="w-full h-full fixed flex justify-center items-center bg-[rgba(0,0,0,0.3)] animate-opacity inset-0 z-20"
      onClick={() => setModal("")}
    >
      <div
        className="w-[calc(100%-32px)] max-w-xs flex flex-col items-center gap-4 bg-white rounded-xl p-4 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-bold">{title}</p>
        <hr className="w-full h-px bg-gray-300 border-0" />
        <div className="w-full flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}
