export const H1 = (classes) => {
  const Component = (props) => (
    <h1
      className={`text-4xl mt-8 capitalize font-roboto-condensed font-thin text-hci-lila ${
        classes || ""
      }`}
      {...props}
    />
  );
  return Component;
};

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

export const H3 = (classes) => {
  const Component = (props) => (
    <h3
      className={`text-xl mt-6 capitalize font-roboto-condensed font-thin text-hci-lila ${
        classes || ""
      }`}
      {...props}
    />
  );
  return Component;
};

export const H4 = (classes) => {
  const Component = (props) => (
    <h4
      className={`text-lg mt-4 capitalize font-roboto-condensed font-thin text-hci-lila ${
        classes || ""
      }`}
      {...props}
    />
  );
  return Component;
};

export const H5 = (classes) => {
  const Component = (props) => (
    <h5
      className={`text-base mt-2 capitalize font-roboto-condensed font-thin text-hci-lila ${
        classes || ""
      }`}
      {...props}
    />
  );
  return Component;
};

export const H6 = (classes) => {
  const Component = (props) => (
    <h6
      className={`text-sm mt-1 capitalize font-roboto-condensed font-thin text-hci-lila ${
        classes || ""
      }`}
      {...props}
    />
  );
  return Component;
};
