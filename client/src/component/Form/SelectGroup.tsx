import { FieldError, useFormContext } from "react-hook-form";

type Data = {
  _id?: string;
  name: string;
};

type ISelectGroup = {
  label: string;
  nameId: string;
  value: string | number;
  data: Array<Data>;
  error?: FieldError;
};

const SelectGroup = ({ label, nameId, error, value, data }: ISelectGroup) => {
  const { register } = useFormContext();
  const { onChange, name, ref } = register(nameId);
  
  return (
    <div className="w-full">
      <div className="flex items-center">
        <label
          htmlFor={nameId}
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          {label}
        </label>
          <select
            id={nameId}
            defaultValue={value}
            className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
            onChange={onChange}
            name={name}
            ref={ref}
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
      {error ? (
        <p className="text-red-700 text-xs mt-2 text-left">{error.message}</p>
      ) : null}
    </div>
  );
};

export default SelectGroup;
