import React from "react";
import { HashLoader } from "react-spinners";

const SpinnerLoading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HashLoader color="#36d7b7" speedMultiplier={2} />
    </div>
  );
};
export default SpinnerLoading;
