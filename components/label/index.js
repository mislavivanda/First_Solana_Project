const Label = ({ forName, children, classes }) => {
  return (
    <>
      <label
        className={`block text-gray-700 text-sm font-bold mb-2 ${classes}`}
        htmlFor={forName}
      >
        {children}
      </label>
    </>
  );
};

export default Label;
