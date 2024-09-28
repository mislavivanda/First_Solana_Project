export const P = (classes) => {
  const Component = (props) => (
    <p className={`mt-4 leading-7 ${classes || ""}`} {...props} />
  );
  return Component;
};
