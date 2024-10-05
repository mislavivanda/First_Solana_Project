import PostIcon from "../../assets/postIcon";
import SupportIcon from "../../assets/supportIcon";
import ProfitIcon from "../../assets/profitIcon";
import {
  Button,
  SelectInput,
  Widget,
  PostCard,
  Spinner,
} from "../../components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CreatorHomePage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [dataLoading, setDataLoading] = useState(true);
  const [creatorHomePageData, setCreatorHomePageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getCreatorHomeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: sessionData.userData.userId,
        }),
      });
      if (!response.ok) {
        throw new Error("Data fetch error");
      }
      const creatorHomePageData = await response.json();
      setCreatorHomePageData(creatorHomePageData);
      setDataLoading(false);
    };
    fetchData();
  }, []);

  if (dataLoading || !creatorHomePageData)
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
          <span className="text-primary-color">{`${creatorHomePageData.name} ${creatorHomePageData.surname}`}</span>
        </h1>
        <br />
        <h1 className="inline text-3xl font-extrabold w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
          Analytics
        </h1>
        <div className="mt-8 text-3xl font-extrabold text-font-color">
          <div className="ml-5 sm:ml-10">
            <SelectInput
              selectOptions={["Today", "Last week", "Last month"]}
              defaultValue="Today"
            />
          </div>
          <div className="my-5 w-full mx-auto flex items-center lg:justify-evenly overflow-x-auto">
            <Widget
              value={creatorHomePageData.postsCount}
              description="POSTS"
              icon={<PostIcon classes="w-[4rem] h-[4rem] fill-primary-color" />}
            />
            <Widget
              value={
                Math.round(
                  creatorHomePageData.analytics.totalReceivedAmmount * 100
                ) / 100
              }
              description="PROFIT"
              icon={<ProfitIcon classes="w-[4rem] h-[4rem]" />}
            />
            <Widget
              value={
                <span>{creatorHomePageData.analytics.supportersCount}</span>
              }
              description="SUPPORTERS"
              icon={
                <SupportIcon classes="w-[4rem] h-[4rem] fill-primary-color" />
              }
            />
          </div>
        </div>
      </section>
      <section>
        <h1 className="inline text-3xl font-extrabold w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
          Posts
        </h1>
        <div className="mt-6 mb-6 grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {creatorHomePageData.postsData.length > 0 ? (
            creatorHomePageData.postsData.map((postData, index) => (
              <PostCard key={index} postCardData={postData} />
            ))
          ) : (
            <p>No posts yet</p>
          )}
        </div>
      </section>
      <div className="mt-4 w-full mx-auto mb-2 flex items-center justify-center">
        <Button
          type="filled"
          classes="!text-2xl"
          onClick={() => router.push("createcontent")}
        >
          Create content
        </Button>
      </div>
    </>
  );
};

export default CreatorHomePage;
