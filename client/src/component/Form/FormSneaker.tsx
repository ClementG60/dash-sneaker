import { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "axios";
import { addSneaker, setSneakers } from "../../feature/sneakersSlice";
import moment from "moment";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IForm, ISneaker } from "../../interface/Interface";
import InputGroup from "./InputGroup";

const FormSneaker = ({ id }: IForm) => {
  const websites = useAppSelector((state) => state.websites.websites);
  const brands = useAppSelector((state) => state.brands.brands);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== "none") {
      axios.get(`${process.env.REACT_APP_URL_API}sneaker/get-by-id/${id}`)
      .then()
    }
  }, []);

  const sizes: Array<string> = [
    "33 EU",
    "34 EU",
    "35 EU",
    "36 EU",
    "36.5 EU",
    "37 EU",
    "37.5 EU",
    "38 EU",
    "38.5 EU",
    "39 EU",
    "39.5 EU",
    "40 EU",
    "40.5 EU",
    "41 EU",
    "41.5 EU",
    "42 EU",
    "42.5 EU",
    "43 EU",
    "44 EU",
    "44.5 EU",
    "45 EU",
    "45.5 EU",
    "46 EU",
    "47 EU",
    "48 EU",
    "49 EU",
    "50 EU",
    "51 EU",
  ];

  const validationSchema = yup.object({
    brand: yup.string().required("Merci de remplir la marque."),
    model: yup.string().required("Merci de remplir le modèle."),
    colorway: yup.string().required("Merci de remplir la couleur."),
    size: yup.string().required("Merci de remplir la taille."),
    buyingPrice: yup.number().required("Merci de remplir le prix d'achat."),
    buyingDate: yup.date().required("Merci de remplir la date d'achat."),
    websiteId: yup.string().required("Merci de remplir le site d'achat."),
    sold: yup
      .boolean()
      .required("Merci de remplir si la paire est vendu ou non."),
    sellingDate: yup.date().when("sold", {
      is: "true",
      then: yup.date().required("Merci de remplir la date de vente."),
    }),
    resellPrice: yup.number().when("sold", {
      is: "true",
      then: yup.number().required("Merci de remplir le prix de vente."),
    }),
    resellWebsiteId: yup.string().when("sold", {
      is: "true",
      then: yup.string().required("Merci de remplir le site de vente."),
    }),
  });

  const handleSneaker = (data: ISneaker) => {
    axios
      .post(`${process.env.REACT_APP_URL_API}sneaker/add`, data)
      .then((res) => {
        dispatch(addSneaker(data));
        axios({
          method: "get",
          url: `${process.env.REACT_APP_URL_API}sneaker/get`,
        }).then((res) => dispatch(setSneakers(res.data)));
      })
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISneaker>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      action=""
      className="grid grid-cols-3 gap-6 text-center"
      onSubmit={handleSubmit(handleSneaker)}
    >
      <div className="flex items-center w-full">
        <label
          htmlFor="brand"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Marque
        </label>
        <select
          id="brand"
          className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue=""
          {...register("brandId")}
        >
          <option disabled value=""></option>
          {brands &&
            brands.map((brand, index) => {
              return (
                <option key={index} value={brand._id}>
                  {brand.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="name"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Modèle
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-200 text-gray-700 appearance-none rounded border-2 border-gray-200 w-2/3 h-full py-2 px-4 leading-tight focus:border-indigo-500 focus:outline-none focus:bg-white"
          {...register("model")}
        />
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="size"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Taille
        </label>
        <select
          id="size"
          className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue=""
          {...register("size")}
        >
          <option disabled value=""></option>
          {sizes.map((size, index) => {
            return (
              <option key={index} value={size}>
                {size}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="buyingPrice"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Prix d'achat
        </label>
        <input
          type="text"
          id="buyingPrice"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          {...register("buyingPrice")}
        />
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="buyingDate"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Date d'achat
        </label>
        <input
          type="date"
          id="buyingDate"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue={moment().format("YYYY-MM-DD")}
          {...register("buyingDate")}
        />
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="website"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Site
        </label>
        <select
          id="website"
          className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue=""
          {...register("websiteId")}
        >
          <option disabled value=""></option>
          {websites &&
            websites.map((website, index) => {
              return (
                <option key={index} value={website._id}>
                  {website.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="sold"
          className="text-indigo-500 font-medium pr-4 w-1/3"
        >
          Vendu ?
        </label>
        <select
          id="sold"
          className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue=""
          {...register("sold")}
        >
          <option disabled value=""></option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
      {
        <>
          <div className="flex items-center w-full">
            <label
              htmlFor="sellingPrice"
              className="text-indigo-500 font-medium pr-4 w-1/3"
            >
              Prix de vente
            </label>
            <input
              type="text"
              id="sellingPrice"
              className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
              {...register("resellPrice")}
            />
          </div>
          <div className="flex items-center w-full">
            <label
              htmlFor="sellingDate"
              className="text-indigo-500 font-medium pr-4 w-1/3"
            >
              Date de vente
            </label>
            <input
              type="date"
              id="sellingDate"
              className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
              {...register("sellingDate")}
            />
          </div>
          <div className="flex items-center w-full">
            <label
              htmlFor="resellWebsite"
              className="w-1/3 text-indigo-500 font-medium pr-4"
            >
              Site
            </label>
            <select
              id="resellWebsite"
              className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
              {...register("resellWebsiteId")}
              defaultValue=""
            >
              <option disabled value=""></option>
              {resellWebsites &&
                resellWebsites.map((website, index) => {
                  return (
                    <option key={index} value={website._id}>
                      {website.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </>
      }
      <input
        type="submit"
        value="Ajouter"
        className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
      />
    </form>
  );
};

export default FormSneaker;
