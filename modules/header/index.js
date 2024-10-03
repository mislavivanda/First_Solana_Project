import { useRouter } from "next/router";
import {
  Button,
  Avatar,
  BurgerNavigation,
  SolanaWallet,
} from "../../components";
import Dropdown from "../../components/dropdown";
import Image from "next/image";
import LogoImage from "../../assets/logo.png";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className="flex-shrink-0 border-b-2 border-primary-color w-full px-6 sm:px-12 py-2 flex items-center justify-between sm:justify-start bg-white z-40">
      <div
        className="flex items-center hover:cursor-pointer z-40"
        onClick={() => router.push("/")}
      >
        <Image
          src={LogoImage}
          height={40}
          width={40}
          layout="fixed"
          alt="Company logo"
        />
        <span className="ml-1 text-primary-color text-2xl">BoldMint</span>
      </div>
      <BurgerNavigation
        isBurgerOpen={isBurgerOpen}
        setIsBurgerOpen={setIsBurgerOpen}
      />
      <div className="hidden sm:flex items-center justify-end flex-grow">
        {session ? (
          <>
            <SolanaWallet classes="mr-2" />
            <Avatar firstLetter={session.userData.name[0].toUpperCase()} />
            <Dropdown />
          </>
        ) : (
          <>
            <Button
              onClick={() => router.push("/register")}
              type="filled"
              classes="mr-[1rem]"
            >
              Register
            </Button>
            <Button onClick={() => router.push("/login")} type="classic">
              Login
            </Button>
          </>
        )}
      </div>
      {/*Burger bar icon*/}
      <div
        className="sm:hidden lg:hidden flex flex-col items-center justify-evenly h-10 w-10 bg-white hover:cursor-pointer z-40"
        onClick={() => setIsBurgerOpen(!isBurgerOpen)}
      >
        <div
          className={`w-8 h-1 rounded-md bg-primary-color transition-all duration-500 ease-in-out ${
            isBurgerOpen ? "transform rotate-45  translate-y-[0.6875rem]" : ""
          }`}
        />
        <div
          className={`w-8 h-1 rounded-md bg-primary-color transition-all duration-500 ease-in-out ${
            isBurgerOpen ? "transform translate-x-5 bg-transparent" : ""
          }`}
        />
        <div
          className={`w-8 h-1 rounded-md bg-primary-color transition-all duration-500 ease-in-out ${
            isBurgerOpen
              ? "transform -rotate-45 -translate-y-[0.6875rem]  "
              : ""
          }`}
        />
      </div>
    </header>
  );
};

export default Header;
