import { useEffect, useState } from "react";
import SupportIcon from "../../assets/supportIcon";
import { Avatar, Button, PostCard, Popup } from "../../components";
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

  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    setScreenWidthSize(window.innerWidth);
  }, []);

  const handleSupportButtonClick = async () => {
    console.log("handleSupportButtonClick");
    if (publicKey) {
      setWalletNotConnectedModalOpen(true);
    } else {
      const supporterPrivateKey =
        "4xhMndzBPbjqUox6HafV3KHtfAGfVtwL2usXwfchMKryDPHDKtftcY3tiibuUx4uUDmZiqjCdXWcGbVVUeArykyi";
      const supporterPublicKey = "ASZGV94JK6weZqhiSL6HDoJH8w6ES9GuHUCG5jFa3tnQ";
      const supporterPrivateKeyArray = bs58.decode(supporterPrivateKey);
      const supporterEntity = Keypair.fromSecretKey(supporterPrivateKeyArray);
      const boldMintAddress = new PublicKey(
        process.env.BOLDMINT_PUBLIC_KEYSALLET
      );
      const creatorAddress = new PublicKey(
        "FdkdDo7y8qMGWsa1ZACgNvqCrE85s8Y8YC7L5f2bnZn1"
      );
      const totalSOLAmount = 1.3;
      const boldMintAmmount = Math.floor(
        (totalSOLAmount * process.env.BOLDMINT_TRANSACTION_FEE_PERCENTAGE) / 100
      );
      const creatorAmmount = totalSOLAmount - boldMintAmmount;
      //*1 TRANSAKCIJA S 2 TRANSFERA U POZADINI -> USER CE TREBAT POTPISAT SAMO 1 TRANSAKCIJU NA totalAmmount IZNOS
      const transfer1 = SystemProgram.transfer({
        fromPubkey: supporterEntity.publicKey,
        toPubkey: boldMintAddress,
        lamports: boldMintAmmount * LAMPORTS_PER_SOL,
      });

      const transfer2 = SystemProgram.transfer({
        fromPubkey: supporterEntity.publicKey,
        toPubkey: creatorAddress,
        lamports: creatorAmmount * LAMPORTS_PER_SOL,
      });
      const transaction = new Transaction().add(transfer1, transfer2);
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [supporterEntity]
      );
      console.log("Transaction successful with signature: ", signature);
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
                    classes="mt-5 text-xl"
                  >
                    {`Support for 1.3SOL`}
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
    </section>
  );
};

export default AboutCreator;
