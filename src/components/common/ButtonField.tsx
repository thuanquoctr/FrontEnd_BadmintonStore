import React, { ReactNode } from "react";
import { SyncLoader } from "react-spinners";
type Props = {
  loading?: boolean;
  width?: string;
  height?: string;
  background?: string;
  color?: string;
  children?: ReactNode;
  onClick?: () => void;
};
const ButtonField: React.FC<Props> = ({
  loading,
  children,
  width,
  height,
  color = "white",
  background = "#DC143C",
  onClick,
}) => {
  return (
    <div>
      <button
        disabled={loading}
        className="btn"
        style={{ width, height, background, color }}
        onClick={onClick}
      >
        {!loading ? (
          children
        ) : (
          <SyncLoader color="#fffcfc" size={8} speedMultiplier={1} />
        )}
      </button>
    </div>
  );
};
export default ButtonField;
