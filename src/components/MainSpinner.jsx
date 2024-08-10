import React from "react";
import {
  RingLoader,
  PacmanLoader,
  HashLoader,
  PuffLoader,
  DotLoader,
} from "react-spinners";

const MainSpinner = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <DotLoader color="#28282A" size={80} />
    </div>
  );
};

export default MainSpinner;
