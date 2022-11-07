import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "axios";
import { addSneaker, setSneakers } from "../../feature/sneakersSlice";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IForm, ISneaker } from "../../interface/Interface";
import InputGroup from "./InputGroup";
import SelectGroup from "./SelectGroup";

const FormSneaker = ({ id }: IForm) => {
  const websites = useAppSelector((state) => state.websites.websites);
  const brands = useAppSelector((state) => state.brands.brands);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();
  const [sneaker, setSneaker] = useState<ISneaker>();

  useEffect(() => {
    if (id !== "none") {
      axios
        .get(`${process.env.REACT_APP_URL_API}sneaker/get-by-id/${id}`)
        .then((res) => setSneaker(res.data));
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

  const validationSchema = yup.object().shape({
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
      is: true,
      then: yup.date().required("Merci de remplir la date de vente."),
    }),
    resellPrice: yup.number().when("sold", {
      is: true,
      then: yup.number().required("Merci de remplir le prix de vente."),
    }),
    resellWebsiteId: yup.string().when("sold", {
      is: true,
      then: yup.string().required("Merci de remplir le site de vente."),
    }),
  });

  const methods = useForm<ISneaker>({
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const handleSneaker = (data: ISneaker) => {
    {
      id === "none" &&
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
    }
  };

  console.log(errors);
  return (
    <FormProvider {...methods}>
      <form
        action=""
        className="grid grid-cols-3 gap-6 text-center"
        onSubmit={handleSubmit(handleSneaker)}
      >
        <SelectGroup
          label="Marque"
          id="brandId"
          data={brands}
          error={errors.brandId}
        />
        <InputGroup
          label="Modèle"
          id="model"
          type="text"
          error={errors.model}
        />
        <InputGroup
          label="Couleur"
          id="colorway"
          type="text"
          error={errors.colorway}
        />
        <div className="w-full">
          <div className="flex items-center">
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
          {errors.size ? <p>{errors.size.message}</p> : null}
        </div>
        <InputGroup
          label="Prix d'achat"
          id="buyingPrice"
          type="number"
          error={errors.buyingPrice}
        />
        <InputGroup
          label="Date d'achat"
          id="buyingDate"
          type="date"
          error={errors.buyingDate}
        />
        <SelectGroup
          label="Site"
          id="website"
          data={websites}
          error={errors.model}
        />
        <div className="w-full">
          <div className="flex items-center">
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
          {errors.sold ? <p>{errors.sold.message}</p> : null}
        </div>
        {
          <>
            <InputGroup
              label="Prix de vente"
              id="sellingPrice"
              type="number"
              error={errors.resellPrice}
            />
            <InputGroup
              label="Date de vente"
              id="sellingDate"
              type="date"
              error={errors.sellingDate}
            />
            <SelectGroup
              label="Site de revente"
              id="resellWebsiteId"
              data={resellWebsites}
              error={errors.resellWebsiteId}
            />
          </>
        }
        <input
          type="submit"
          value="Ajouter"
          className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
        />
      </form>
    </FormProvider>
  );
};

export default FormSneaker;
