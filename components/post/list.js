export const Ul = (classes) => {
  const Component = (props) => (
    <ul className={`my-4 ${classes || ""}`} {...props} />
  );
  return Component;
};

export const Li = (classes) => {
  const Component = (props) => (
    <li
      className={`list-disc list-inside text-hci-lila-light ${classes || ""}`}
    >
      <span className="text-gray-700" {...props} />
    </li>
  );
  return Component;
};
