// components/LocationSelect.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextError from "../common/TextError";

interface Location {
  id: string;
  full_name: string;
}
type Props = {
  onChangeProvince: (value: string) => void;
  onChangeDistrict: (value: string) => void;
  onChangeWard: (value: string) => void;
  provinceError?: string;
  districtError?: string;
  wardError?: string;
};
const LocationSelect: React.FC<Props> = ({
  onChangeProvince,
  onChangeDistrict,
  onChangeWard,
  provinceError,
  districtError,
  wardError,
}) => {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data);
            setWards([]); // Reset wards when province changes
          }
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
        .then((response) => {
          if (response.data.error === 0) {
            setWards(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
        });
    }
  }, [selectedDistrict]);

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <label htmlFor="tinh" className="form-label">
          Chọn Tỉnh Thành <span className="text-danger fw-bold">*</span>
        </label>
        <select
          className="form-select"
          id="tinh"
          name="tinh"
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            provinces.map((item) => {
              if (item.id === e.target.value) {
                onChangeProvince(item.full_name);
              }
            });
          }}
        >
          <option value="">Tỉnh Thành</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.full_name}
            </option>
          ))}
        </select>
        <TextError children={provinceError} />
      </div>
      <div className="row mb-3">
        <label htmlFor="quan" className="form-label">
          Chọn Quận Huyện <span className="text-danger fw-bold">*</span>
        </label>
        <select
          className="form-select"
          id="quan"
          name="quan"
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            districts.map((item) => {
              if (item.id === e.target.value) {
                onChangeDistrict(item.full_name);
              }
            });
          }}
          disabled={!selectedProvince}
        >
          <option value="">Quận Huyện</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.full_name}
            </option>
          ))}
        </select>
        <TextError children={districtError} />
      </div>
      <div className="row mb-3">
        <label htmlFor="phuong" className="form-label">
          Chọn Phường Xã <span className="text-danger fw-bold">*</span>
        </label>
        <select
          className="form-select"
          id="phuong"
          name="phuong"
          value={selectedWard}
          disabled={!selectedDistrict}
          onChange={(e) => {
            setSelectedWard(e.target.value);
            onChangeWard(e.target.value);
          }}
        >
          <option value="">Phường Xã</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.full_name}>
              {ward.full_name}
            </option>
          ))}
        </select>
        <TextError children={wardError} />
      </div>
    </div>
  );
};

export default LocationSelect;
