import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const SolanaWallet = () => {
  //TODO -> PRIKAZI DISCONNECT SAMO DOK JE CONNECTAN WALLET, DOK JE CONNECTAN PRIKAZAT SAMO IKONU ILI JE I ONA SADRZANA U DISCONNECT
  return (
    <WalletModalProvider>
      <div className="flex flex-col sm:flex-row">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
    </WalletModalProvider>
  );
};

export default SolanaWallet;
