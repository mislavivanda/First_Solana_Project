import {
  AuthorizedPage,
  Avatar,
  MarkdownViewer,
  Spinner,
} from "../../components/index.js";
import { getPostData, getUserMetadataByUserId } from "../../lib/dataSource.js";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parseBlogDate, capitalizeFirstLetter } from "../../helpers/index.js";

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the query
  const { data: sessionData, status } = useSession();
  const [postDataLoading, setPostDataLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    if (status === "authenticated" && slug) {
      const fetchData = async () => {
        try {
          const postDataResponse = await fetch("/api/getPostData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postSlug: slug,
              userId: sessionData.userData.userId,
            }),
          });
          if (!postDataResponse.ok) {
            throw new Error("Failed to get post data");
          }
          const postData = await postDataResponse.json();
          console.log(postData);
          setPostData(postData);
          setPostDataLoading(false);
        } catch (err) {
          console.log("Error checking post credentials", err);
        }
      };

      fetchData();
    }
  }, [status, sessionData, slug]);

  return (
    <AuthorizedPage>
      {postDataLoading ? (
        <div className="w-full h-full flex-grow flex items-center justify-center">
          <Spinner classes="w-[3rem] h-[3rem] border-primary-color" />
        </div>
      ) : !postData ? (
        <div className="w-full h-full flex-grow flex items-center justify-center font-bold">
          Unauthorized.
        </div>
      ) : (
        <section className="mt-16">
          <article className="max-w-screen-lg mx-auto">
            <h4 className="text-font-color-light font-bold">
              {parseBlogDate(new Date(postData.createdAt))}
            </h4>
            <h1 className="my-5 text-5xl text-font-color font-extrabold ">
              {postData.title}
            </h1>
            <hr className="w-[200px] h-[2px] bg-primary-color" />
            <div className="flex items-center flex-wrap">
              <Avatar
                reverse={true}
                firstLetter={`${
                  capitalizeFirstLetter(postData.creatorName)[0]
                }${capitalizeFirstLetter(postData.creatorSurname)[0]}`}
                textContent={`${postData.creatorName} ${postData.creatorSurname}`}
              />
              <div className="flex items-center justify-end flex-grow">
                <svg
                  x="0px"
                  y="0px"
                  viewBox="0 0 58 58"
                  style={{ width: "1.875rem", height: "1.875rem" }}
                  className="m-2 hover:cursor-pointer"
                >
                  <g>
                    <path
                      fill="#2CB742"
                      d="M0,58l4.988-14.963C2.457,38.78,1,33.812,1,28.5C1,12.76,13.76,0,29.5,0S58,12.76,58,28.5
                    S45.24,57,29.5,57c-4.789,0-9.299-1.187-13.26-3.273L0,58z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M47.683,37.985c-1.316-2.487-6.169-5.331-6.169-5.331c-1.098-0.626-2.423-0.696-3.049,0.42
                    c0,0-1.577,1.891-1.978,2.163c-1.832,1.241-3.529,1.193-5.242-0.52l-3.981-3.981l-3.981-3.981c-1.713-1.713-1.761-3.41-0.52-5.242
                    c0.272-0.401,2.163-1.978,2.163-1.978c1.116-0.627,1.046-1.951,0.42-3.049c0,0-2.844-4.853-5.331-6.169
                    c-1.058-0.56-2.357-0.364-3.203,0.482l-1.758,1.758c-5.577,5.577-2.831,11.873,2.746,17.45l5.097,5.097l5.097,5.097
                    c5.577,5.577,11.873,8.323,17.45,2.746l1.758-1.758C48.048,40.341,48.243,39.042,47.683,37.985z"
                    />
                  </g>
                </svg>
                <svg
                  x="0px"
                  y="0px"
                  viewBox="0 0 112.197 112.197"
                  style={{ width: "1.875rem", height: "1.875rem" }}
                  className="m-2 hover:cursor-pointer"
                >
                  <g>
                    <circle fill="#1DA1F2" cx="56.099" cy="56.098" r="56.098" />
                    <g>
                      <path
                        fill="#F1F2F2"
                        d="M90.461,40.316c-2.404,1.066-4.99,1.787-7.702,2.109c2.769-1.659,4.894-4.284,5.897-7.417
                        c-2.591,1.537-5.462,2.652-8.515,3.253c-2.446-2.605-5.931-4.233-9.79-4.233c-7.404,0-13.409,6.005-13.409,13.409
                        c0,1.051,0.119,2.074,0.349,3.056c-11.144-0.559-21.025-5.897-27.639-14.012c-1.154,1.98-1.816,4.285-1.816,6.742
                        c0,4.651,2.369,8.757,5.965,11.161c-2.197-0.069-4.266-0.672-6.073-1.679c-0.001,0.057-0.001,0.114-0.001,0.17
                        c0,6.497,4.624,11.916,10.757,13.147c-1.124,0.308-2.311,0.471-3.532,0.471c-0.866,0-1.705-0.083-2.523-0.239
                        c1.706,5.326,6.657,9.203,12.526,9.312c-4.59,3.597-10.371,5.74-16.655,5.74c-1.08,0-2.15-0.063-3.197-0.188
                        c5.931,3.806,12.981,6.025,20.553,6.025c24.664,0,38.152-20.432,38.152-38.153c0-0.581-0.013-1.16-0.039-1.734
                        C86.391,45.366,88.664,43.005,90.461,40.316L90.461,40.316z"
                      />
                    </g>
                  </g>
                </svg>
                <svg
                  viewBox="0 0 1024 1024"
                  style={{ width: "1.875rem", height: "1.875rem" }}
                  className="m-2 hover:cursor-pointer"
                >
                  <circle cx="512" cy="512" r="512" fill="#5865f2" />
                  <path
                    fill="#ffffff"
                    d="M689.43 349a422.21 422.21 0 0 0-104.22-32.32 1.58 1.58 0 0 0-1.68.79 294.11 294.11 0 0 0-13 26.66 389.78 389.78 0 0 0-117.05 0 269.75 269.75 0 0 0-13.18-26.66 1.64 1.64 0 0 0-1.68-.79A421 421 0 0 0 334.44 349a1.49 1.49 0 0 0-.69.59c-66.37 99.17-84.55 195.9-75.63 291.41a1.76 1.76 0 0 0 .67 1.2 424.58 424.58 0 0 0 127.85 64.63 1.66 1.66 0 0 0 1.8-.59 303.45 303.45 0 0 0 26.15-42.54 1.62 1.62 0 0 0-.89-2.25 279.6 279.6 0 0 1-39.94-19 1.64 1.64 0 0 1-.16-2.72c2.68-2 5.37-4.1 7.93-6.22a1.58 1.58 0 0 1 1.65-.22c83.79 38.26 174.51 38.26 257.31 0a1.58 1.58 0 0 1 1.68.2c2.56 2.11 5.25 4.23 8 6.24a1.64 1.64 0 0 1-.14 2.72 262.37 262.37 0 0 1-40 19 1.63 1.63 0 0 0-.87 2.28 340.72 340.72 0 0 0 26.13 42.52 1.62 1.62 0 0 0 1.8.61 423.17 423.17 0 0 0 128-64.63 1.64 1.64 0 0 0 .67-1.18c10.68-110.44-17.88-206.38-75.7-291.42a1.3 1.3 0 0 0-.63-.63zM427.09 582.85c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.02 28.44-20.37 51.6-46 51.6zm170.13 0c-25.23 0-46-23.16-46-51.6s20.38-51.6 46-51.6c25.83 0 46.42 23.36 46 51.6.01 28.44-20.17 51.6-46 51.6z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-end items-start">
              <hr className="mt-[-2px] w-[200px] h-[2px] bg-primary-color" />
            </div>
            <section className="mt-10 text-lg">
              <MarkdownViewer
                //eslint-disable-next-line react/no-children-prop
                children={postData.content}
              />
            </section>
            <div className="flex items-center flex-wrap mt-10">
              {postData.tags &&
                postData.tags.map((tag) => (
                  <div key={tag} className="my-2 mr-4 rounded-md p-2">
                    <span className="text-lg text-primary-color font-extrabold">
                      {`#${tag}`}
                    </span>
                  </div>
                ))}
            </div>
          </article>
        </section>
      )}
    </AuthorizedPage>
  );
};

export default PostPage;
