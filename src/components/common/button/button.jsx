const variants = {
  primary: "text-white bg-brandeis_blue shadow-brandeis_blue",
  transparent: "text-root_beer bg-transparent",
};

const sizes = {
  sm: "py-2 px-4",
  md: "p-4",
};

export function Button({
  onClick,
  children,
  withoutHoverAnim,
  variant = "primary",
  size = "md",
  className,
}) {
  return (
    <button
      className={`font-semibold rounded-lg hover:shadow-lg active:scale-95 transition ${
        variants[variant]
      }  ${sizes[size]} ${!withoutHoverAnim && "hover:scale-105"} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
