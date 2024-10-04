import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createSurname, capitalizeFirstLetter } from "../../../helpers";
import { getUserMetadataByUserId } from "../../../lib/dataSource";
//CATCH ALL ROUTE(FILENAME [...NAME].js)-> All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
const authOptions = {
  session: {
    jwt: true,
  },
  secret: process.env.SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        //credentials je objekt koji se proslijeduje kod poziva signIn('credentials',objekt) funkcije
        //poozivi contenful
        const userData = await fetch(
          //pozovi api koji provjerava email i password -> u produkciji TLS tako da se ne moze vidit username i pass od napadaca
          //*API RUTA = IMEA FILEA
          `${process.env.DOMAIN}/api/userauth`,
          {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "https://graphql.contentful.com",
            },
            mode: "cors",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => data);

        if (userData.data) {
          // Any object returned will be saved in `user` property of the JWT
          //ovo vracamo pozivu signin funkcije
          return userData.data;
        }
        // If you return null or false then the credentials will be rejected
        else return null;
      },
    }),
  ],

  /*The options displayed on the sign-up page are automatically generated based on the providers specified in the options passed to NextAuth.js. */
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      //u slucaju prijave preko credntials providera podaci su vec dohvaceni i authorize i ne treba zvat contentful API
      if (user && account) {
        //ovisno o provider drukciji je format imena i maila kojeg vraca, zakaci to na jwt ovisno o provideru
        if (account.provider === "github" || account.provider === "google") {
          if (account.provider === "github") {
            let nameSurnameWordArray = profile.name.split(" ");
            let surname = createSurname(nameSurnameWordArray);
            token.user = {
              name: nameSurnameWordArray[0],
              surname: surname,
              email: profile.email,
            };
          } else if (account.provider === "google") {
            //ime i prezime vraća sve malim slovima
            let nameSurnameWordArray = profile.name.split(" ");

            let surname = createSurname(nameSurnameWordArray, true);

            token.user = {
              name: capitalizeFirstLetter(nameSurnameWordArray[0]),
              surname: surname,
              email: profile.email,
            };
          } //credentials autentikacija, returnani parametri kao objekt iz authorize funkcije, samo ih postavimo
        } else token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.userData = token.user;
      const userMetadata = await getUserMetadataByUserId(
        session.userData.userId
      );
      //*DOHVATI NAJNOVIJE META PODATKE
      if (userMetadata)
        session.userData = { ...session.userData, ...userMetadata };
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};
export { authOptions };
export default NextAuth(authOptions);
