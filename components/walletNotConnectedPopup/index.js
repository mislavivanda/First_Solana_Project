import React, { useState, useEffect } from "react";
import Popup from "../popup";

const WalletNotConnectedPopup = ({ isOpen, setIsOpen, customMessage }) => {
  const [screenWidthSize, setScreenWidthSize] = useState(false);

  useEffect(() => {
    setScreenWidthSize(window.innerWidth);
  }, []);

  return (
    <Popup isOpen={isOpen} closeModal={() => setIsOpen(false)}>
      <div className="min-w-[300px]">
        <h3 className="font-bold">Please Connect Your Wallet</h3>
        <div className="my-1 bg-primary-color w-full h-[2px]" />
        <p className="mt-1">
          To continue, you need to connect your Solana wallet.
        </p>
        {customMessage && <p className="mt-1">{customMessage}</p>}
        <p className="mt-1">
          {screenWidthSize < 640 ? (
            <span>
              Tap the <span className="font-bold">menu icon (☰)</span> to open
              the navigation and then select{" "}
              <span className="font-bold">Connect Wallet</span>
            </span>
          ) : (
            <span>
              You can find the <span className="font-bold">Connect Wallet</span>{" "}
              button in the navigation bar at the top.
            </span>
          )}
        </p>
      </div>
    </Popup>
  );
};

export default WalletNotConnectedPopup;
