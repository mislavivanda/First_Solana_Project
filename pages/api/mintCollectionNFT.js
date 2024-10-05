import {
  Metaplex,
  keypairIdentity,
  irysStorage,
} from "@metaplex-foundation/js";
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  getCollectionNFTCreatorData,
  getUserMetadataByUserId,
} from "../../lib/dataSource";
import { createContenfulCMAConnection } from "../../helpers";
import { withAuthRoute } from "../../lib/authMiddleware";
import bs58 from "bs58";

export default withAuthRoute(
  async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      //!OSIGURANJE OD NAPADA:
      //*1) PROTECTION OD POZIVANJA API-A KOJI BI MINTA NFT-OVE IZVAN NASEG APPA(KROZ POSTMAN) TAKO DA ZAOBIDE POSTUPAK TRANSFERA KOJI PRETHODI OVOME POZIVU U APP -> USER MOZE IMAT SAMO 1 NFT IZ KOLEKCIJE -> U BAZI CE BITI SPREMLJENO DA JE OBAVLJENA TRANSAKCIJA(signature) ZA ZADANU KOLEKCIJU(publicKey ADRESE) -> AKO NE POSTOJI TA TRANSAKCIJA ZA TAJ COLLECTION ONDA TRANSFER NIJE OBAVLJEN -> AKO OCE MINTAT IZVANKA BEZ DA JE NAPRAVIJA TU TRANSAKCIJU ONDA CE BITI ODBIJEN
      const connection = new Connection(
        process.env.HELIUS_RPC_URL,
        "confirmed"
      );

      //!MINT MOZE ODRADITI SAMO AUTHORITY KOLEKCIJE -> BoldMint
      const boldMintAuthority = Keypair.fromSecretKey(
        bs58.decode(process.env.BOLDMINT_PRIVATE_KEY)
      );

      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(boldMintAuthority))
        .use(
          irysStorage() //*decentralized storage network
        );

      // Get the NFT data from the request body
      const {
        collectionAddress,
        supporterAddress,
        transferedFundsTransactionSignature,
        creatorAmmount,
        supporterId,
      } = req.body;

      if (
        !collectionAddress ||
        !supporterAddress ||
        !transferedFundsTransactionSignature ||
        !creatorAmmount ||
        !supporterId
      ) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      const collectionPublicKey = new PublicKey(collectionAddress);
      const supporterPublicKey = new PublicKey(supporterAddress);

      const collectionNft = await metaplex
        .nfts()
        .findByMint({ mintAddress: collectionPublicKey });

      console.log(collectionNft.name);
      console.log(collectionNft.uri);
      console.log(collectionNft.sellerFeeBasisPoints);

      const { nft, response: mintedNftResponse } = await metaplex
        .nfts()
        .create({
          name: `${collectionNft.name}`,
          uri: collectionNft.uri,
          symbol: collectionNft.symbol,
          sellerFeeBasisPoints: collectionNft.sellerFeeBasisPoints,
          creators: collectionNft.creators,
          collection: collectionPublicKey,
          tokenOwner: supporterPublicKey,
        });
      const mintedNftAddress = nft.address.toBase58();
      //*VERIFY DA JE MINTANI NFT DIO KOLEKCIJE(ZASEBNA DODATNA TRANSAKCIJA) -> https://developers.metaplex.com/token-metadata/collections
      const { response: verificationResponse } = await metaplex
        .nfts()
        .verifyCollection({
          mintAddress: nft.address,
          collectionMintAddress: collectionPublicKey,
          isSizedCollection: true,
          collectionAuthority: boldMintAuthority,
        });
      //*DOHVATI CREATOR ENTRY PREMA COLLECTION NFT ADRESI
      const collectionCreatorMetadata = await getCollectionNFTCreatorData(
        collectionAddress
      );
      //*SPREMI SVE IZVRSENE TRANSAKCIJE
      const { environment } = await createContenfulCMAConnection();
      //*1) TRANSAKCIJA PRIJENOSA SREDSTAVA ZAJEDNO S creatorReceivedAmmount
      const transferredFundsTransaction = await environment.createEntry(
        "transaction",
        {
          fields: {
            transactionId: {
              "en-US": transferedFundsTransactionSignature,
            },
            creatorReceivedAmmount: {
              "en-US": creatorAmmount,
            },
          },
        }
      );
      const transferredFundsTransactionPublished =
        await transferredFundsTransaction.publish();
      //*2) TRANSKACIJA MINTANJA NFT
      const supporterNFTTransaction = await environment.createEntry(
        "transaction",
        {
          fields: {
            transactionId: {
              "en-US": mintedNftResponse.signature,
            },
            creatorReceivedAmmount: {
              "en-US": 0,
            },
          },
        }
      );
      const supporterNFTTransactionPublished =
        await supporterNFTTransaction.publish();
      //*3) TRANSKACIJA VERIFIKACIJE NFT
      const verificationTransaction = await environment.createEntry(
        "transaction",
        {
          fields: {
            transactionId: {
              "en-US": verificationResponse.signature,
            },
            creatorReceivedAmmount: {
              "en-US": 0,
            },
          },
        }
      );
      const verificationTransactionPublished =
        await verificationTransaction.publish();
      //*SPREMANJE MINTANOG NFT-A
      const mintedNFT = await environment.createEntry("nft", {
        fields: {
          address: {
            "en-US": mintedNftAddress,
          },
          transaction: {
            "en-US": {
              sys: {
                id: supporterNFTTransactionPublished.sys.id,
                type: "Link",
                linkType: "Entry",
              },
            },
          },
          verificationTransaction: {
            "en-US": {
              sys: {
                id: verificationTransactionPublished.sys.id,
                type: "Link",
                linkType: "Entry",
              },
            },
          },
          isCollection: {
            "en-US": false,
          },
        },
      });
      const mintedNFTPublished = await mintedNFT.publish();
      //*AZURIRAJ SUPPORTER POLJA(supportedCreatorIds, supportNfts, supportTransactionIds(ID OD PRVE TRANSAKCIJE))
      const supporterMetadata = await getUserMetadataByUserId(supporterId);
      const supporterEntry = await environment.getEntry(
        supporterMetadata.entryId
      );
      if (!supporterEntry.fields["supportedCreatorIds"])
        supporterEntry.fields["supportedCreatorIds"] = { "en-US": [] };
      supporterEntry.fields["supportedCreatorIds"] = {
        "en-US": [
          ...supporterEntry.fields["supportedCreatorIds"]["en-US"],
          collectionCreatorMetadata.creatorId,
        ],
      };
      if (!supporterEntry.fields["supportNfts"])
        supporterEntry.fields["supportNfts"] = { "en-US": [] };
      supporterEntry.fields["supportNfts"] = {
        "en-US": [
          ...supporterEntry.fields["supportNfts"]["en-US"],
          mintedNftAddress,
        ],
      };
      if (!supporterEntry.fields["supportTransactionIds"])
        supporterEntry.fields["supportTransactionIds"] = { "en-US": [] };
      supporterEntry.fields["supportTransactionIds"] = {
        "en-US": [
          ...supporterEntry.fields["supportTransactionIds"]["en-US"],
          transferedFundsTransactionSignature,
        ],
      };
      const updatedSupporterEntry = await supporterEntry.update();
      await updatedSupporterEntry.publish();
      //*AZURIRANJE CREATOR POLJA(receivedTransactionIds(ID OD PRVE TRANSAKCIJE))
      const creatorEntry = await environment.getEntry(
        collectionCreatorMetadata.entryId
      );
      if (!creatorEntry.fields["receivedTransactionIds"])
        creatorEntry.fields["receivedTransactionIds"] = { "en-US": [] };
      creatorEntry.fields["receivedTransactionIds"] = {
        "en-US": [
          ...creatorEntry.fields["receivedTransactionIds"]["en-US"],
          transferedFundsTransactionSignature,
        ],
      };
      const updatedCreatorEntity = await creatorEntry.update();
      await updatedCreatorEntity.publish();
      res.status(200).json({
        mintedNftAddress,
      });
    } catch (error) {
      console.error("Error minting NFT:", error);
      res.status(500).json({ error: "Failed to mint NFT" });
    }
  },
  (sessionData) => !sessionData.userData.isCreator,
  (reqBody, sessionData) => reqBody.supporterId === sessionData.userData.userId
);
