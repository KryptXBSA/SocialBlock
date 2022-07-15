import { ConnectionProvider } from '@solana/wallet-adapter-react';
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { ProgramWrapper } from '../contexts/programContextProvider';
import { AlertWrapper } from '../contexts/alertsContextProvider';
import 'animate.css';
import { NotifierContextProvider } from 'react-headless-notifier';

const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";

const WalletProvider = dynamic(
  () => import("../contexts/ClientWalletProvider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {


  return (
    <ConnectionProvider endpoint={endpoint}>
      <ThemeProvider enableSystem={true} attribute="class">
        <WalletProvider autoConnect={true}>
          <ProgramWrapper>
            <NotifierContextProvider
              // All props are optional, those are the values by default
              config={{
                max: null, // Max number of notiication simultaneously, `null` will result in no maximum
                duration: 5000, // Duration by notification in milliseconds
                position: 'bottomLeft', // Default position for all the notification if it's not specify when using `notify()`, valid positions are 'top', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'bottom'.
              }}
            >
              <AlertWrapper>
                {/* <WalletModalProvider> */}
                <Component {...pageProps} />
                {/* </WalletModalProvider> */}
              </AlertWrapper>
            </NotifierContextProvider>
          </ProgramWrapper>
        </WalletProvider>
      </ThemeProvider>
    </ConnectionProvider >
  );
}

export default MyApp;
