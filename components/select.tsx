import React from "react";

interface SelectProps {
  options: any; // TODO: update the type
  value: string;
  onChange: (selectedValue: string) => void;
  label: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label }) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <label className="text-gray-400 mb-1">{label}:</label>
      <select
        className=" bg-[#222533] border border-[#292B38] text-white text-sm rounded-lg  select p-3"
        value={value}
        onChange={handleOptionChange}
      >
        {options?.map((option: any) => (
          <option key={option.deviceId} value={option.deviceId}>
            {option.label.length > 20
              ? `${option.label.substring(0, 20)}...`
              : option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
