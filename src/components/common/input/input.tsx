import { ChangeEvent, HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type,
  className,
  placeholder,
  value,
  onChange,
  ...restProps
}: InputProps) {
  const inputClassName = [
    className,
    "text-sm font-medium placeholder:text-[#7d6f64] border-2 border-[#eae5e3] rounded-lg py-3 px-4",
  ].join(" ");

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={inputClassName}
        onChange={onChange}
        {...restProps}
      />
    </div>
  );
}
