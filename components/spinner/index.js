const Spinner = ({ height, width, color, classes = "" }) => {
  return (
    <div
      style={{
        height: height,
        width: width,
        borderColor: color,
        borderRightColor: "transparent",
      }}
      className={`inline-block align-text-bottom border-solid border-[0.25rem] rounded-[50%] animate-spin ${classes}`}
    />
  );
};

export default Spinner;
