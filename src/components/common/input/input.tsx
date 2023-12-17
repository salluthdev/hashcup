import { ChangeEvent, HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name?: string;
  title?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function Input({
  title,
  type,
  className,
  placeholder,
  value,
  onChange,
  label,
  ...restProps
}: InputProps) {
  const inputClassName = [
    className,
    `w-full font-medium placeholder:text-[#7d6f64] border-2 border-[#eae5e3] rounded-lg py-3 px-4 ${
      label ? "pr-20" : "pr-4"
    }`,
  ].join(" ");

  return (
    <div className="flex flex-col gap-2 text-sm">
      <p>{title}</p>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className={inputClassName}
          onChange={onChange}
          {...restProps}
        />
        {label && (
          <p className="absolute top-1/2 right-4 -translate-y-1/2 font-medium">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
