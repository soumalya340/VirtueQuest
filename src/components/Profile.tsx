'use client';

import React, { useState } from 'react';
import ProfilePicture from '../../public/profile.png';
import { ConnectWallet, lightTheme } from '@thirdweb-dev/react';

export interface ProfileProps {
  onProfileClick: () => void;
}

const Profile = () => {
  return (
    <div>
      <ConnectWallet
        theme={lightTheme({
          colors: { primaryButtonBg: '#3B82F6' },
        })}
        switchToActiveChain={true}
        modalSize={'wide'}
        welcomeScreen={{ title: 'VirtueQuest' }}
      />
    </div>
  );
};

export default Profile;
