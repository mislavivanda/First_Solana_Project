import { withAuthRoute } from "../../lib/authMiddleware";
import { getPostData, getUserMetadataByUserId } from "../../lib/dataSource";

export default withAuthRoute(
  async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { postSlug, userId } = req.body;

    if (!postSlug || !userId) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    try {
      let postData = await getPostData(postSlug);
      if (postData) {
        let shouldPostData = false;
        if (userId === postData.creatorId) {
          shouldPostData = true;
        } else {
          const userMetadata = await getUserMetadataByUserId(userId);
          if (userMetadata.supportedCreatorIds.includes(postData.creatorId))
            shouldPostData = true;
        }
        const creatorMetadata = await getUserMetadataByUserId(
          postData.creatorId
        );
        postData.creatorName = creatorMetadata.name;
        postData.creatorSurname = creatorMetadata.surname;
      }
      res.status(200).json(postData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  null,
  (reqBody, sessionData) => reqBody.userId === sessionData.userData.userId
);
