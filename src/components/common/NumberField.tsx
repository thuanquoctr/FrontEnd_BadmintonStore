import React from "react";
type Props = {
  placeholder: string;
  value?: number;
  width?: string;
  height?: string;
  onChange?: (value: number | undefined) => void;
};
const NumberField: React.FC<Props> = ({
  placeholder,
  width = "100%",
  height = "20px",
  value,
  onChange,
}) => {
  return (
    <input
      type="number"
      className="form-control bg-white border-left-0 border-md"
      placeholder={placeholder}
      value={value !== undefined ? value : ""}
      style={{ width, height }}
      onChange={(e) => {
        const parsedValue = parseFloat(e.target.value);
        onChange && onChange(isNaN(parsedValue) ? undefined : parsedValue);
      }}
    />
  );
};

export default NumberField;
