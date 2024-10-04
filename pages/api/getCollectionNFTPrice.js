import { Metaplex } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const calculateNFTPrice = (mintedCount) => {
  const a = 0.0008;
  const b = 0.01;
  const c = 0.15; //*POCETNA CIJENA
  return a * Math.pow(mintedCount, 2) + b * mintedCount + c;
};

const getMintedNFTCount = async (collectionAddress) => {
  const connection = new Connection(process.env.HELIUS_RPC_URL, "confirmed");

  //*NIJE POTREBNO SPECIFIKACIJA WALLETA ZA DOHVAT PODATAKA
  const metaplex = Metaplex.make(connection);

  try {
    //*DOHVAT SVIH BOLD MINT NFT-OVA
    console.log("API CALL 1");
    const updateAuthorityNFTS = await metaplex.nfts().findAllByUpdateAuthority({
      updateAuthority: new PublicKey(process.env.BOLDMINT_PUBLIC_KEY),
    });
    console.log("API CALL 2");

    //*FILTER PO COLLECTION PROPERTY
    const collectionPublicKey = new PublicKey(collectionAddress);
    const nftsInCollection = updateAuthorityNFTS.filter((nft) => {
      return (
        nft.collection && nft.collection.address.equals(collectionPublicKey)
      );
    });
    console.log(nftsInCollection[0].address.toBase58());
    console.log(nftsInCollection[1].address.toBase58());
    return nftsInCollection.length;
  } catch (error) {
    console.error("Error fetching Candy Machine data:", error);
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  // Parse the request body
  const { collectionAddress } = req.body;

  if (!collectionAddress) {
    return res.status(400).json({ error: "Collection address is required" });
  }

  try {
    const mintedCount = await getMintedNFTCount(collectionAddress);

    if (mintedCount === null) {
      return res
        .status(404)
        .json({ error: "Candy Machine not found or error retrieving data" });
    }

    const priceInSol = calculateNFTPrice(mintedCount);

    return res.status(200).json({
      mintedCount,
      priceInSol: Math.round(priceInSol * 100) / 100,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
