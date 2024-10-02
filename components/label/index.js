const Label = ({ forName, children, classes }) => {
  return (
    <>
      <label
        className={`inline-block text-gray-700 mb-1 font-semibold ${classes}`}
        htmlFor={forName}
      >
        {children}
      </label>
    </>
  );
};

export default Label;
