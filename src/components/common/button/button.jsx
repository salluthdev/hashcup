export function Button({ onClick, children, withoutHoverAnim }) {
  return (
    <button
      className={`w-full font-semibold text-white bg-brandeis_blue p-4 rounded-lg active:scale-95 transition ${
        !withoutHoverAnim && "hover:scale-105"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
