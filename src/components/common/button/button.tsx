import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: React.ReactNode;
  withoutHoverAnim?: boolean;
  variant?: "primary" | "transparent" | "pale_orange";
  size?: "xs" | "sm" | "md";
  className?: string;
  isLoading?: boolean;
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
  type,
  onClick,
  children,
  withoutHoverAnim,
  variant = "primary",
  size = "md",
  className,
  isLoading,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex justify-center items-center gap-2 font-semibold rounded-lg active:scale-95 transition ${
        variants[variant]
      }  ${sizes[size]} ${!withoutHoverAnim && "hover:scale-105"} ${
        isLoading && "text-white bg-pastel_brown cursor-not-allowed"
      } ${className}`}
      onClick={onClick}
    >
      {isLoading && (
        <div className="h-4 w-4 border-t-transparent border-solid rounded-full border-[3px] border-white animate-spin" />
      )}
      {children}
    </button>
  );
}
