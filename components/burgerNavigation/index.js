import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Button,
  SolanaWallet,
  Dropdown,
  Avatar,
  BecomeCreatorButton,
} from "..";

const BurgerNavigation = ({ isBurgerOpen, setIsBurgerOpen }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const isUserLoggedIn = !!session;
  //*SHOWED ONLY ON SMALL SCREENS
  return (
    <section
      className={`${
        !isBurgerOpen ? "translate-x-full" : "translate-x-0"
      } sm:hidden flex flex-col items-center justify-around fixed top-0 right-0 w-[200px] h-screen transition-transform duration-500 ease-in-out bg-white z-30`}
    >
      {!isUserLoggedIn ? (
        <div className="mb-2 flex items-center">
          <Button
            onClick={() => {
              setIsBurgerOpen(false);
              router.push("/register");
            }}
            type="filled"
            classes="mr-[2rem]"
          >
            Register
          </Button>
          <Button
            onClick={() => {
              setIsBurgerOpen(false);
              router.push("/login");
            }}
            type="classic"
          >
            Login
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <Avatar firstLetter={session.userData.name[0].toUpperCase()} />
            <Dropdown />
          </div>
          <SolanaWallet />
        </>
      )}
      {isUserLoggedIn && (
        <BecomeCreatorButton onClickCallback={() => setIsBurgerOpen(false)} />
      )}
    </section>
  );
};

export default BurgerNavigation;
