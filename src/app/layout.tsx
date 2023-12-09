'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  useAddress,
} from '@thirdweb-dev/react';

const inter = Inter({ subsets: ['latin'] });

import { ConnectWallet, lightTheme } from '@thirdweb-dev/react';
import Image from 'next/image';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      activeChain="sepolia"
      clientId="5be238b6d90aced04e9db46730f231da"
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <html lang="en">
        <body
          className={`bg-gradient bg-cover py-2 bg-no-repeat w-full min-h-screen flex justify-between h-screen flex-col items-center ${inter.className}`}
        >
          <div className="h-[72px] lg:h-[54px] flex px-[10rem] lg:px-[7.5rem] items-center justify-between w-full">
            <div className="flex items-center justify-center gap-x-[8px] lg:gap-x-[6px]">
              <Image
                height={40}
                width={40}
                src="/logo.svg"
                className="lg:w-[52px] lg:h-[52px]"
                alt="logo"
              />
              <h1 className="font-primary font-extrabold text-[30px] lg:text-[32px]">
                VirtueQuest
              </h1>
            </div>

            <div className="">
              <ConnectWallet
                theme={lightTheme({
                  colors: { primaryButtonBg: '#3B82F6' },
                })}
                switchToActiveChain={true}
                modalSize={'wide'}
                welcomeScreen={{ title: 'VirtueQuest' }}
              />
            </div>
          </div>

          <div className='w-full'>{children}</div>

          <div className="fixed bottom-0 flex w-full items-center justify-between px-[10rem] lg:px-[7.5rem]">
            <p>Copyright © 2023 VirtueQuest</p>
            <p className="text-primary">Terms and conditions</p>
          </div>
        </body>
      </html>
    </ThirdwebProvider>
  );
}