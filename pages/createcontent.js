import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  AuthorizedPage,
  LoadingButton,
  MarkdownViewer,
  Alert,
  InputField,
  FormGroup,
} from "../components/index.js";
import TagsInput from "../modules/tagsInput/index.js";

const CreateContent = () => {
  const alertRef = useRef(null);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isPageRendered, setIsPageRendered] = useState(false);
  const [publishContentLoading, setPublishContentLoading] = useState(false);
  const [postTags, setPostTags] = useState([]);

  const handleChange = (event) => {
    setMarkdown(event.target.value); // Update the state with user input
  };

  const router = useRouter();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!isPageRendered) return;
    //*POTREBNO POSTAVLJANJE MAX-HEIGHT NA VISINU GRID RETKA(VISINA U POCETNOM TRENUTKU) KAKO BI SE ENFORCAO SCROLL(DA CONTAINER NE BUDE VISI OD VISINE RETKA)
    const markdownContainers = document.querySelectorAll(
      ".markdown-containers"
    );
    const containerHeight = markdownContainers[0].offsetHeight;
    for (let i = 0; i < markdownContainers.length; i++)
      markdownContainers[i].style.maxHeight = containerHeight + "px";
  }, [isPageRendered]);

  const handlePublishClick = async () => {
    if (!(title && markdown && postTags)) {
      alertRef.current.showAlert("Missing required parameters.", "error");
      return;
    }
    try {
      setPublishContentLoading(true);
      const response = await fetch("/api/createContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postContent: markdown,
          creatorId: sessionData.userData.userId,
          title: title,
          tags: postTags,
        }),
      });
      const { postSlug } = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create content");
      }
      router.push(`/posts/${postSlug}`);
    } catch (error) {
      console.log("Error", error);
      alertRef.current.showAlert("Publication failed", "error");
      setPublishContentLoading(false);
    }
  };

  return (
    <AuthorizedPage
      roleCheckMethod={(sessionData) => sessionData.userData.isCreator}
      //*render PREKO renderChildrenMethod KAKO BI ZNALI DA TREBA POZVATI METODU ZA IZRACUN VISINE MARKDOWN CONTAINERA
      renderChildrenMethod={(sessionData) => {
        setIsPageRendered(true);
        return (
          <section className="relative flex-grow flex flex-col h-full items-stretch">
            <FormGroup classes="max-w-[400px]">
              <InputField
                value={title}
                placeholder="My title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </FormGroup>
            <section className="mb-4 flex-grow h-full grid gap-4 grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
              {/*MARKDOWN INPUT */}
              <div className="markdown-containers rounded-md bg-white self-stretch">
                <textarea
                  value={markdown}
                  onChange={handleChange}
                  placeholder="Write your Markdown here..."
                  className="w-full h-full p-4 resize-none box-border rounded-md overflow-y-auto"
                />
              </div>
              {/*MARKDOWN PREVIEW */}
              <div className="markdown-containers p-4 rounded-md bg-white overflow-y-auto">
                <MarkdownViewer
                  //eslint-disable-next-line react/no-children-prop
                  children={markdown}
                />
              </div>
            </section>
            <div className="max-w-[400px]">
              <TagsInput noLabel tags={postTags} setTags={setPostTags} />
            </div>
            <div className="absolute bottom-[-5rem] h-20 w-full flex justify-center items-center">
              <LoadingButton
                onButtonClick={handlePublishClick}
                buttonLoading={publishContentLoading}
                buttonText="Publish"
                buttonClasses="text-xl"
              />
            </div>
            <Alert ref={alertRef} delay={3000} />
          </section>
        );
      }}
    ></AuthorizedPage>
  );
};

export default CreateContent;
