import "../styles/globals.css";
import { useMemo } from "react";
import Layout from "../components/layout";
import AuthComponent from "../components/auth";
import { SessionProvider } from "next-auth/react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="My first project on Solana" />
        <link rel="icon" href="/favicon.ico" key="icon" />
        <title>Solana</title>
      </Head>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <SessionProvider session={session}>
            {Component.needsAuthentication ? (
              <AuthComponent>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AuthComponent>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </SessionProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default MyApp;
