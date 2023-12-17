interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  withoutHoverAnim?: boolean;
  variant?: "primary" | "transparent" | "pale_orange";
  size?: "xs" | "sm" | "md";
  className?: string;
}

const variants = {
  primary: "text-white bg-brandeis_blue hover:shadow-lg shadow-brandeis_blue",
  transparent: "text-root_beer bg-transparent",
  pale_orange: "text-root_beer bg-very_pale_orange",
};

const sizes = {
  xs: "rounded py-1 px-2",
  sm: "py-2 px-4",
  md: "p-4",
};

export default function Button({
  onClick,
  children,
  withoutHoverAnim,
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  return (
    <button
      className={`font-semibold rounded-lg active:scale-95 transition ${
        variants[variant]
      }  ${sizes[size]} ${!withoutHoverAnim && "hover:scale-105"} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
