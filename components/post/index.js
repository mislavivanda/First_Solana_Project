import { parseBlogDate } from "../../helpers";
import MarkdownViewer from "../markdownViewer/index.js";
import { useRouter } from "next/router";

const PostCard = ({ postCardData }) => {
  const router = useRouter();

  return (
    <article
      className="flex flex-col h-[300px] bg-white rounded-lg p-2 shadow-md overflow-hidden line-clamp-3 text-ellipsis cursor-pointer hover:scale-[1.01]"
      onClick={() => router.push(`/posts/${postCardData.slug}`)}
    >
      <div className="text-primary-color capitalize text-xl font-semibold border-b-2 border-solid border-primary-color pb-2">
        {postCardData.title}
      </div>
      <div className="text-lg flex-grow my-2 overflow-y-auto">
        <MarkdownViewer
          //eslint-disable-next-line react/no-children-prop
          children={postCardData.content}
        />
      </div>
      <div className="border-t-2 border-solid border-primary-color text-right font-semibold pt-2">
        {parseBlogDate(new Date(postCardData.createdAt))}
      </div>
    </article>
  );
};

export default PostCard;
