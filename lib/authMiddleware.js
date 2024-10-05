import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

//TODO -> DODAJ I ROLE BASED DIO
//TODO -> PROVJERA JE LI PROSLIJEDENIO USER ID KAO API PARAMETAR ISTI ONOME IZ SESSION TOKENA
export const withAuthRoute = (handler) => {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    console.log("Server session");
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" }); // Not authenticated
    }

    return handler(req, res); // Call the original handler if authenticated
  };
};
