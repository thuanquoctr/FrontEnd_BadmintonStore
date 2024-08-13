import React, { useState } from "react";
import Category from "../../models/Category.model";
type Props = {
  categorys: Category[];
  onCategoryChange: (selectedCategoryId: string) => void;
};
const ComboboxField: React.FC<Props> = ({ categorys, onCategoryChange }) => {
  const [selectedOption, setSelectedOption] = useState("0");
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    onCategoryChange(e.target.value);
  };
  return (
    <div>
      <select
        style={{ height: "50px" }}
        className="form-select bg-white border-left-0 border-md"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="0">Chọn Thể Loại</option>
        {categorys.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ComboboxField;
