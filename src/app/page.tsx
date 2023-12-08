'use client';

import { useAddress } from '@thirdweb-dev/react';
import Link from 'next/link';
const Page = () => {
  const address = useAddress();
  return (
    <div className="mx-auto px-[10rem] w-fit lg:px-[7.5rem]">
      <div className="flex items-center w-fit justify-between ">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-y-6">
            <h1 className="text-[96px] font-primary font-extrabold lg:text-[70px] leading-10">
              Virtue<span className="text-primary font-primary">Quest </span>
            </h1>
            <p className="text-[32px] lg:text-[20px] font-primary w-[680px] lg:w-[510px] font-extrabold">
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

          <div className="flex">
            <img
              src="/landing-image.png"
              alt="landing-image"
              className="w-[480px] lg:w-[360px] h-[660px] lg:h-[495px]"
            />
          </div>
        </div>
        {/* image div */}
      </div>
    </div>
  );
};

export default Page;
