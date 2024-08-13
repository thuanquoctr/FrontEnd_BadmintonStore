import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
const TextError: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="form-text text-danger">{children}</div>
    </div>
  );
};

export default TextError;
