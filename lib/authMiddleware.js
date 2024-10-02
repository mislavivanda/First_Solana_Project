import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const withAuthRoute = (handler) => {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Not authenticated" }); // Not authenticated
    }

    return handler(req, res); // Call the original handler if authenticated
  };
};
