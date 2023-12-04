'use client'
import React from 'react';
import { LuCamera } from "react-icons/lu";

const Signup = () => {
  return (
    <div className='bg-gradient flex justify-between w-full h-screen'>
        <img src="/signup-image.png" className='w-[570px] h-full lg:w-[428px]' alt="signup-image" />
        <div className='flex-grow flex items-center justify-center'>
            <div className='flex-col flex justify-center items-center'>
                <h1 className='font-primary text-[40px] lg:text-[30px] mb-[36px] lg:mb-[27px] font-bold'>Sign up to Virtue<span className='text-primary'>Quest</span></h1>
                
                {/* Profile picture Upload */}

                <div className='w-[180px] lg:w-[135px] h-[180px] lg:h-[135px] flex items-center justify-center border border-[#565656] bg-[#d9d9d933] rounded-full border-spacing-10 border-separate border-dashed'>
                    <div className='flex flex-col items-center gap-y-[20px] lg:gap-y-[15px]'>
                        <LuCamera  className='w-[64px] lg:w-[48px] h-[48px] lg:h-[36px] text-[#0000007c]'/>
                        <p className='w-[80px] lg:w-[60px] font-primary text-[1rem] lg:text-[12px] font-medium text-[#0000007c] text-center'>UPLOAD AVATAR</p>
                    </div>
                </div>

                <div className='mt-[56px] lg:mt-[42px] gap-y-[42px] flex flex-col lg:gap-y-[32px]'>
                    <div>
                        <p className='font-primary text-[1rem] lg:text-[12px]'>Username</p>
                        <input type="text" name="username" className='w-[500px] lg:w-[350px] border-[#EAEAEA] border rounded-[12px] bg-[#F4F4F4] h-[56px] lg:h-[42px]' />
                    </div>

                    <div>
                        <p className='font-primary text-[1rem] lg:text-[12px]'>Wallet Address</p>
                        <input type="text" name="address" className='w-[500px] lg:w-[350px] border-[#EAEAEA] border rounded-[12px] bg-[#F4F4F4] h-[56px] lg:h-[42px]' />
                    </div>
                </div>

                <button className='bg-grad text-[#fff] text-[20px] lg:text-[15px] font-bold p-4 lg:p-3 rounded-[20px] lg:rounded-[15px] mt-[80px] lg:mt-[60px]'>Create My Account</button>
            </div>
        </div>
    </div>
  );
};

export default Signup;
