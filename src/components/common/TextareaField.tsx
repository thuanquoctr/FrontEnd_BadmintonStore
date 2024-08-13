import React, { ReactNode } from "react";
type Props = {
  width?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};
const TextareaField: React.FC<Props> = ({
  width = "100%",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <textarea
        style={{ width }}
        className="form-control bg-white border-left-0 border-md"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};
export default TextareaField;
