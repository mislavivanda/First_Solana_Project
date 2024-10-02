import { H1, H2, H3, H4, H5, H6 } from "./heading.js";
import { P } from "./text.js";
import { Ul, Li } from "./list.js";
import { Quote } from "./quote.js";
import { ResponsiveImage } from "./image.js";
import dynamic from "next/dynamic";
//*PREVENT HYDRATION ERROR
const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
});

const customComponents = {
  h1: H1(""),
  h2: H2(""),
  h3: H3(""),
  h4: H4(""),
  h5: H5(""),
  h6: H6(""),
  p: P(""),
  ul: Ul(""),
  li: Li(""),
  blockquote: Quote(""),
  img: ResponsiveImage,
};

const MarkdownViewer = ({ children }) => {
  return (
    <ReactMarkdown
      components={customComponents}
      //eslint-disable-next-line react/no-children-prop
      children={children}
    />
  );
};

export default MarkdownViewer;
