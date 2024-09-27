const Popup = ({ children, isOpen, closeModal }) => {
  if (isOpen) {
    return (
      <div
        className={`fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-20 z-50 animate-fade`}
      >
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 z-[60] bg-white animate-fade`}
        >
          <div className="mb-2 w-full flex items-center justify-end">
            <div
              onClick={() => closeModal(false)}
              className="hover:cursor-pointer"
            >
              <svg
                viewBox="0 0 512 512"
                style={{ width: "1.25rem", height: "1.25rem" }}
              >
                <path
                  fill="#642dfd"
                  d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M358.625,313.375  c12.5,12.492,12.5,32.758,0,45.25C352.383,364.875,344.188,368,336,368s-16.383-3.125-22.625-9.375L256,301.25l-57.375,57.375  C192.383,364.875,184.188,368,176,368s-16.383-3.125-22.625-9.375c-12.5-12.492-12.5-32.758,0-45.25L210.75,256l-57.375-57.375  c-12.5-12.492-12.5-32.758,0-45.25c12.484-12.5,32.766-12.5,45.25,0L256,210.75l57.375-57.375c12.484-12.5,32.766-12.5,45.25,0  c12.5,12.492,12.5,32.758,0,45.25L301.25,256L358.625,313.375z"
                />
              </svg>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  } else return null;
};

export default Popup;
