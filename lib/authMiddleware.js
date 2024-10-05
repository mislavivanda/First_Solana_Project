import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const withAuthRoute = (handler, roleCheckMethod, checkUserId) => {
  return async (req, res) => {
    const sessionData = await getServerSession(req, res, authOptions);
    if (!sessionData) {
      return res.status(401).json({ message: "Not authenticated" }); // Not authenticated
    } else if (roleCheckMethod && !roleCheckMethod(sessionData)) {
      return res.status(401).json({ message: "Not authorized" }); // Not authenticated
    } else if (checkUserId && !checkUserId(req.body, sessionData)) {
      //*ZA API ZAHTJEVE KOJI OCEKUJU userId POTREBNO PROVJERITI JE LI PROSLIJEDENI userId IDENTICAN userId U SESSION TOKENU
      return res.status(401).json({ message: "Invalid auth parameters" });
    }
    return handler(req, res); // Call the original handler if authenticated
  };
};
