import axios from "axios";
import React, { useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addExpensive } from "../../feature/expensiveSlice";

const FormExpensive = () => {
  const inputName = useRef<HTMLInputElement | null>(null);
  const selectType = useRef<HTMLSelectElement | null>(null);
  const inputPrice = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const types: Array<string> = [
    "Achat bot/extension",
    "Renew bot/extension",
    "Achat proxy",
    "Renew proxy",
    "CookGroup",
  ];

  const handleExpensive = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: inputName.current?.value,
      type: selectType.current?.value,
      price: inputPrice.current?.value,
    };

    axios
      .post(`${process.env.REACT_APP_URL_API}expensive/add-expensive`, data)
      .then((res) => {
        dispatch(addExpensive(data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <form action="" onSubmit={(e) => handleExpensive(e)}>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-purple-300 py-2">
          Dépense
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
          ref={inputName}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-purple-300 py-2">
          Type
        </label>
        <select
          name="name"
          id="name"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
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
      <div className="flex flex-col">
        <label htmlFor="name" className="text-purple-300 py-2">
          Prix
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
          ref={inputPrice}
        />
      </div>
      <input
        type="submit"
        value="Ajouter"
        className="cursor-pointer col-span-2 mt-3 rounded-md bg-gradient-to-r from-purple-300 to-purple-200 text-white w-1/6 mx-auto py-3 text-md hover:font-bold"
      />
    </form>
  );
};

export default FormExpensive;
