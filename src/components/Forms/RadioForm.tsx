"use client";

import Link from "next/link";

type Props = {
  name: string;
  title: string;
  description?: string;
  isSelected?: boolean;
  isDisable?: boolean;
};

export const InputRadio = ({ name, title, description, isDisable }: Props) => {
  return (
    <label
      className={`relative block items-center rounded-lg border px-[15px] py-5 shadow ${
        isDisable ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className='flex gap-4'>
        <input
          type='radio'
          name={name}
          value={title}
          disabled={isDisable}
          className='primary-foreground h-6 w-6'
        />
        <p className='text-foreground text-lg font-medium'>{title}</p>
      </div>

      <div className='mt-3 ml-[40px]'>
        <p className='baseText'>{description}</p>
        {isDisable && (
          <Link
            href='/settings/billing'
            className='baseText text-foreground hover:text-primary mt-3 block p-0'
          >
            Upgrade to Premium
          </Link>
        )}
      </div>
    </label>
  );
};
