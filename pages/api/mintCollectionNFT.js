import {
  Metaplex,
  keypairIdentity,
  irysStorage,
} from "@metaplex-foundation/js";
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { withAuthRoute } from "../../lib/authMiddleware";
import bs58 from "bs58";

export default withAuthRoute(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    //!OSIGURANJE OD NAPADA:
    //*1) PROTECTION OD POZIVANJA API-A KOJI BI MINTA NFT-OVE IZVAN NASEG APPA(KROZ POSTMAN) TAKO DA ZAOBIDE POSTUPAK TRANSFERA KOJI PRETHODI OVOME POZIVU U APP -> USER MOZE IMAT SAMO 1 NFT IZ KOLEKCIJE -> U BAZI CE BITI SPREMLJENO DA JE OBAVLJENA TRANSAKCIJA(signature) ZA ZADANU KOLEKCIJU(publicKey ADRESE) -> AKO NE POSTOJI TA TRANSAKCIJA ZA TAJ COLLECTION ONDA TRANSFER NIJE OBAVLJEN -> AKO OCE MINTAT IZVANKA BEZ DA JE NAPRAVIJA TU TRANSAKCIJU ONDA CE BITI ODBIJEN
    const connection = new Connection(clusterApiUrl("devnet"));

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
    const { collectionAddress, supporterAddress } = req.body;

    if (!collectionAddress || !supporterAddress) {
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

    const { nft } = await metaplex.nfts().create({
      name: `${collectionNft.name}`,
      uri: collectionNft.uri,
      symbol: collectionNft.symbol,
      sellerFeeBasisPoints: collectionNft.sellerFeeBasisPoints,
      creators: collectionNft.creators,
      collection: collectionPublicKey,
      tokenOwner: supporterPublicKey,
    });
    //*VERIFY DA JE MINTANI NFT DIO KOLEKCIJE(ZASEBNA DODATNA TRANSAKCIJA) -> https://developers.metaplex.com/token-metadata/collections
    await metaplex.nfts().verifyCollection({
      mintAddress: nft.address,
      collectionMintAddress: collectionPublicKey,
      isSizedCollection: true,
      collectionAuthority: boldMintAuthority,
    });
    res.status(200).json({
      mintedNftAddress: nft.address.toBase58(),
    });
  } catch (error) {
    console.error("Error minting NFT:", error);
    res.status(500).json({ error: "Failed to mint NFT" });
  }
});
