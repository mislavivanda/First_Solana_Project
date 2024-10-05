import Image from "next/image";
import LogoImage from "../assets/logo.png";
import DescriptionSection from "../modules/descriptionSection";
import WhyUseSection from "../modules/whyUseSection";

const About = () => {
  return (
    <div>
      <h1 className="inline text-5xl font-extrabold  mx-5 sm:mx-10 w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
        About us
      </h1>
      <section className="mx-auto mt-10 w-full max-w-screen-md flex flex-col items-center">
        <div className="flex items-center">
          <Image
            src={LogoImage}
            height={100}
            width={100}
            layout="fixed"
            alt="Brand logo"
          />
          <span className="ml-1 text-primary-color text-5xl font-extrabold">
            BoldMint
          </span>
        </div>
        <DescriptionSection containerClasses="mt-[3.75rem]" />
        <WhyUseSection />
      </section>
    </div>
  );
};

export default About;
