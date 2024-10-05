import { withAuthRoute } from "../../lib/authMiddleware";
import {
  getCreatorMetadata,
  getUserMetadataByUserId,
  getCreatorPosts,
} from "../../lib/dataSource";
export default withAuthRoute(
  async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { creatorId, userId } = req.body;

    if (!creatorId || !userId) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    try {
      const creatorMetdata = await getCreatorMetadata(creatorId);
      if (creatorMetdata) {
        let hasSupportedCreator = false;
        //*AKO JE userId=creatorId(USER PREGLEDAVA SVOJ PAGE) ILI USER SUPPORTA CREATORA TADA PRIKAZUJEJEMO ISTI PRIKAZ
        if (userId === creatorId) {
          hasSupportedCreator = true;
        } else {
          const userMetadata = await getUserMetadataByUserId(userId);
          if (userMetadata.supportedCreatorIds.includes(creatorId))
            hasSupportedCreator = true;
        }
        if (hasSupportedCreator) {
          //*DOHVAT POSTOVA OD CREATORA
          creatorMetdata.postsData = await getCreatorPosts(creatorId);
        }
      }
      res.status(200).json(creatorMetdata);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  null,
  (reqBody, sessionData) => reqBody.userId === sessionData.userData.userId
);
