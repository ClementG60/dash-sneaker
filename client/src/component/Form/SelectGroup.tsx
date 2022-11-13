import React from "react";
import { FieldError, FieldErrorsImpl, FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import { ISneaker } from "../../interface/Interface";

type Data = {
  _id: string;
  name: string;
};

type SelectGroup = {
  label: string;
  id: string;
  value?: ISneaker;
  data: Array<Data>;
  error?: FieldError;
};

const SelectGroup = ({
  label,
  id,
  error,
  value,
  data,
}: SelectGroup) => {
  const { register } = useFormContext();
  return (
    <div className="w-full">
      <div className="flex items-center">
        <label htmlFor={id} className="text-indigo-500 font-medium pr-4 w-1/3">
          {label}
        </label>
        <select
          id={id}
          defaultValue=""
          className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          {...register(id)}
        >
          <option disabled value=""></option>
          {data &&
            data.map((value, index) => {
              return (
                <option key={index} value={value._id}>
                  {value.name}
                </option>
              );
            })}
        </select>
      </div>
      {error ? <p className="text-red-700 text-xs mt-2 text-left">{error.message}</p> : null}
    </div>
  );
};

export default SelectGroup;
