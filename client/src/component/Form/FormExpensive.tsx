import axios from "axios";
import moment from "moment";
import React, { useRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addExpensive } from "../../feature/expensiveSlice";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IExpensive } from "../../interface/Interface";
import InputGroup from "./InputGroup";
import SelectGroup from "./SelectGroup";

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

  const validationSchema = yup.object().shape({
    name: yup.string().required("Merci de remplir la marque."),
    type: yup.string().required("Merci de remplir le modèle."),
    date: yup
      .date()
      .typeError("Une date doit être spécifié.")
      .required("Merci de remplir la date d'achat."),
    price: yup.number().required("Merci de remplir la couleur."),
  });

  const methods = useForm<IExpensive>({
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleExpensive = (data: IExpensive) => {
    axios
      .post(`${process.env.REACT_APP_URL_API}api/expensive/add`, data)
      .then((res) => {
        dispatch(addExpensive(data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <FormProvider {...methods}>
      <form
        action=""
        className="grid grid-cols-2 gap-4 text-center"
        onSubmit={handleSubmit(handleExpensive)}
      >
        <InputGroup
          label="Dépense"
          nameId="name"
          type="text"
          value=""
          error={errors.name}
        />
        <div className="w-full">
          <div className="flex items-center">
            <label
              htmlFor="name"
              className="text-indigo-500 font-medium pr-4 w-1/3"
            >
              Type
            </label>
            <select
              id="type"
              className="bg-gray-200 text-gray-700 rounded border-2 border-gray-200 w-2/3 h-full py-2 px-4 leading-tight focus:border-indigo-500 focus:outline-none focus:bg-white"
              defaultValue=""
              {...register("type")}
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
          {errors.type && (
            <p className="text-red-700 text-xs mt-2 text-left">
              {errors.type.message}
            </p>
          )}
        </div>
        <InputGroup
          label="Prix"
          nameId="price"
          type="number"
          value=""
          error={errors.price}
        />
        <InputGroup
          label="Date d'achat"
          nameId="date"
          type="date"
          value=""
          error={errors.date}
        />
        <input
          type="submit"
          value="Ajouter"
          className="cursor-pointer col-span-2 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
        />
      </form>
    </FormProvider>
    // <form action="" onSubmit={(e) => handleExpensive(e)}>
    //   <div className="flex items-center w-2/3 mx-auto mb-4">
    //     <label
    //       htmlFor="name"
    //       className="text-indigo-500 font-medium pr-4 w-1/3"
    //     >
    //       Dépense
    //     </label>
    //     <input
    //       type="text"
    //       name="name"
    //       id="name"
    //       className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
    //       ref={inputName}
    //     />
    //   </div>
    //   <div className="flex items-center w-2/3 mx-auto mb-4">
    //     <label
    //       htmlFor="name"
    //       className="text-indigo-500 font-medium pr-4 w-1/3"
    //     >
    //       Type
    //     </label>
    //     <select
    //       name="name"
    //       id="name"
    //       className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
    //       defaultValue=""
    //       ref={selectType}
    //     >
    //       <option disabled value=""></option>
    //       {types.map((type, index) => {
    //         return (
    //           <option key={index} value={type}>
    //             {type}
    //           </option>
    //         );
    //       })}
    //     </select>
    //   </div>
    //   <div className="flex items-center w-2/3 mx-auto mb-4">
    //     <label
    //       htmlFor="name"
    //       className="text-indigo-500 font-medium pr-4 w-1/3"
    //     >
    //       Prix
    //     </label>
    //     <input
    //       type="text"
    //       name="name"
    //       id="name"
    //       className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
    //       ref={inputPrice}
    //     />
    //   </div>
    //   <div className="flex items-center w-2/3 mx-auto mb-4">
    //     <label
    //       htmlFor="buyingDate"
    //       className="text-indigo-500 font-medium pr-4 w-1/3"
    //     >
    //       Date d'achat
    //     </label>
    //     <input
    //       type="date"
    //       name="buyingDate"
    //       id="buyingDate"
    //       className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
    //       defaultValue={moment().format("YYYY-MM-DD")}
    //       ref={inputDate}
    //     />
    //   </div>
    //   <div className="flex mx-auto ">
    //     <input
    //       type="submit"
    //       value="Ajouter"
    //       className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400 text-center"
    //     />
    //   </div>
    // </form>
  );
};

export default FormExpensive;
