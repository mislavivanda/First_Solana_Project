import { useEffect, useState, useRef } from "react";
import SupportIcon from "../../assets/supportIcon";
import {
  Avatar,
  Spinner,
  PostCard,
  WalletNotConnectedPopup,
  Alert,
  LoadingButton,
  AuthorizedPage,
} from "../../components";
import { capitalizeFirstLetter } from "../../helpers";
import { useSession } from "next-auth/react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const AboutCreator = ({ creatorId }) => {
  const [walletNotConnectedModalOpen, setWalletNotConnectedModalOpen] =
    useState(false);
  const [supportTransactionLoading, setSupportTransactionLoading] =
    useState(false);
  const [hasSupportedCreator, setHasSupportedCreator] = useState(false);
  const [creatorDataLoading, setCreatorDataLoading] = useState(true);
  const [supportSolPrice, setSupportSolPrice] = useState(null);
  const [supportersCount, setSupportersCount] = useState(0);
  const [creatorData, setCreatorData] = useState({
    name: "John",
    surname: "Doe",
    supporters: 10,
    tags: ["Finance", "Investments", "Stock", "Wall Street"],
    about:
      "Hi, I'm John Doe, currently working as a hedge fund manager and in my free time like to write various analysis about market conditions and predictions. Hope you'll enjoy them",
    supportersCount: 16,
  });

  const alertRef = useRef(null);

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { data: sessionData, status } = useSession();

  const [useEffectCalled, setUseEffectCalled] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !useEffectCalled) {
      setUseEffectCalled(true);
      //*U SUPROTNOME POZOVI API KOJI PROVJERAVA JE LI USER SUPPORTAO CREATORA
      const fetchData = async () => {
        try {
          //*ZA CREATOR VIEW POTREBNO JE POZNAVANJE BROJA SUPPORTERA
          //*ZA SUPPORTER VIEW POTREBNO JE POZNAVANJE BROJA SUPPORTERA I CIJENE
          const { mintedCount, priceInSol } =
            await getSupportersCountAndPrice();
          setSupportersCount(mintedCount);
          //*AKO JE RIJEC O CREATORU ONDA PRIKAZI STRANICU KAO ZA SUPPORTERA
          if (sessionData.userData.isCreator) setHasSupportedCreator(true);
          //TODO -> PROVJERA KOJEM CREATORU PRIPADA BLOG POST I JE LI USER SUPPORTA TOG CREATORA -> AKO NE ONDA NE PRIKAZUJ BLOG
          //setCreatorData(true);
          let hasSupportedCreator = false;
          if (!hasSupportedCreator) {
            setSupportSolPrice(priceInSol);
          }
          setCreatorDataLoading(false);
          setHasSupportedCreator(false);
        } catch (err) {
          console.log("Error checking post credentials", err);
        }
      };

      fetchData();
    }
  }, [status, sessionData, useEffectCalled]);

  const getSupportersCountAndPrice = async () => {
    try {
      const response = await fetch("/api/getCollectionNFTPrice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionAddress: "8xa4iPDzmwahibPShtxz9v7YoiZV1AqkPszNcvXmmkjf",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create collection");
      }
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (error) {
      alertRef.current.showAlert("Transaction error", "error");
      setSupportTransactionLoading(false);
    }
  };

  const handleSupportButtonClick = async () => {
    console.log("handleSupportButtonClick", alertRef);
    if (!publicKey) {
      setWalletNotConnectedModalOpen(true);
    } else {
      setSupportTransactionLoading(true);
      const { priceInSol } = await getSupportersCountAndPrice();
      const supporterPublicKey = publicKey;
      const boldMintAddress = new PublicKey(
        process.env.NEXT_PUBLIC_BOLDMINT_PUBLIC_KEY
      );
      const creatorAddress = new PublicKey(
        "2Mvbrxj7LYZNmEtEGxfn7QGLNchcfmZCiSKk6t7R1UrX"
      );
      const totalSOLAmount = priceInSol;
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
        const response = await fetch("/api/mintCollectionNFT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionAddress: "8xa4iPDzmwahibPShtxz9v7YoiZV1AqkPszNcvXmmkjf",
            supporterAddress: supporterPublicKey,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create collection");
        }
        const { mintedNftAddress } = await response.json();
        console.log("NFT minted: ", mintedNftAddress);
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

  return (
    <AuthorizedPage>
      {creatorDataLoading ? (
        <div className="w-full h-full flex-grow flex items-center justify-center">
          <Spinner classes="w-[3rem] h-[3rem] border-primary-color" />
        </div>
      ) : !creatorData ? (
        <div className="w-full h-full flex-grow flex items-center justify-center font-bold">
          Unauthorized.
        </div>
      ) : (
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
              <p className="text-lg text-font-color mt-2">
                {creatorData.about}
              </p>
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
                  {supportersCount}
                </span>
                <SupportIcon classes="w-[30px] h-[30px] fill-font-color-dark" />
              </div>
              {
                //*AKO JE CREATOR SUPPORTAN OD STRANE USERA TADA PRIKAZUJEMO NJEGOVE POSTOVE, U SUPROTNOME PRIKAZUJEMO SUPPORT DUGME
                hasSupportedCreator ? (
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
                      <LoadingButton
                        onButtonClick={handleSupportButtonClick}
                        buttonLoading={supportTransactionLoading}
                        buttonText={`Support for ${supportSolPrice} SOL`}
                        buttonClasses="mt-5 text-xl"
                      />
                    </div>
                    <WalletNotConnectedPopup
                      isOpen={walletNotConnectedModalOpen}
                      setIsOpen={setWalletNotConnectedModalOpen}
                    />
                  </>
                )
              }
            </div>
          </article>
          <Alert ref={alertRef} delay={3000} />
        </section>
      )}
    </AuthorizedPage>
  );
};

export default AboutCreator;
