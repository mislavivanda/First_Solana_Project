import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const SolanaWallet = () => {
  const { connection } = useConnection(); //*CONNECTION CONTEXT OBJEKT VEZAN UZ POVEZANI WALLET
  const { publicKey } = useWallet(); //*PUBLIC KEY WALLETA
  useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        // DODAJ ERROR HANDLING
        // const accountInfo = await connection.getAccountInfo(publicKey);
        // console.log("Account balance", accountInfo.lamports / LAMPORTS_PER_SOL);
      }
    };
  }, [connection, publicKey]);

  console.log("Connection", connection);
  console.log("Public key", publicKey);

  const useWalletMultiConfig = {
    onSelectWallet: (walletName) =>
      console.log("onSelectWallet call", walletName),
  };
  const { buttonState, onConnect, onDisconnect, onSelectWallet } =
    useWalletMultiButton(useWalletMultiConfig);

  console.log("Button state", buttonState);

  return (
    <WalletModalProvider>
      <div className="flex flex-col sm:flex-row">
        {(buttonState === "connected" || buttonState === "has-wallet") && (
          <WalletDisconnectButton />
        )}
        {buttonState !== "connected" && <WalletMultiButton />}
      </div>
    </WalletModalProvider>
  );
};

export default SolanaWallet;
