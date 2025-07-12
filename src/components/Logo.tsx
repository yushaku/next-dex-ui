'use client';

import Image from 'next/image';

export const Logo = ({
  className,
  width = 100,
  height = 100,
  ...rest
}: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) => {
  return (
    <Image
      src='/logo.png'
      alt='logo'
      className={className}
      width={width}
      height={height}
      quality={100}
      {...rest}
    />
  );
};
