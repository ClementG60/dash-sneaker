import React from "react";
import { FieldError, FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import { ISneaker } from "../../interface/Interface";

type InputGroup = {
  label: string;
  type: string;
  nameId: string;
  value?: string | number;
  error?: FieldError
};

const InputGroup = ({ label, type, nameId, value, error }: InputGroup) => {
  const { register } = useFormContext();
  const { onChange, onBlur, name, ref } = register(nameId);
  
  return (
    <div className="w-full">
        <div className="flex items-center ">
          <label
            htmlFor={nameId}
            className="text-indigo-500 font-medium pr-4 w-1/3"
          >
            {label}
          </label>
          <input
            type={type}
            id={nameId}
            className={`bg-gray-200 text-gray-700 rounded border-2 border-gray-200 w-2/3 h-full py-2 px-4 leading-tight focus:border-indigo-500 focus:outline-none focus:bg-white`}
            onChange={onChange}
            name={name}
            ref={ref}
            defaultValue={value}
          />
        </div>
        {error ? <p className="text-red-700 text-xs mt-2 text-left">{error.message}</p> : null}
      </div>
  );
};

export default InputGroup;
