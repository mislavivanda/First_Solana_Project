import { withAuthRoute } from "../../lib/authMiddleware";
import { getPostData, getUserMetadataByUserId } from "../../lib/dataSource";

export default withAuthRoute(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { postSlug, getCreatorId } = req.body;

  try {
    const postData = await getPostData(postSlug);
    if (!postData) throw new Error("Post doesn't exist");
    console.log("Post data", postData);
    const creatorMetadata = await getUserMetadataByUserId(postData.creatorId);
    res.status(200).json(
      getCreatorId
        ? { creatorId: postData.creatorId }
        : {
            ...postData,
            creatorName: creatorMetadata.name,
            creatorSurname: creatorMetadata.surname,
          }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
