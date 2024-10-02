import {
  Metaplex,
  keypairIdentity,
  irysStorage,
} from "@metaplex-foundation/js";
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const connection = new Connection(clusterApiUrl("devnet"));

    //!KREIRANJE MOZE ODRADITI SAMO AUTHORITY KOLEKCIJE -> BoldMint
    const boldMintAuthority = Keypair.fromSecretKey(
      bs58.decode(process.env.BOLDMINT_PRIVATE_KEY)
    );

    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(boldMintAuthority))
      .use(
        irysStorage() //*decentralized storage network
      );

    const { collectionMetadata } = req.body;

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

    const { nft } = await metaplex.nfts().create({
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
    res.status(200).json({
      collectionAddress: nft.address.toBase58(),
    });
  } catch (error) {
    console.error("Error creating NFT:", error);
    res.status(500).json({ error: "Failed to create NFT" });
  }
}
