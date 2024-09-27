import Avatar from "../avatar";
import PostIcon from "../../assets/postIcon";
import SupportIcon from "../../assets/supportIcon";

const CreatorCard = ({ onCardClick }) => {
  return (
    <div
      className="flex-col items-stretch rounded-md bg-white shadow-md cursor-pointer hover:scale-105"
      onClick={onCardClick}
    >
      <div className="flex-col items-center grow p-2">
        <div className="text-right">
          <span className="text-primary-color font-bold">2 NEW</span>
        </div>
        <Avatar firstLetter="MI" containerClasses="justify-center" />
        <p className="text-lg text-center break-words">Mislav Ivanda</p>
      </div>
      <div className="pl-2 pr-2 pt-1 pb-1 border-t-primary-color border-t-2 border-solid rounded-br-md rounded-bl-md">
        <div className="flex justify-between">
          <div className="flex items-center">
            <PostIcon classes="w-[20px] h-[20px] fill-font-color-dark" />
            <span className="text-sm ml-1 font-semibold">11</span>
          </div>
          <div className="flex items-center">
            <SupportIcon classes="w-[20px] h-[20px] fill-font-color-dark" />
            <span className="text-sm ml-1 font-semibold">125</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
