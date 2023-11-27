import Navbar from "@/components/Nav";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

import { SnackbarProvider, closeSnackbar } from "notistack";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <ThirdwebProvider
          activeChain="mumbai"
          clientId="5be238b6d90aced04e9db46730f231da"
          supportedWallets={[
            metamaskWallet({ recommended: true }),
            coinbaseWallet(),
            walletConnect(),
            // embeddedWallet(),
          ]}
        >
          <Navbar />
          <main>{children}</main>
        </ThirdwebProvider>
      </SnackbarProvider>
    </>
  );
};

export default MainLayout;
