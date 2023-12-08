'use client';

import { useAddress } from '@thirdweb-dev/react';
import Link from 'next/link';
const Page = () => {
  const address = useAddress();
  return (
    <div className="px-16 mx-auto max-w-7xl mt-10">
      <div className="flex w-full items-center justify-between ">
        <div className="">
          <div className=" flex flex-col gap-y-6">
            <h1 className="text-[96px] font-primary font-extrabold lg:text-[70px] leading-10 w-[680px] lg:w-[510px]">
              Virtue<span className="text-primary font-primary">Quest </span>
            </h1>
            <p className="text-[32px] lg:text-[20px] font-primary font-extrabold">
              Discover something new and receive an NFT to show off their
              achievement.
            </p>
            {address && (
              <Link
                href={'/mint'}
                className="bg-grad w-fit text-[#fff] text-[20px] lg:text-[15px] font-bold px-8 py-4 rounded-[20px] lg:rounded-[15px]  "
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
        <div className="">
          <img
            src="/landing-image.png"
            alt="landing-image"
            className="w-[480px] lg:w-[360px] h-[660px] lg:h-[495px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
