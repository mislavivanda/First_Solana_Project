import { Button } from "../../components";
import { useRouter } from "next/router";
import DescriptionSection from "../descriptionSection";
import WhyUseSection from "../whyUseSection";
const UnauthorizedHomePage = () => {
  const router = useRouter();
  return (
    <>
      <section>
        <div className="mt-10">
          <h1 className="text-5xl font-extrabold">
            Welcome to <span className="text-primary-color">BoldMint</span>
          </h1>
          <DescriptionSection containerClasses="mt-4" />
        </div>
      </section>
      <section className="mt-[3.75rem]">
        <p className="font-light mt-2 text-xl sm:text-3xl max-w-[65ch]">
          BoldMint welcomes two key types of users:{" "}
          <span className="font-bold">content creators</span> and those who love
          to <span className="font-bold">explore and support</span> creative
          work.
        </p>
        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_auto_1fr] mt-5">
          <div>
            <h3 className="text-2xl sm:text-3xl">Content Creators</h3>
            <p className="font-light mt-2 text-lg sm:text-xl">
              Turn your ideas into exclusive NFTs on the Solana blockchain.
              Anyone can become a creator by filling out a simple form!
            </p>
            <Button
              classes="mt-2 !text-xl"
              type="filled"
              onClick={() => router.push("/register")}
            >
              Become Creator
            </Button>
          </div>
          <div className="bg-[#ccc] w-full h-[2px] sm:h-full sm:w-[2px] my-5 mx-0 sm:my-0 sm:mx-5" />
          <div>
            <h3 className="text-2xl sm:text-3xl">Supporters</h3>
            <p className="font-light mt-2 text-lg sm:text-xl">
              Discover and support your favorite creators by purchasing their
              NFTs for access to their content.
            </p>
            <Button
              classes="mt-2 !text-xl"
              type="filled"
              onClick={() => router.push("/register")}
            >
              Explore Content
            </Button>
          </div>
        </div>
      </section>
      <WhyUseSection />
      <section className="flex justify-center mt-10">
        <Button
          type="filled"
          classes="!text-2xl"
          onClick={() => router.push("/register")}
        >
          Get started
        </Button>
      </section>
    </>
  );
};

export default UnauthorizedHomePage;
