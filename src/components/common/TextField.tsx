import React from "react";
type Props = {
  placeholder?: string;
  type?: string;
  value?: string;
  width?: string;
  height?: string;
  onChange?: (value: string) => void;
};
const TextField: React.FC<Props> = React.memo(
  ({ type = "text", width, height, onChange, ...props }) => {
    return (
      <input
        type={type}
        className="form-control bg-white border-left-0 border-md"
        {...props}
        style={{ width, height }}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    );
  }
);

export default TextField;
