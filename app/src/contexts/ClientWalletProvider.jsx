import { WalletProvider } from "@solana/wallet-adapter-react";

import {
  // getPhantomWallet,
  // getLedgerWallet,
  // getMathWallet,
  // getSolflareWallet,
  // getSolletWallet,
  // getSolongWallet,
     GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import('@solana/wallet-adapter-react-ui/styles.css' ) ;

export function ClientWalletProvider(
  props
){
  const wallets = useMemo(
    () => [
   new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),

    ],
    []
  );

  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </WalletProvider>
  );


}

export default ClientWalletProvider;
