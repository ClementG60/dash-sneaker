import React from "react";
import { FieldError, FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import { ISneaker } from "../../interface/Interface";

type InputGroup = {
  label: string;
  type: string;
  id: string;
  value?: ISneaker;
  error?: FieldError
};

const InputGroup = ({ label, type, id, value, error }: InputGroup) => {
  const { register } = useFormContext();
  return (
    <div className="w-full">
        <div className="flex items-center ">
          <label
            htmlFor={id}
            className="text-indigo-500 font-medium pr-4 w-1/3"
          >
            {label}
          </label>
          <input
            type={type}
            id={id}
            className="bg-gray-200 text-gray-700 appearance-none rounded border-2 border-gray-200 w-2/3 h-full py-2 px-4 leading-tight focus:border-indigo-500 focus:outline-none focus:bg-white"
            {...register(id)}
          />
        </div>
        {error ? <p>{error.message}</p> : null}
      </div>
  );
};

export default InputGroup;
