import axios from "axios";
import moment from "moment";
import React, { useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addExpensive } from "../../feature/expensiveSlice";

const FormExpensive = () => {
  const inputName = useRef<HTMLInputElement | null>(null);
  const selectType = useRef<HTMLSelectElement | null>(null);
  const inputPrice = useRef<HTMLInputElement | null>(null);
  const inputDate = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const types: Array<string> = [
    "Achat bot/extension",
    "Renew bot/extension",
    "Proxy",
    "CookGroup",
  ];

  const handleExpensive = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: inputName.current?.value,
      type: selectType.current?.value,
      price: inputPrice.current?.value,
      date: inputDate.current?.value,
    };

    axios
      .post(`${process.env.REACT_APP_URL_API}expensive/add`, data)
      .then((res) => {
        dispatch(addExpensive(data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <form action="" onSubmit={(e) => handleExpensive(e)}>
      <div className="flex items-center w-2/3 mx-auto mb-4">
        <label
          htmlFor="name"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Dépense
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          ref={inputName}
        />
      </div>
      <div className="flex items-center w-2/3 mx-auto mb-4">
        <label
          htmlFor="name"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Type
        </label>
        <select
          name="name"
          id="name"
          className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue=""
          ref={selectType}
        >
          <option disabled value=""></option>
          {types.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex items-center w-2/3 mx-auto mb-4">
        <label
          htmlFor="name"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Prix
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          ref={inputPrice}
        />
      </div>
      <div className="flex items-center w-2/3 mx-auto mb-4">
        <label
          htmlFor="buyingDate"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Date d'achat
        </label>
        <input
          type="date"
          name="buyingDate"
          id="buyingDate"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue={moment().format("YYYY-MM-DD")}
          ref={inputDate}
        />
      </div>
      <div className="flex mx-auto">
      <input
        type="submit"
        value="Ajouter"
        className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400 text-center"
      />

      </div>
    </form>
  );
};

export default FormExpensive;
