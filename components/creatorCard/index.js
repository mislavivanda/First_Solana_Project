import Avatar from "../avatar";
import PostIcon from "../../assets/postIcon";
import SupportIcon from "../../assets/supportIcon";
import { capitalizeFirstLetter } from "../../helpers";
import { useRouter } from "next/router";

const CreatorCard = ({ creatorData }) => {
  const router = useRouter();
  return (
    <div
      className="flex-col items-stretch rounded-md bg-white shadow-md cursor-pointer hover:scale-[1.03]"
      onClick={() => router.push(`/creators/${creatorData.creatorId}`)}
    >
      <div className="flex-col items-center grow p-2">
        <div className="text-right">
          <span className="text-primary-color font-bold">2 NEW</span>
        </div>
        <Avatar
          firstLetter={`${capitalizeFirstLetter(
            creatorData.name.charAt(0)
          )}${capitalizeFirstLetter(creatorData.surname.charAt(0))}`}
          containerClasses="justify-center"
        />
        <p className="text-lg text-center break-words">{`${creatorData.name} ${creatorData.surname}`}</p>
      </div>
      <div className="pl-2 pr-2 pt-1 pb-1 border-t-primary-color border-t-2 border-solid rounded-br-md rounded-bl-md">
        <div className="flex justify-between">
          <div className="flex items-center">
            <PostIcon classes="w-[20px] h-[20px] fill-font-color-dark" />
            <span className="text-sm ml-1 font-semibold">
              {creatorData.postsCount}
            </span>
          </div>
          <div className="flex items-center">
            <SupportIcon classes="w-[20px] h-[20px] fill-font-color-dark" />
            <span className="text-sm ml-1 font-semibold">
              {creatorData.supportersCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
