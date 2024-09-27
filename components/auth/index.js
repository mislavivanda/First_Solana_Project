//komponeneta koja u _app.js s kojom wrappamo SAMO ONE STRANICE KOJE ZAHTIJEVAJU AUTENTIKACIJU
//PROVJERAVA POSTOJI LI SESIJA, AKO NE REDIRECTA NA LOGIN
import { useSession } from "next-auth/react";

const AuthComponent = ({ children }) => {
  const { data: session, status } = useSession({
    required: true, //The default behavior is to redirect the user to the sign-in page, from where - after a successful login - they will be sent back to the page they started on.
  });

  if (session) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

export default AuthComponent;
