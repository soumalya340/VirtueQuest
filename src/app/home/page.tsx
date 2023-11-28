'use client'

import { useState } from 'react';
import React from 'react';
import TopBar from '@/components/TopBar'
import Menu from '@/components/Menu';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className='bg-gradient bg-cover bg-no-repeat w-full h-screen'>
      <TopBar onProfClick={handleProfileClick} />

      <div className="flex justify-end mr-10">
        {showProfile && <Menu />}
      </div>
    </div>
  );
};

export default Home;
