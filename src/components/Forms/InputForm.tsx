"use client";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type Props<TType> = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errors?: string;
  name: keyof TType;
  isTextArea?: boolean;
};

export function FormInput<TType>({
  errors,
  type,
  label,
  placeholder,
  isTextArea,
  className,
  ...props
}: Props<TType>) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const classes = twMerge(
    `mt-3 h-[52px] w-full appearance-none rounded-[8px] border bg-white px-[20px] py-[15px] text-sm text-[#627480] placeholder-[#A3A9B1] focus:outline-hidden md:text-base ${
      className ?? ""
    } ${errors && "border-red-700 text-red-700 placeholder-red-400"}`
  );

  return (
    <div className='relative'>
      {label && (
        <label className='text-grayColor mb-3 text-base font-bold'>
          {label}
        </label>
      )}

      {isTextArea ? (
        <textarea className={classes} placeholder={placeholder} />
      ) : (
        <input
          type={isShowPassword ? "text" : type}
          placeholder={placeholder}
          className={classes}
          {...props}
        />
      )}

      {type === "password" && (
        <span
          className='absolute top-[46px] right-5 z-20 h-7 w-7 cursor-pointer'
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? (
            <EyeClosedIcon color='#234f66' className='h-5 w-5' />
          ) : (
            <EyeIcon color='#234f66' className='h-5 w-5' />
          )}
        </span>
      )}
    </div>
  );
}
