import {
  Metaplex,
  keypairIdentity,
  irysStorage,
} from "@metaplex-foundation/js";
import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { createContenfulCMAConnection } from "../../helpers";
import { withAuthRoute } from "../../lib/authMiddleware";
import bs58 from "bs58";
import { getUserMetadataByUserId } from "../../lib/dataSource";

export default withAuthRoute(
  async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const connection = new Connection(
        process.env.HELIUS_RPC_URL,
        "confirmed"
      );

      //!KREIRANJE MOZE ODRADITI SAMO AUTHORITY KOLEKCIJE -> BoldMint
      const boldMintAuthority = Keypair.fromSecretKey(
        bs58.decode(process.env.BOLDMINT_PRIVATE_KEY)
      );

      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(boldMintAuthority))
        .use(
          irysStorage() //*decentralized storage network
        );

      const {
        collectionMetadata,
        aboutText,
        creatorTags,
        creatorId,
        creatorWallet,
      } = req.body;
      //!OSIGURANJE OD NAPADA:
      //*1) PROVJERI I VRIJEDNOSTI seller_fee_basis_points(STAVIT U ENV) I creators PARAMETARA TAKO DA AUTENTICIRANI USER NE MOZE STAVLJAT STA ZELI(NPR U POSTMAN)
      //*2) PROTECTION OD POZIVANJA API-A KOJI BI MINTA DOK NE ISPRAZNI NAS WALLET -> RATE LIMITER ILI OGRANICIT DA USER MOZE IMAT MAX 1 ILI ODREDEN BROJ KOLEKCIJA PO WALLETU
      if (
        !collectionMetadata ||
        !(
          Object.hasOwn(collectionMetadata, "uri") &&
          Object.hasOwn(collectionMetadata, "name") &&
          Object.hasOwn(collectionMetadata, "symbol") &&
          Object.hasOwn(collectionMetadata, "seller_fee_basis_points") &&
          Object.hasOwn(collectionMetadata, "creators")
        )
      ) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const { nft, response } = await metaplex.nfts().create({
        uri: collectionMetadata.uri,
        name: collectionMetadata.name,
        symbol: collectionMetadata.symbol,
        sellerFeeBasisPoints: collectionMetadata.seller_fee_basis_points,
        creators: collectionMetadata.creators.map((creator) => ({
          ...creator,
          address: new PublicKey(creator.address),
        })),
        isCollection: true, //*OZNACI NFT KAO COLLECTION NFT
        mintAuthority: boldMintAuthority, //*BoldMint JE AUTHORITY -> JEDINI MOZE MINTAT
        updateAuthority: boldMintAuthority, //*BoldMint JE AUTHORITY -> JEDINI MOZE UPDATEAT(AKO ZATREBA)
        collectionAuthority: boldMintAuthority, //*BoldMint JE AUTHORITY
      });
      const mintedCollectionNFTAddress = nft.address.toBase58();
      const { environment } = await createContenfulCMAConnection();
      //*KREIRAJ TRANSAKCIJU OD NFT
      const collectionNFTTransaction = await environment.createEntry(
        "transaction",
        {
          fields: {
            transactionId: {
              "en-US": response.signature,
            },
            creatorReceivedAmmount: {
              "en-US": 0,
            },
          },
        }
      );
      const transactionEntry = await collectionNFTTransaction.publish();
      //*KREIRAJ NFT OBJEKT
      const collectionNFT = await environment.createEntry("nft", {
        fields: {
          address: {
            "en-US": mintedCollectionNFTAddress,
          },
          transaction: {
            "en-US": {
              sys: {
                id: transactionEntry.sys.id,
                type: "Link",
                linkType: "Entry",
              },
            },
          },
          isCollection: {
            "en-US": true,
          },
        },
      });
      const nftEntry = await collectionNFT.publish();
      //*AZURIRAJ POTREBNE USER FIELDOVE -> POTREBNO DOHVATIT SVE FIELDSOVE
      const creatorMetadata = await getUserMetadataByUserId(creatorId);
      const creatorEntry = await environment.getEntry(creatorMetadata.entryId);
      creatorEntry.fields["isCreator"] = { "en-US": true };
      creatorEntry.fields["creatorAbout"] = { "en-US": aboutText };
      creatorEntry.fields["creatorTags"] = { "en-US": creatorTags };
      creatorEntry.fields["collectionNftAddress"] = {
        "en-US": mintedCollectionNFTAddress,
      };
      creatorEntry.fields["creatorWalletAddress"] = {
        "en-US": creatorWallet,
      };
      const updatedCreatorEntity = await creatorEntry.update();
      await updatedCreatorEntity.publish();
      res.status(200).json({
        collectionAddress: mintedCollectionNFTAddress,
      });
    } catch (error) {
      console.error("Error creating NFT:", error);
      res.status(500).json({ error: "Failed to create NFT" });
    }
  },
  (sessionData) => !sessionData.userData.isCreator,
  (reqBody, sessionData) => reqBody.creatorId === sessionData.userData.userId
);
