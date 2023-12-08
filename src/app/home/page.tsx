'use client';

import { useState, useEffect } from 'react';
import React from 'react';
// import TopBar from '@/components/TopBar';
// import Menu from '@/components/Menu';
import GameBoard from '@/components/Board';
import { ethers } from 'ethers';
import virtueQuestABI from '@/abi/virtueQuest.json';
import virtueQuestNFTABI from '@/abi/virtueQuestNFT.json';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="relative bg-gradient scrollbar-hidden bg-cover bg-no-repeat w-full min-h-screen">
      {/* <TopBar onProfClick={handleProfileClick} />  */}

      {/* Use absolute positioning for the Menu */}
      {/* {showProfile && (
        <div className="absolute top-[4rem] right-0">
          <Menu />
        </div>
      )} */}

      <div className="mt-4">
        <GameBoard />
      </div>
    </div>
  );
};

export default Home;
