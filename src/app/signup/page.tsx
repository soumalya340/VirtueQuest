'use client'
import React from 'react';

const Signup = () => {
  return (
    <div className='bg-gradient flex justify-between w-full h-screen'>
        <img src="/signup-image.png" className='w-[570px] h-full lg:w-[428px]' alt="signup-image" />
        <div className='flex-grow flex items-center justify-center'>
            <div className='flex-col flex justify-center items-center'>
                <h1 className='font-primary text-[40px] lg:text-[30px] mb-[36px] lg:mb-[27px] font-bold'>Sign up to Virtue<span className='text-primary'>Quest</span></h1>
                <div className='w-[180px] lg:w-[135px] h-[180px] lg:h-[135px] border rounded-full border-spacing-10 border-separate border-dashed'></div>
            </div>
        </div>
    </div>
  );
};

export default Signup;
