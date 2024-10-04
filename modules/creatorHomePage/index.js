import PostIcon from "../../assets/postIcon";
import SupportIcon from "../../assets/supportIcon";
import ProfitIcon from "../../assets/profitIcon";
import { Button, SelectInput, Widget, PostCard } from "../../components";
import { useRouter } from "next/router";

const CreatorHomePage = () => {
  const router = useRouter();
  return (
    <>
      <section>
        <h1 className="inline text-3xl font-extrabold  mx-5 sm:mx-10 w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
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
              value={`11`}
              description="POSTS"
              icon={<PostIcon classes="w-[4rem] h-[4rem] fill-primary-color" />}
            />
            <Widget
              value={`29 SOL`}
              description="PROFIT"
              icon={<ProfitIcon classes="w-[4rem] h-[4rem]" />}
            />
            <Widget
              value={<span className="text-green-600">+12</span>}
              description="SUPPORTERS"
              icon={
                <SupportIcon classes="w-[4rem] h-[4rem] fill-primary-color" />
              }
            />
          </div>
        </div>
      </section>
      <section>
        <h1 className="inline text-3xl font-extrabold  mx-5 sm:mx-10 w-full max-w-screen-xl text-left border-b-primary-color border-b-[5px] border-solid">
          Posts
        </h1>
        <div className="mt-6 mb-6 grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </section>
      <div className="w-full mx-auto mb-2 flex items-center justify-center">
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
