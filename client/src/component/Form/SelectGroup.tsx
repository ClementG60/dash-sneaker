import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ISneaker } from "../../interface/Interface";

type Data = {
  _id: number;
  name: string;
};

type SelectGroup = {
  label: string;
  id: string;
  value: ISneaker;
  data: Array<Data>;
  register: UseFormRegister<ISneaker>
};

const SelectGroup = ({
  label,
  id,
  value,
  data,
  register
}: SelectGroup) => {
  return (
    <div className="flex items-center w-full">
      <label htmlFor={id} className="text-indigo-500 font-medium pr-4 w-1/3">
        {label}
      </label>
      <select
        id={id}
        className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
        defaultValue=""
        
      >
        <option disabled value=""></option>
        {data &&
          data.map((brand, index) => {
            return (
              <option key={index} value={brand._id}>
                {brand.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectGroup;
