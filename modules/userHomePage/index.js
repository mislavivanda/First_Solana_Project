import { BecomeCreatorButton, CreatorCard } from "../../components";
import { useRouter } from "next/router";

const UserHomePage = () => {
  const router = useRouter();

  const onPopularCreatorClick = () => router.push(`/creators/1`);

  return (
    <div>
      <section>
        <h1 className="inline text-3xl font-extrabold  mx-5 sm:mx-10 w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
          Your creators
        </h1>
        <div className="mt-6 mb-2 grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          <CreatorCard />
          <CreatorCard />
          <CreatorCard />
          <CreatorCard />
          <CreatorCard />
          <CreatorCard />
          <CreatorCard />
          <CreatorCard />
          <CreatorCard />
        </div>
      </section>
      <section>
        <h1 className="inline text-3xl font-extrabold  mx-5 sm:mx-10 w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
          Popular creators
        </h1>
        <div className="mt-6 mb-2 grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          <CreatorCard onCardClick={onPopularCreatorClick} />
          <CreatorCard onCardClick={onPopularCreatorClick} />
        </div>
      </section>
      <BecomeCreatorButton />
    </div>
  );
};

export default UserHomePage;
