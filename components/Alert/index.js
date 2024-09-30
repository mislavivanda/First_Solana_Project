import React, { useState, useRef, useImperativeHandle, useEffect } from "react";
const Alert = React.forwardRef(({ style, delay }, ref) => {
  const [state, setState] = useState({
    visible: false,
    alertType: null,
    alertMessage: null,
  });
  const containerRef = useRef(null);

  const showAlert = (message, alertType) => {
    setState({
      visible: true,
      alertMessage: message,
      alertType,
    });
  };

  useEffect(() => {
    if (state.visible) {
      containerRef.current.animate(
        [
          {
            opacity: 0,
            offset: 0,
          },
          {
            opacity: 1,
            offset: 0.1,
          },
          {
            opacity: 1,
            offset: 0.9,
          },
          {
            opacity: 0,
            offset: 0.91,
          },
        ],
        delay
      );
      setTimeout(
        () => setState((prevState) => ({ ...prevState, visible: false })),
        delay
      );
    }
  }, [state.visible]);

  useImperativeHandle(ref, () => ({
    showAlert, // Expose the method
  }));

  if (!state.visible) return null;

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center p-2 fixed top-[20px] left-1/2 -translate-x-1/2 max-w-[300px] z-[9999] opacity-0 animation-f ${
        state.alertType === "error"
          ? "bg-[#FFE7E4] border-[1px] border-solid border-[#AA6867] text-[#AA6867]"
          : ""
      } ${
        state.alertType === "success"
          ? "bg-[#D7DFCC] border-[1px] border-solid border-[#376100] text-[#376100]"
          : ""
      } ${
        state.alertType === "warning"
          ? "bg-[#faf5c9] border-[1px] border-solid border-[#664a17] text-[#664a17]"
          : ""
      }`}
      style={
        style
          ? {
              ...style,
              animationDuration: delay + "ms",
              animationFillMode: "forwards",
              animationTimingFunction: "linear",
            }
          : {
              animationDuration: delay + "ms",
              animationFillMode: "forwards",
              animationTimingFunction: "linear",
            }
      }
    >
      <p className="flex-grow text-center m-0">{state.alertMessage}</p>
      <div
        className="ml-1 font-bold cursor-pointer"
        onClick={() =>
          setState((prevState) => ({ ...prevState, visible: false }))
        }
      >
        x
      </div>
    </div>
  );
});

Alert.displayName = "AlertComponent";

export default Alert;
