import React, { useState } from "react";
import { Address } from "../../models/Address.model";
type Props = {
  address: Address[];
  onAddressChange: (selectedAddressId: number) => void;
};
const ComboboxAddress: React.FC<Props> = ({ address, onAddressChange }) => {
  const [selectedOption, setSelectedOption] = useState("0");
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    onAddressChange(Number(e.target.value));
  };
  return (
    <div>
      <select
        style={{ height: "50px" }}
        className="form-select bg-white border-left-0 border-md"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="0">Chọn Địa Chỉ</option>
        {address.map((item) => (
          <option key={item.id} value={item.id}>
            {"Tên: " +
              item.name +
              ", SĐT: " +
              item.phone +
              ", Địa Chỉ: " +
              item.street +
              ", " +
              item.ward +
              ", " +
              item.district +
              ", " +
              item.city}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ComboboxAddress;
