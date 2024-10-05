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
  Popup,
} from "../../components";
import { capitalizeFirstLetter } from "../../helpers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const AboutCreator = () => {
  const router = useRouter();
  const { creatorId } = router.query; // Get the slug from the query
  const [walletNotConnectedModalOpen, setWalletNotConnectedModalOpen] =
    useState(false);
  const [supportTransactionLoading, setSupportTransactionLoading] =
    useState(false);
  const [hasSupportedCreator, setHasSupportedCreator] = useState(false);
  const [creatorDataLoading, setCreatorDataLoading] = useState(true);
  const [supportSolPrice, setSupportSolPrice] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [supportPriceChangePopupIsOpen, setSupportPriceChangePopupIsOpen] =
    useState(false);

  const alertRef = useRef(null);

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { data: sessionData, status } = useSession();

  const [useEffectCalled, setUseEffectCalled] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && creatorId && !useEffectCalled) {
      setUseEffectCalled(true);
      const fetchData = async () => {
        await getCreatorData();
      };
      fetchData();
    }
  }, [status, sessionData, useEffectCalled, creatorId]);

  const getCreatorData = async () => {
    try {
      const response = await fetch("/api/getCreatorData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: creatorId,
          userId: sessionData.userData.userId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create collection");
      }
      const creatorData = await response.json();
      console.log("creator data", creatorData);
      const hasSupportedCreator = !!(creatorData && creatorData.postsData);
      if (creatorData && !hasSupportedCreator) {
        //*IZRACUN SUPPORT CIJENE
        const priceInSol = await getSupportersPrice(creatorData);
        setSupportSolPrice(priceInSol);
      }
      setCreatorData(creatorData);
      setHasSupportedCreator(hasSupportedCreator);
      setCreatorDataLoading(false);
    } catch (err) {
      console.log("Error checking post credentials", err);
    }
  };

  const getSupportersPrice = async (creatorData) => {
    try {
      console.log("getSupportersPrice");
      console.log(creatorData);
      const response = await fetch("/api/getCollectionNFTPrice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionAddress: creatorData.collectionAddress,
        }),
      });
      console.log("responsee", response);
      if (!response.ok) {
        throw new Error("Failed to create collection");
      }
      const parsedResponse = await response.json();
      return parsedResponse.priceInSol;
    } catch (error) {
      console.error("Price calculation error", error);
      setSupportTransactionLoading(false);
      return null;
    }
  };

  const handleSupportButtonClick = async (invokePriceInSol) => {
    console.log("handleSupportButtonClick", alertRef);
    if (!publicKey) {
      setWalletNotConnectedModalOpen(true);
    } else {
      setSupportTransactionLoading(true);
      //*PROVJERA JE LI SE CIJENA PROMIJENILA
      const priceInSol = await getSupportersPrice(creatorData);
      if (priceInSol === invokePriceInSol) {
        const supporterPublicKey = publicKey;
        const boldMintAddress = new PublicKey(
          process.env.NEXT_PUBLIC_BOLDMINT_PUBLIC_KEY
        );
        const creatorAddress = new PublicKey(creatorData.creatorWalletAddress);
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
          lamports: Math.round(boldMintAmmount * LAMPORTS_PER_SOL),
        });
        const transfer2 = SystemProgram.transfer({
          fromPubkey: supporterPublicKey,
          toPubkey: creatorAddress,
          lamports: Math.round(creatorAmmount * LAMPORTS_PER_SOL),
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
              collectionAddress: creatorData.collectionAddress,
              supporterAddress: supporterPublicKey,
              transferedFundsTransactionSignature: signature,
              creatorAmmount,
              supporterId: sessionData.userData.userId,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to create collection");
          }
          const { mintedNftAddress } = await response.json();
          console.log("NFT minted: ", mintedNftAddress);
          //*REFRESH CREATOR DATA -> AZURIRANJE BROJA SUPPORTERA I DOHVAT BLOGOVA
          await getCreatorData();
          setSupportTransactionLoading(false);
          alertRef.current.showAlert("Transaction success", "success");
        } catch (error) {
          alertRef.current.showAlert("Transaction error", "error");
          setSupportTransactionLoading(false);
        }
      } else {
        //*PROMJENA CIJENE -> OBAVIJESTI USERA POPUPOM
        setSupportPriceChangePopupIsOpen(true);
        setSupportTransactionLoading(false);
      }
    }
  };
  console.log(creatorData && creatorData.postsData, hasSupportedCreator);
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
            <div className="flex flex-col flex-grow justify-center">
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
                  {creatorData.supportersCount}
                </span>
                <SupportIcon classes="w-[30px] h-[30px] fill-font-color-dark" />
              </div>
              {
                //*AKO JE CREATOR SUPPORTAN OD STRANE USERA TADA PRIKAZUJEMO NJEGOVE POSTOVE, U SUPROTNOME PRIKAZUJEMO SUPPORT DUGME
                hasSupportedCreator && creatorData.postsData ? (
                  <section className="mt-6">
                    <h1 className="inline text-3xl font-extrabold w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
                      Posts
                    </h1>
                    <div className="mt-6 mb-6 grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {creatorData.postsData.length > 0 ? (
                        creatorData.postsData.map((postData, index) => (
                          <PostCard key={index} postCardData={postData} />
                        ))
                      ) : (
                        <p>No posts yet</p>
                      )}
                    </div>
                  </section>
                ) : (
                  supportSolPrice && (
                    <>
                      <div className="text-center">
                        <LoadingButton
                          onButtonClick={() =>
                            handleSupportButtonClick(supportSolPrice)
                          }
                          buttonLoading={supportTransactionLoading}
                          buttonText={`Support for ${supportSolPrice} SOL`}
                          buttonClasses="mt-5 text-xl"
                        />
                      </div>
                      <WalletNotConnectedPopup
                        isOpen={walletNotConnectedModalOpen}
                        setIsOpen={setWalletNotConnectedModalOpen}
                      />
                      <Popup
                        isOpen={supportPriceChangePopupIsOpen}
                        closeModal={() =>
                          setSupportPriceChangePopupIsOpen(false)
                        }
                      >
                        <div className="min-w-[300px]">
                          <h3 className="font-bold">Support price updated</h3>
                          <div className="my-1 bg-primary-color w-full h-[2px]" />
                          <p className="mt-1">
                            The support amount for this creator has recently
                            changed.
                          </p>
                          <p className="mt-1">
                            Please review the updated SOL price below before
                            proceeding with your support.
                          </p>
                        </div>
                      </Popup>
                    </>
                  )
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
