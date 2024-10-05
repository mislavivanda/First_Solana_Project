import { BecomeCreatorButton, CreatorCard, Spinner } from "../../components";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserHomePage = () => {
  const { data: sessionData } = useSession();

  const [dataLoading, setDataLoading] = useState(true);
  const [userHomePageData, setUserHomePageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getUserHomePageData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: sessionData.userData.userId,
        }),
      });
      if (!response.ok) {
        throw new Error("Data fetch error");
      }
      const userHomePageData = await response.json();
      setUserHomePageData(userHomePageData);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  if (dataLoading || !userHomePageData)
    return (
      <div className="w-full h-full flex-grow flex items-center justify-center">
        <Spinner classes="w-[3rem] h-[3rem] border-primary-color" />
      </div>
    );

  return (
    <>
      <section>
        <h1 className="text-5xl font-extrabold">
          Welcome back{" "}
          <span className="text-primary-color">{`${userHomePageData.name} ${userHomePageData.surname}`}</span>
        </h1>
        <br />
        <h1 className="inline text-3xl font-extrabold w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
          Your creators
        </h1>
        <div className="mt-6 mb-2 grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {userHomePageData.supportedCreators.length > 0 ? (
            userHomePageData.supportedCreators.map((creatorData, index) => (
              <CreatorCard key={index} creatorData={creatorData} />
            ))
          ) : (
            <p>No supported creators yet</p>
          )}
        </div>
      </section>
      <section className="mt-4">
        <h1 className="inline text-3xl font-extrabold w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
          Popular creators
        </h1>
        <div className="mt-6 mb-2 grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {userHomePageData.popularCreators.map((creatorData, index) => (
            <CreatorCard key={index} creatorData={creatorData} />
          ))}
        </div>
      </section>
      <BecomeCreatorButton />
    </>
  );
};

export default UserHomePage;
