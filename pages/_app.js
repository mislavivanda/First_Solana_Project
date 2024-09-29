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
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new SolflareWalletAdapter(), new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="cutting-edge platform that empowers bold creators to mint
            exclusive NFTs using the Solana blockchain. By leveraging
            Solana's fast, low-cost transactions, creators can easily
            tokenize their content, allowing fans to access their material
            through SOL payments. With minimal fees and seamless scalability,
            BoldMint offers creators a new way to monetize without the overhead
            of traditional platforms, all while keeping ownership of their work
            and building deeper connections with their audience."
        />
        <link rel="icon" href="/favicon.ico" key="icon" />
        <title>BoldMint</title>
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
