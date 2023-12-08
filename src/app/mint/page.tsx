'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import nftImage from '../../../public/landing-image.png';
import virtueQuestNFTABI from '@/abi/virtueQuestNFT.json';
import { ethers } from 'ethers';
import Link from 'next/link';

let nftca = '';
let provider: ethers.providers.Web3Provider | null = null;
let nftContract: ethers.Contract;

const Signup = () => {
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [minted, setMinted] = useState<boolean>(false);

  console.log(minted);

  useEffect(() => {
    nftca = '0xD086bacC3883dC499850d964623c459f4698fB96';
    if (typeof window !== 'undefined' && window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer, 'done');
      nftContract = new ethers.Contract(nftca, virtueQuestNFTABI, signer);
    }
  }, []);

  // -------------------- mint
  async function mintNFT() {
    try {
      setIsMinting(true);
      const issueNFt = await nftContract.issue('image');
      console.log('response', issueNFt);
      setIsMinting(false);
    } catch (error: any) {
      alert(error);
    } finally {
      setMinted(true);
    }
  }
  // --------------------------- mint

  return (
    <div className="flex items-center mt-10 justify-center">
      <div className="flex-col flex justify-center items-center">
        <h1 className="font-primary text-[40px] lg:text-[30px] mb-[36px] lg:mb-[27px] font-bold">
          Mint NFT to StartGame
        </h1>
        <div>
          <Image alt="nft" src={nftImage} width={200} height={200} />
        </div>
        <div className="flex justify-center mt-6">
          {minted ? (
            <>
              <Link
                href={'/home'}
                className="bg-grad text-[#fff] text-[20px] lg:text-[15px] font-bold px-8 py-4 rounded-[20px] lg:rounded-[15px]  lg:mt-[60px]"
              >
                Play Game
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={mintNFT}
                disabled={isMinting}
                className="bg-grad text-[#fff] text-[20px] lg:text-[15px] font-bold px-8 py-4 rounded-[20px] lg:rounded-[15px]  lg:mt-[60px]"
              >
                {isMinting ? 'Minting' : ' Mint NFT'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
