import { useRef, useState } from "react";
import {
  Alert,
  LoadingButton,
  InputField,
  Label,
  FormGroup,
  AuthorizedPage,
} from "../components";
import TagsInput from "../modules/tagsInput";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const BecomeCreator = () => {
  const { data: sessionData } = useSession();
  const [aboutText, setAboutText] = useState("");
  const [creatorTags, setCreatorTags] = useState([]);
  const [collectionName, setCollectionName] = useState("SuperBalkan NFT");
  const [collectionSymbol, setCollectionSymbol] = useState("SBNFT");
  const [collectionImageURI, setCollectionImageURI] = useState(
    "https://pbs.twimg.com/profile_images/1753713529738219520/vFDYLtFH_400x400.jpg"
  );
  const [creatorWallet, setCreatorWallet] = useState("");
  const [agreeIsChecked, setAgreeIsChecked] = useState(true);
  const router = useRouter();
  const alertRef = useRef(null);
  const [submitTransactionLoading, setSubmitTransactionLoading] =
    useState(false);

  const uploadMetadata = async () => {
    try {
      const metadata = {
        name: collectionName,
        symbol: collectionSymbol,
        uri: collectionImageURI,
        seller_fee_basis_points: 500, //*5% SELLER FEE
        creators: [
          {
            address: creatorWallet,
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
    if (!agreeIsChecked) {
      alertRef.current.showAlert(
        "You have to agree to terms&conditions.",
        "error"
      );
      return;
    }
    if (!(aboutText && collectionName && collectionSymbol && creatorWallet)) {
      alertRef.current.showAlert("Missing required parameters.", "error");
      return;
    }
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
      const createCollectionNFTResponse = await fetch(
        "/api/createCreatorCollection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionMetadata,
            aboutText,
            creatorTags,
            creatorId: sessionData.userData.userId,
            creatorWallet,
          }),
        }
      );
      if (!createCollectionNFTResponse.ok) {
        throw new Error("Failed to create collection");
      }

      const { collectionAddress } = await createCollectionNFTResponse.json();
      console.log("Collection created: ", collectionAddress);
      //*AZURIRAJ SESSION DATA(USER POSTAJE CREATOR)
      await fetch("/api/auth/session?update");
      router.push(`creators/${sessionData.userData.userId}`);
      setSubmitTransactionLoading(false);
    } catch (error) {
      console.log("Error", error);
      alertRef.current.showAlert("Submission failed", "error");
      setSubmitTransactionLoading(false);
    }
  };

  return (
    <AuthorizedPage
      roleCheckMethod={(sessionData) => !sessionData.userData.isCreator}
    >
      <div className="max-w-[400px] rounded-[0.5rem] pt-2 pb-2 pl-4 pr-4 ml-auto mr-auto">
        <FormGroup>
          <Label>About you*</Label>
          <textarea
            className="w-full p-2 focus:border-primary-color border-[1px] border-solid transition-colors rounded-md"
            placeholder="Short text about you and your interests"
            cols="30"
            rows="5"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
        </FormGroup>
        <TagsInput tags={creatorTags} setTags={setCreatorTags} />
        <FormGroup>
          <Label>Collection name*</Label>
          <InputField
            placeholder="e.g. My collection"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Collection symbol*</Label>
          <InputField
            placeholder="e.g. MCNFT"
            value={collectionSymbol}
            onChange={(e) => setCollectionSymbol(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Collection image URI</Label>
          <InputField
            placeholder="e.g. https://domain/public_photo.png"
            value={collectionImageURI}
            onChange={(e) => setCollectionImageURI(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Wallet*</Label>
          <InputField
            placeholder="Select the wallet on which you want to receive supporters funds"
            value={creatorWallet}
            onChange={(e) => setCreatorWallet(e.target.value)}
          />
        </FormGroup>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            value={agreeIsChecked}
            defaultChecked
            onChange={() => setAgreeIsChecked(!agreeIsChecked)}
            className="mr-2 cursor-pointer"
          />
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
        <Alert ref={alertRef} delay={3000} />
      </div>
    </AuthorizedPage>
  );
};

export default BecomeCreator;
