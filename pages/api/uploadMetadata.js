export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const metadata = req.body;
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_KEY_SECRET,
      },
      body: JSON.stringify(metadata),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Metadata uploaded to IPFS:", data.IpfsHash);
    res.status(200).json({
      success: true,
      ipfsUrl: `https://ipfs.io/ipfs/${data.IpfsHash}`,
    });
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
