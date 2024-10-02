import { useEffect, useState } from "react";
import { Button, MarkdownViewer } from "../components/index.js";

const CreateContent = () => {
  const [markdown, setMarkdown] = useState("");

  const handleChange = (event) => {
    setMarkdown(event.target.value); // Update the state with user input
  };

  useEffect(() => {
    //*POTREBNO POSTAVLJANJE MAX-HEIGHT NA VISINU GRID RETKA(VISINA U POCETNOM TRENUTKU) KAKO BI SE ENFORCAO SCROLL(DA CONTAINER NE BUDE VISI OD VISINE RETKA)
    const markdownContainers = document.querySelectorAll(
      ".markdown-containers"
    );
    const containerHeight = markdownContainers[0].offsetHeight;
    for (let i = 0; i < markdownContainers.length; i++)
      markdownContainers[i].style.maxHeight = containerHeight + "px";
  }, []);

  return (
    <section className="relative flex-grow grid gap-4 h-full items-stretch grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
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
      <div className="absolute bottom-[-5rem] h-20 w-full flex justify-center items-center">
        <Button type="filled" classes="!text-xl">
          Publish
        </Button>
      </div>
    </section>
  );
};

export default CreateContent;
