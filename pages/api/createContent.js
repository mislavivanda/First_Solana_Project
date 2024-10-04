const contentfulManagement = require("contentful-management");
import { withAuthRoute } from "../../lib/authMiddleware";
import { v4 as uuidv4 } from "uuid";

const contenfulClient = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN,
});

export default withAuthRoute(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { postContent, creatorId, title, tags } = req.body;

  if (!postContent || !creatorId || !title) {
    return res.status(400).json({ error: "Invalid parms format" });
  }

  try {
    const space = await contenfulClient.getSpace(
      process.env.CONTENTFUL_SPACE_ID
    );
    const environment = await space.getEnvironment("master");
    const postSlug = uuidv4();
    const postEntry = await environment.createEntry("post", {
      fields: {
        creatorId: {
          "en-US": creatorId,
        },
        content: {
          "en-US": postContent,
        },
        createdAt: {
          "en-US": new Date(),
        },
        slug: {
          "en-US": postSlug,
        },
        title: {
          "en-US": title,
        },
        tags: {
          "en-US": tags || [],
        },
      },
    });
    await postEntry.publish();
    res.status(200).json({
      postSlug,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});