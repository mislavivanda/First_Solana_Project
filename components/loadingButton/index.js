import Button from "../button";
const LoadingButton = ({
  onButtonClick,
  buttonLoading,
  buttonText,
  buttonClasses,
}) => {
  return (
    <>
      {buttonLoading && (
        <div className="fixed w-screen h-screen top-0 left-0 z-[99999] bg-black opacity-[0.2]"></div>
      )}
      {/* //*ZASAD HARDCODED ZA TEXT-XL VELICINU */}
      <Button
        onClick={() => !buttonLoading && onButtonClick()}
        type="filled"
        classes={`relative ${buttonClasses || ""}`}
      >
        <div className={`${buttonLoading ? "invisible" : ""}`}>
          {buttonText}
        </div>
        {buttonLoading ? (
          <div className="text-xl w-[1.25rem] h-[1.25rem] border-white border-solid border-[0.25em] border-r-transparent rounded-[50%] absolute left-[calc(50%-0.625rem)] top-[0.5rem] inline-block align-text-bottom animate-spin" />
        ) : null}
      </Button>
    </>
  );
};

export default LoadingButton;
