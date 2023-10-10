export function Modal({ setModal, children }) {
  return (
    <div
      className="w-full h-full fixed top-0 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.2)] inset-0 z-20"
      onClick={() => setModal("")}
    >
      <div
        className="w-[calc(100%-32px)] max-w-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5 bg-white rounded-xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
