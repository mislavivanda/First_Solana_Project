export const H2 = (classes) => {
  const Component = (props) => (
    <h2
      className={`text-2xl mt-8 capitalize font-roboto-condensed font-thin text-hci-lila ${
        classes || ""
      }`}
      {...props}
    />
  );
  return Component;
};
