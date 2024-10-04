import UnauthorizedHomePage from "../modules/unauthorizedHomePage";
import UserHomePage from "../modules/userHomePage";
import CreatorHomePage from "../modules/creatorHomePage";
import { AuthorizedPage } from "../components";

const HomePage = () => {
  return (
    <AuthorizedPage
      unauthorizedFallbackComponent={<UnauthorizedHomePage />}
      //*REACT EVALUATEA PROPOVE PRIJE NEGO IH POSALJE PARENTU -> NE MOZE KORISTIT DIREKTNO KAO children OD AuthorizedPage JER sessionData NE POSTOJI PRILIKOM PROSLIJEDIVANJA U AuthorizedPage KOMPONENTU
      renderChildrenMethod={(sessionData) =>
        sessionData.userData.isCreator ? <CreatorHomePage /> : <UserHomePage />
      }
    ></AuthorizedPage>
  );
};

export default HomePage;
