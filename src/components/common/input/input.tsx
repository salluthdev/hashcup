import { ChangeEvent, HTMLAttributes } from "react";
import { Button } from "../button";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name?: string;
  title: string;
  subTitle?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  maxButton?: boolean;
}

export default function Input({
  name,
  title,
  subTitle,
  type,
  className,
  placeholder,
  value,
  onChange,
  label,
  maxButton,
  ...restProps
}: InputProps) {
  const inputClassName = [
    className,
    `w-full font-medium placeholder:text-pastel_brown border-2 border-platinum rounded-lg py-3 px-4 ${
      label ? "pr-20" : "pr-4"
    }`,
  ].join(" ");

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex justify-between items-center gap-4">
        <p>{title}</p>
        {subTitle && <p className="text-pastel_brown">{subTitle}</p>}
      </div>
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
          <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-3">
            {maxButton && (
              <Button size="xs" variant="pale_orange">
                Max
              </Button>
            )}
            <p className="max-w-[56px] font-medium truncate">{label}</p>
          </div>
        )}
      </div>
    </div>
  );
}
