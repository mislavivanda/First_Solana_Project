import UnauthorizedHomePage from "../modules/unauthorizedHomePage";
import UserHomePage from "../modules/userHomePage";
import CreatorHomePage from "../modules/creatorHomePage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return <UnauthorizedHomePage />;
  } else if (session.isCreator) {
    return <CreatorHomePage />;
  } else return <UserHomePage />;
};

export default HomePage;
