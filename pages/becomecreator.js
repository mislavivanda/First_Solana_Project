import { useRef, useState } from "react";
import {
  Button,
  Alert,
  WalletNotConnectedPopup,
  LoadingButton,
  InputField,
  Label,
  FormGroup,
  AuthorizedPage,
} from "../components";
import TagsInput from "../modules/tagsInput";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const BecomeCreator = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const alertRef = useRef(null);
  const [submitTransactionLoading, setSubmitTransactionLoading] =
    useState(false);
  const [walletNotConnectedModalOpen, setWalletNotConnectedModalOpen] =
    useState(false);

  const { publicKey } = useWallet();

  const uploadMetadata = async () => {
    try {
      const metadata = {
        name: "SuperBalkan NFT",
        symbol: "SBNFT",
        uri: "https://pbs.twimg.com/profile_images/1753713529738219520/vFDYLtFH_400x400.jpg",
        seller_fee_basis_points: 500, //*5% SELLER FEE
        creators: [
          {
            address: publicKey.toBase58(),
            share: 50,
          },
          {
            address: "sB85PxzfTM5p6mG3WTkx3R1azGMkYMY2WcbFP98jbuD", //*BoldMint ACCOUNT
            share: 50,
          },
        ],
      };
      const response = await fetch("/api/uploadMetadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Metadata uploaded to IPFS:", data.ipfsUrl);
        return { metadata, ipfsUrl: data.ipfsUrl };
      } else {
        throw new Error("Failed to upload metadata:", data.error);
      }
    } catch (error) {
      console.error("Error uploading metadata to IPFS:", error);
      throw error;
    }
  };

  const onSubmitButtonClick = async () => {
    if (!publicKey) {
      setWalletNotConnectedModalOpen(true);
    } else {
      setSubmitTransactionLoading(true);
      try {
        //*UPLOAD METADATA
        const { metadata: collectionMetadata, ipfsUrl: metadataURI } =
          await uploadMetadata();
        console.log("Uploaded metadata URI", metadataURI);
        console.log("collectionMetadata", collectionMetadata);
        //*CREATE COLLECTION
        //*on a technical level, the blockchain is minting an NFT to represent that collection. However, this NFT is special because it is designated as a collection and can have other NFTs tied to it
        //*Even though we are not minting individual NFTs as part of the collection yet, the collection itself is technically an NFT with its own metadata. This NFT will act as the "collection parent" for the other NFTs that will be minted later under it.
        const response = await fetch("/api/createCreatorCollection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionMetadata,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create collection");
        }

        const { collectionAddress } = await response.json();
        console.log("Collection created: ", collectionAddress);
        setSubmitTransactionLoading(false);
        setTimeout(() =>
          router.push(`creators/${sessionData.userData.userId}`)
        );
      } catch (error) {
        console.log("Error", error);
        alertRef.current.showAlert("Submission failed", "error");
        setSubmitTransactionLoading(false);
      }
    }
  };

  return (
    <AuthorizedPage
      roleCheckMethod={(sessionData) => !sessionData.userData.isCreator}
    >
      <div className="max-w-[400px] rounded-[0.5rem] pt-2 pb-2 pl-4 pr-4 ml-auto mr-auto">
        <FormGroup>
          <Label>About you</Label>
          <textarea
            className="w-full p-2 focus:border-primary-color border-[1px] border-solid transition-colors rounded-md"
            placeholder="Short text about you and your interests"
            cols="30"
            rows="5"
          />
        </FormGroup>
        <TagsInput />
        <FormGroup>
          <Label>Collection name</Label>
          <InputField placeholder="e.g. My collection" />
        </FormGroup>
        <FormGroup>
          <Label>Collection symbol</Label>
          <InputField placeholder="e.g. MCNFT" />
        </FormGroup>
        <FormGroup>
          <Label>Collection image URI</Label>
          <InputField placeholder="e.g. https://domain/public_photo.png" />
        </FormGroup>
        <FormGroup>
          <Label>Wallet address</Label>
          <InputField disable value={publicKey && publicKey.toBase58()} />
        </FormGroup>
        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2 cursor-pointer" />
          <span>
            I agree to the <span className="underline">terms&conditions</span>.
          </span>
        </div>
        <div className="flex justify-center text-center">
          <LoadingButton
            onButtonClick={onSubmitButtonClick}
            buttonLoading={submitTransactionLoading}
            buttonText="Submit"
            buttonClasses="mt-5 text-xl"
          />
        </div>
        <WalletNotConnectedPopup
          isOpen={walletNotConnectedModalOpen}
          setIsOpen={setWalletNotConnectedModalOpen}
        />
        <Alert ref={alertRef} delay={3000} />
      </div>
    </AuthorizedPage>
  );
};

export default BecomeCreator;
