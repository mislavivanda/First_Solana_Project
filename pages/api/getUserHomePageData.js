import { withAuthRoute } from "../../lib/authMiddleware";
import {
  getUserMetadataByUserId,
  getUserSupportedCreatorsData,
  getMostPopularCreatorsData,
} from "../../lib/dataSource";
export default withAuthRoute(
  async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    try {
      const userMetdata = await getUserMetadataByUserId(userId);
      if (userMetdata) {
        userMetdata.supportedCreators = await getUserSupportedCreatorsData(
          userId
        );
        userMetdata.popularCreators = await getMostPopularCreatorsData(5);
      }
      res.status(200).json(userMetdata);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  (sessionData) => !sessionData.userData.isCreator,
  (reqBody, sessionData) => reqBody.userId === sessionData.userData.userId
);
