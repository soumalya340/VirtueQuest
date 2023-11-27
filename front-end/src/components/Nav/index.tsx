import React from "react";
import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-4 py-6 flex justify-between">
      <div className="text-xl font-semibold">VirtueQuest</div>
      <div className="flex gap-8 items-center">
        <div className="font-medium hover:text-blue-500 hover:bg-blue-50 px-8 rounded-lg cursor-pointer h-full flex justify-center items-center">
          <Link href={"#"}>NFTs</Link>
        </div>
        <div>
          <ConnectWallet
            theme={lightTheme({
              colors: { primaryButtonBg: "#3B82F6" },
            })}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{ title: "VirtueQuest" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
