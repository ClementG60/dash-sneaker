import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import axios from "axios";
import {
  addSneaker,
  setSneakers,
  updateSneaker,
} from "../../../domain/usecases/sneakersSlice";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IForm, ISneaker } from "../../../domain/entities/Interface";
import InputGroup from "./InputGroup";
import SelectGroup from "./SelectGroup";
import moment from "moment";
import { isEmpty } from "../Utils";
import { toast } from "react-toastify";
import { addSneakerAPI, updateSneakerAPI } from "../../../infrastructure/SneakerAPI";

const FormSneaker = ({ id, setOpenModal, typeSelected }: IForm) => {
  const websites = useAppSelector((state) => state.websites.websites);
  const brands = useAppSelector((state) => state.brands.brands);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();
  const [sneaker, setSneaker] = useState<ISneaker>();
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  useEffect(() => {
    if (id !== "none") {
      axios
        .get(`${process.env.REACT_APP_URL_API}api/sneaker/get-by-id/${id}`)
        .then((res) => {
          setSneaker(res.data);
          setLoadingForm(true);
        });
    } else {
      setLoadingForm(true);
    }
  }, [id]);

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
    brandId: yup.string().required("Merci de remplir la marque."),
    model: yup.string().required("Merci de remplir le modèle."),
    colorway: yup.string().required("Merci de remplir la couleur."),
    size: yup.string().required("Merci de remplir la taille."),
    buyingPrice: yup
      .number()
      .typeError("Un nombre doit être spécifié.")
      .required("Merci de remplir le prix d'achat."),
    buyingDate: yup
      .date()
      .typeError("Une date doit être spécifié.")
      .required("Merci de remplir la date d'achat."),
    websiteId: yup.string().required("Merci de remplir le site d'achat."),
    sold: yup
      .boolean()
      .typeError("Veuillez choisir une valeur.")
      .required("Merci de remplir si la paire est vendu ou non."),
    sellingDate: yup
      .date()
      .when("sold", {
        is: true,
        then: yup
          .date()
          .typeError("Une date doit être spécifié.")
          .required("Merci de remplir la date de vente."),
        otherwise: yup
          .date()
          .transform((value) => (isEmpty(value) ? null : value))
          .nullable(),
      })
      .nullable(true),
    resellPrice: yup.number().when("sold", {
      is: true,
      then: yup
        .number()
        .typeError("Un nombre doit être spécifié.")
        .required("Merci de remplir le prix de vente."),
      otherwise: yup.number().transform((value) => (isNaN(value) ? 0 : value)),
    }),
    resellWebsiteId: yup.string().when("sold", {
      is: true,
      then: yup.string().required("Merci de remplir le site de vente."),
      otherwise: yup.string().nullable(),
    }),
  });

  const methods = useForm<ISneaker>({
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleSneaker = (data: ISneaker) => {
    data.buyingDate = moment(Date.parse(data.buyingDate)).format();
    data.sellingDate &&
      (data.sellingDate = moment(Date.parse(data.sellingDate)).format());
    id === "none"
      ? addSneakerAPI(data)
          .then((res) => {
            dispatch(addSneaker(data));
            axios({
              method: "get",
              url: `${
                process.env.REACT_APP_URL_API
              }api/sneaker/get-by-month/${typeSelected}/${moment(
                data.buyingDate
              ).format("MM")}/${moment(data.buyingDate).format("YYYY")}`,
            }).then((res) => dispatch(setSneakers(res.data)));
          })
          .catch((err) => console.log(err))
      : updateSneakerAPI(data, id)
          .then((res) => {
            dispatch(updateSneaker([id, res.data]));
            toast.success("La paire a bien été mise à jour.", {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setOpenModal(false);
            axios({
              method: "get",
              url: `${
                process.env.REACT_APP_URL_API
              }api/sneaker/get-by-month/${typeSelected}/${moment(
                typeSelected === "buying" ? data.buyingDate : data.sellingDate
              ).format("MM")}/${moment(
                typeSelected === "buying" ? data.buyingDate : data.sellingDate
              ).format("YYYY")}`,
            }).then((res) => {
              console.log(res.data);
              dispatch(setSneakers(res.data));
            });
          })
          .catch((err) => console.log(err));
  };

  return loadingForm || sneaker ? (
    <FormProvider {...methods}>
      <form
        action=""
        className="grid grid-cols-3 gap-6 text-center"
        onSubmit={handleSubmit(handleSneaker)}
      >
        <SelectGroup
          label="Marque"
          nameId="brandId"
          value={sneaker?.brandId ? sneaker?.brandId : ""}
          data={brands}
          error={errors.brandId}
        />
        <InputGroup
          label="Modèle"
          nameId="model"
          type="text"
          value={sneaker?.model}
          error={errors.model}
        />
        <InputGroup
          label="Coloris"
          nameId="colorway"
          type="text"
          value={sneaker?.colorway}
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
              defaultValue={sneaker?.size ? sneaker.size : ""}
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
          {errors.size && (
            <p className="text-red-700 text-xs mt-2 text-left">
              {errors.size.message}
            </p>
          )}
        </div>
        <InputGroup
          label="Prix d'achat"
          nameId="buyingPrice"
          type="number"
          value={sneaker?.buyingPrice}
          error={errors.buyingPrice}
        />
        <InputGroup
          label="Date d'achat"
          nameId="buyingDate"
          type="date"
          value={moment(sneaker?.buyingDate).format("YYYY-MM-DD")}
          error={errors.buyingDate}
        />
        <SelectGroup
          label="Site"
          nameId="websiteId"
          data={websites}
          value={sneaker?.websiteId ? sneaker.websiteId : ""}
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
              {...register("sold")}
              defaultValue={
                sneaker?.sold === true
                  ? "true"
                  : sneaker?.sold === false
                  ? "false"
                  : ""
              }
            >
              <option disabled value=""></option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>
          {errors.sold && (
            <p className="text-red-700 text-xs mt-2 text-left">
              {errors.sold.message}
            </p>
          )}
        </div>
        {
          <>
            <InputGroup
              label="Prix de vente"
              nameId="resellPrice"
              type="number"
              value={sneaker?.resellPrice ? sneaker.resellPrice : undefined}
              error={errors.resellPrice}
            />
            <InputGroup
              label="Date de vente"
              nameId="sellingDate"
              type="date"
              value={
                sneaker?.sellingDate
                  ? moment(sneaker?.sellingDate).format("YYYY-MM-DD")
                  : undefined
              }
              error={errors.sellingDate}
            />
            <SelectGroup
              label="Site de revente"
              nameId="resellWebsiteId"
              data={resellWebsites}
              value={
                sneaker?.resellWebsiteId && !isEmpty(sneaker?.resellWebsiteId)
                  ? sneaker.resellWebsiteId
                  : ""
              }
              error={errors.resellWebsiteId}
            />
          </>
        }
        <input
          type="submit"
          value={id === "none" ? "Ajouter" : "Mettre à jour"}
          className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
        />
      </form>
    </FormProvider>
  ) : (
    <div>
      <i className="fas fa-spinner fa-spin"></i>
    </div>
  );
};

export default FormSneaker;
