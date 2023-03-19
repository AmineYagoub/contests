import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = ({ height, width }: { height: number; width: number }) => {
  return (
    <Link href="/" className="logo">
      <Image src="/img/logo.png" height={height} width={width} alt="logo" />
    </Link>
  );
};

export default Logo;
