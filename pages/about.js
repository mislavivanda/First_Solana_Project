import Image from "next/image";
import LogoImage from "../assets/logo.png";

const About = () => {
  return (
    <>
      <h1 className="inline text-5xl font-extrabold  mx-5 sm:mx-10 w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
        About us
      </h1>
      <section className="mx-auto mt-20 w-full max-w-screen-md flex flex-col items-center">
        <div className="flex items-center">
          <Image
            src={LogoImage}
            height={100}
            width={100}
            layout="fixed"
            alt="Brand logo"
          />
          <span className="ml-1 text-primary-color text-5xl font-extrabold">
            Solana
          </span>
        </div>
      </section>
    </>
  );
};

export default About;
