"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  title: string;
};

export const CheckBox = ({ title, ...props }: Props) => {
  return (
    <label className='flex items-center justify-center gap-2'>
      <input
        type='checkbox'
        className='primary-foreground h-5 w-5'
        {...props}
      />
      <p className='text-grayColor'>{title}</p>
    </label>
  );
};

export const InputCheckbox = ({
  title,
  name,
  value,
  isChecked,
  onClick,
}: {
  title: string;
  name: string;
  value?: string;
  isChecked: boolean;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className='flex items-start justify-start'>
      <input
        name={name}
        type='checkbox'
        onChange={onClick}
        checked={isChecked}
        value={value ? value : title}
        className='primary-foreground h-6 w-6 rounded-sm'
      />
      <span className='text-foreground baseText ml-4 select-none'>{title}</span>
    </label>
  );
};
