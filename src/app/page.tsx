'use client'
import React from 'react';

const Page = () => {
  return (
    <div className='bg-gradient bg-cover px-[10rem] lg:px-[7.5rem] flex justify-between flex-col pt-4 lg:pt-3 bg-no-repeat w-full h-screen'>
        <div className='max-w-[1408px] flex flex-col w-full h-full items-center justify-between mx-auto'>

            {/* Header */}

            <div className='h-[72px] lg:h-[54px] flex items-center justify-between w-full'>
                <div className='flex items-center justify-center gap-x-[8px] lg:gap-x-[6px]'>
                    <img src="/logo.svg" className='w-[70px] h-[70px] lg:w-[52px] lg:h-[52px]' alt="logo" />
                    <h1 className='font-primary font-extrabold text-[44px] lg:text-[32px]'>VirtueQuest</h1>
                </div>
                <div className='flex gap-x-4 lg:gap-x-3'>
                <button className='w-[10rem] h-4 lg:w-[7.5rem] lg:h-[3rem] bg-black rounded-[1rem] lg:rounded-[0.75rem] text-[#fff] text-[24px] lg:text-[18px] font-bold'>Sign Up</button>
                    <button className='w-[10rem] h-4 lg:w-[7.5rem] lg:h-[3rem] bg-grad rounded-[1rem] lg:rounded-[0.75rem] text-[#fff] text-[24px] lg:text-[18px] font-bold'>Sign Up</button>
                </div>
            </div>

            <div className='flex w-full'>
                <div className='flex-1 w-full flex items-center'>
                    <div className=' flex flex-col gap-y-4'>
                        <h1 className='text-[96px] font-primary font-extrabold lg:text-[70px] leading-10 w-[680px] lg:w-[510px]'>Virtue<span className='text-primary font-primary'>Quest </span></h1>
                        <p className='text-[32px] lg:text-[20px] font-primary font-extrabold'>Discover something new and receive an NFT to show off their achievement.</p>
                    </div>
                </div>

                <div className='flex-1 w-full pl-[4rem] lg:pl-[3rem]'>
                    <img src="/landing-image.png" alt="landing-image" className='w-[480px] lg:w-[360px] h-[660px] lg:h-[495px]' />
                </div>
            </div>

            <div className='flex w-full items-center justify-between'>
                <p>Copyright © 2023 VirtueQuest</p>
                <p className='text-primary'>Terms and conditions</p>
            </div>
        </div>
    </div>
  );
};

export default Page;
