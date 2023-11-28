'use client'

import React, { useState } from 'react';
import ProfilePicture from '../../public/profile.png';

const name = 'Joshua Udo-Udo';
const wallet = '0xf05D71A2DB4B'; // Assuming a valid wallet address

export interface ProfileProps  {
  onProfileClick: () => void
}

const Profile: React.FC<ProfileProps> = ({onProfileClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const renderName = () => {
    if (name.length > 12) {
      return name.slice(0, 10) + '..';
    }
    return name;
  };

  const renderWallet = () => {
    const lowerCaseWallet = wallet.toLowerCase();

    if (lowerCaseWallet.length > 12) {
      const start = lowerCaseWallet.slice(0, 5);
      const end = lowerCaseWallet.slice(-5);
      return start + '..' + end;
    }
    return lowerCaseWallet;
  };

  return (
    <div
      onClick={onProfileClick}
      className='h-[3.75rem] bg-grad cursor-pointer hover:bg-gradtrans lg:h-[2.8125rem] items-center border gap-x-1  rounded-[1.875rem] lg:rounded-[1.41rem] flex p-1'
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className='flex-grow w-32 lg:w-24 flex items-center pl-1 justify-center'>
        <h1 className='font-primary font-semibold text-[1rem] lg:text-[14px]'>
          {isHovered ? renderWallet() : renderName()}
        </h1>
      </div>
      <img
        src={ProfilePicture.src}
        alt='profile'
        className='w-[3.25rem] flex h-[3.25rem] rounded-[3.25rem] lg:h-[2.4375rem] lg:w-[2.4375rem] lg:rounded-[2.4375rem] justify-end items-end border'
      />
    </div>
  );
};

export default Profile;
