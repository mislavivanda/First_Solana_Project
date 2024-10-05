import { withAuthRoute } from "../../lib/authMiddleware";
import {
  getCreatorMetadata,
  getCreatorAnalyticsData,
  getCreatorPosts,
} from "../../lib/dataSource";
export default withAuthRoute(
  async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { creatorId } = req.body;

    if (!creatorId) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    try {
      const creatorMetdata = await getCreatorMetadata(creatorId);
      if (creatorMetdata) {
        creatorMetdata.analytics = await getCreatorAnalyticsData(creatorId);
        creatorMetdata.postsData = await getCreatorPosts(creatorId);
      }
      res.status(200).json(creatorMetdata);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  (sessionData) => sessionData.userData.isCreator,
  (reqBody, sessionData) => reqBody.creatorId === sessionData.userData.userId
);
