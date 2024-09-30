import { useEffect, useState, useRef } from "react";
import SupportIcon from "../../assets/supportIcon";
import { Avatar, Button, PostCard, Popup, Alert } from "../../components";
import { capitalizeFirstLetter } from "../../helpers";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";
import bs58 from "bs58";

const AboutCreator = ({ creatorId }) => {
  const creatorData = {
    name: "John",
    surname: "Doe",
    supporters: 10,
    tags: ["Finance", "Investments", "Stock", "Wall Street"],
    about:
      "Hi, I'm John Doe, currently working as a hedge fund manager and in my free time like to write various analysis about market conditions and predictions. Hope you'll enjoy them",
    supportersCount: 16,
  };
  const [screenWidthSize, setScreenWidthSize] = useState(false);
  const [walletNotConnectedModalOpen, setWalletNotConnectedModalOpen] =
    useState(false);
  const [supportTransactionLoading, setSupportTransactionLoading] =
    useState(false);
  const alertRef = useRef(null);

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    setScreenWidthSize(window.innerWidth);
  }, []);

  const handleSupportButtonClick = async () => {
    console.log("handleSupportButtonClick", alertRef);
    if (!publicKey) {
      setWalletNotConnectedModalOpen(true);
    } else {
      setSupportTransactionLoading(true);
      const supporterPublicKey = publicKey;
      const boldMintAddress = new PublicKey(
        process.env.NEXT_PUBLIC_BOLDMINT_PUBLIC_KEY
      );
      const creatorAddress = new PublicKey(
        "2Mvbrxj7LYZNmEtEGxfn7QGLNchcfmZCiSKk6t7R1UrX"
      );
      const totalSOLAmount = 1.3;
      const boldMintAmmount =
        (totalSOLAmount *
          process.env.NEXT_PUBLIC_BOLDMINT_TRANSACTION_FEE_PERCENTAGE) /
        100;
      const creatorAmmount = totalSOLAmount - boldMintAmmount;
      console.log("BoldMint ammount", boldMintAmmount);
      console.log("Creator ammount", creatorAmmount);
      //*1 TRANSAKCIJA S 2 TRANSFERA U POZADINI -> USER CE TREBAT POTPISAT SAMO 1 TRANSAKCIJU NA totalAmmount IZNOS
      const transfer1 = SystemProgram.transfer({
        fromPubkey: supporterPublicKey,
        toPubkey: boldMintAddress,
        lamports: boldMintAmmount * LAMPORTS_PER_SOL,
      });
      const transfer2 = SystemProgram.transfer({
        fromPubkey: supporterPublicKey,
        toPubkey: creatorAddress,
        lamports: creatorAmmount * LAMPORTS_PER_SOL,
      });
      const transaction = new Transaction().add(transfer1, transfer2);
      try {
        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction successful with signature: ", signature);
        setSupportTransactionLoading(false);
        alertRef.current.showAlert("Transaction success", "success");
        const supporterBalance = await connection.getBalance(
          supporterPublicKey
        );
        console.log(
          `Supporter balance: ${supporterBalance / LAMPORTS_PER_SOL}  SOL`
        );
        const creatorBalance = await connection.getBalance(creatorAddress);
        console.log(
          `Creator balance: ${creatorBalance / LAMPORTS_PER_SOL}  SOL`
        );
        const boldMintBalance = await connection.getBalance(boldMintAddress);
        console.log(
          `BoldMint balance: ${boldMintBalance / LAMPORTS_PER_SOL}  SOL`
        );
      } catch (error) {
        alertRef.current.showAlert("Transaction error", "error");
        setSupportTransactionLoading(false);
      }
    }
  };

  const hassSupportedCreator = false;

  return (
    <section className="mt-4 sm:mt-16">
      <article className="sm:flex max-w-screen-lg mx-auto">
        <div className="sm:mr-5 flex flex-col">
          <Avatar
            firstLetter={`${capitalizeFirstLetter(
              creatorData.name.charAt(0)
            )}${capitalizeFirstLetter(creatorData.surname.charAt(0))}`}
            containerClasses="flex justify-center sm:block"
            circleClasses="!w-[100px] !h-[100px] !text-[40px]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl text-font-color-dark font-bold text-center sm:text-left mt-2 sm:mt-0">
            {`${creatorData.name} ${creatorData.surname}`}
          </h1>
          <p className="text-lg text-font-color mt-2">{creatorData.about}</p>
          <div className="flex flex-wrap">
            {creatorData.tags.map((tag, index) => (
              <div
                key={index}
                className={`flex items-center text-primary-color border-primary-color border-2 border-solid rounded-md pl-2 pr-2 m-2`}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <span className="text-[25px] mr-1">Supporters: </span>
            <span className="text-[25px] mr-1 font-semibold">
              {creatorData.supportersCount}
            </span>
            <SupportIcon classes="w-[30px] h-[30px] fill-font-color-dark" />
          </div>
          {
            //*AKO JE CREATOR SUPPORTAN OD STRANE USERA TADA PRIKAZUJEMO NJEGOVE POSTOVE, U SUPROTNOME PRIKAZUJEMO SUPPORT DUGME
            hassSupportedCreator ? (
              <section className="mt-6">
                <h1 className="inline text-3xl font-extrabold w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
                  Posts
                </h1>
                <div className="mt-6 mb-6 grid grid-cols-1 gap-4 sm:gap-6">
                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                </div>
              </section>
            ) : (
              <>
                <div className="text-center">
                  <Button
                    onClick={handleSupportButtonClick}
                    type="filled"
                    classes="mt-5 text-xl relative"
                  >
                    <div
                      className={`${
                        supportTransactionLoading ? "invisible" : ""
                      }`}
                    >
                      Support for 1.3 SOL
                    </div>
                    {supportTransactionLoading ? (
                      <div className="text-xl w-[1.25rem] h-[1.25rem] border-white border-solid border-[0.25em] border-r-transparent rounded-[50%] absolute left-[calc(50%-0.625rem) top-[0.5rem] inline-block align-text-bottom animate-spin" />
                    ) : null}
                  </Button>
                </div>
                <Popup
                  isOpen={walletNotConnectedModalOpen}
                  closeModal={setWalletNotConnectedModalOpen}
                >
                  <div className="min-w-[300px]">
                    <h3 className="font-bold">Please Connect Your Wallet</h3>
                    <div className="my-1 bg-primary-color w-full h-[2px]" />
                    <p className="mt-1">
                      To continue, you need to connect your Solana wallet.
                    </p>
                    <p className="mt-1">
                      {screenWidthSize < 640 ? (
                        <span>
                          Tap the{" "}
                          <span className="font-bold">menu icon (☰)</span> to
                          open the navigation and then select{" "}
                          <span className="font-bold">Connect Wallet</span>
                        </span>
                      ) : (
                        <span>
                          You can find the{" "}
                          <span className="font-bold">Connect Wallet</span>{" "}
                          button in the navigation bar at the top.
                        </span>
                      )}
                    </p>
                  </div>
                </Popup>
              </>
            )
          }
        </div>
      </article>
      <Alert ref={alertRef} delay={3000} />
    </section>
  );
};

export default AboutCreator;
