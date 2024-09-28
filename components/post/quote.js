export const Quote = (classes) => {
  const Component = (props) => (
    <blockquote
      className={`my-2 border-l-4 border-hci-lila-light pl-2 align-middle ${
        classes || ""
      }`}
      {...props}
    />
  );
  return Component;
};
