const Avatar = ({
  firstLetter,
  textContent,
  reverse = false,
  containerClasses,
  circleClasses,
}) => {
  return (
    <div
      className={`flex items-center ${
        reverse ? "flex-row-reverse" : "flex-row"
      } ${containerClasses || ""}`}
    >
      {textContent && (
        <span className="my-2 py-1 px-3 text-primary-color">
          {" "}
          {textContent}
        </span>
      )}
      <div
        className={`relative rounded-[50%] bg-primary-color h-[40px] w-[40px] text-lg ${
          circleClasses || ""
        }`}
      >
        <span className="absolute text-white top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          {firstLetter}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
