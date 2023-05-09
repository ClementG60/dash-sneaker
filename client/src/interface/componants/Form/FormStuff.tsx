import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IForm, IStuff } from "../../../domain/entities/Interface";
import InputGroup from "./InputGroup";
import SelectGroup from "./SelectGroup";
import moment from "moment";
import { isEmpty } from "../Utils";
import { toast } from "react-toastify";
import axios from "axios";
import { addStuff, setStuffs, updateStuff } from "../../../domain/usecases/stuffsSlice";

const FormStuff = ({ id, setOpenModal, typeSelected }: IForm) => {
  const websites = useAppSelector((state) => state.websites.websites);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();
  const [stuff, setStuff] = useState<IStuff>();
  const [loadingForm, setLoadingForm] = useState<boolean>(true);

  useEffect(() => {
    if (id !== "none") {
      axios
        .get(`${process.env.REACT_APP_URL_API}api/stuff/get-by-id/${id}`)
        .then((res) => {
          setStuff(res.data);
          console.log(res.data);
          setLoadingForm(false);
        });
    } else {
      setLoadingForm(false);
    }
    console.log(loadingForm);
  }, [id]);

  const sizes: Array<string> = ["XS", "S", "M", "L", "XL"];
  const types: Array<string> = ["Billets", "Vetements"];

  const validationSchema = yup.object().shape({
    type: yup.string().required("Merci de remplir le type."),
    description: yup.string().required("Merci de remplir la description."),
    colorway: yup.string(),
    size: yup.string(),
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

  const methods = useForm<IStuff>({
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleStuff = (data: IStuff) => {
    data.buyingDate = moment(Date.parse(data.buyingDate)).format();
    data.sellingDate &&
      (data.sellingDate = moment(Date.parse(data.sellingDate)).format());
    id === "none" &&
      axios
        .post(`${process.env.REACT_APP_URL_API}api/stuff/add`, data)
        .then((res) => {
          dispatch(addStuff(data));
          axios({
            method: "get",
            url: `${process.env.REACT_APP_URL_API}stuff/get-by-month/${moment(
              data.buyingDate
            ).format("MM")}/${moment(data.buyingDate).format("YYYY")}`,
          }).then((res) => dispatch(setStuffs(res.data)));
        })
        .catch((err) => console.log(err));
    id !== "none" &&
      axios
        .patch(`${process.env.REACT_APP_URL_API}api/stuff/update/${id}`, data)
        .then((res) => {
          dispatch(updateStuff([id, res.data]));
          toast.success("L'objet a bien été mis à jour.", {
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
            }api/stuff/get-by-month/${typeSelected}/${moment(
              typeSelected === "buying" ? data.buyingDate : data.sellingDate
            ).format("MM")}/${moment(
              typeSelected === "buying" ? data.buyingDate : data.sellingDate
            ).format("YYYY")}`,
          }).then((res) => {
            dispatch(setStuffs(res.data));
          });
        })
        .catch((err) => console.log(err));
  };

  return (
    <FormProvider {...methods}>
      <form
        action=""
        className="grid grid-cols-3 gap-6 text-center"
        onSubmit={handleSubmit(handleStuff)}
      >
        <div className="w-full">
          <div className="flex items-center">
            <label
              htmlFor="type"
              className="text-indigo-500 font-medium pr-4 w-1/3"
            >
              Type
            </label>
            <select
              id="type"
              className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
              defaultValue={stuff?.type ? stuff.type : ""}
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
          label="Description"
          nameId="description"
          type="text"
          value={stuff?.description}
          error={errors.description}
        />
        <InputGroup
          label="Coloris"
          nameId="colorway"
          type="text"
          value={stuff?.colorway}
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
              defaultValue={stuff?.size ? stuff.size : ""}
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
          value={stuff?.buyingPrice}
          error={errors.buyingPrice}
        />
        <InputGroup
          label="Date d'achat"
          nameId="buyingDate"
          type="date"
          value={moment(stuff?.buyingDate).format("YYYY-MM-DD")}
          error={errors.buyingDate}
        />
        <SelectGroup
          label="Site"
          nameId="websiteId"
          data={websites}
          value={stuff?.websiteId ? stuff.websiteId : ""}
          error={errors.websiteId}
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
                stuff?.sold === true
                  ? "true"
                  : stuff?.sold === false
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
              value={stuff?.resellPrice ? stuff.resellPrice : undefined}
              error={errors.resellPrice}
            />
            <InputGroup
              label="Date de vente"
              nameId="sellingDate"
              type="date"
              value={
                stuff?.sellingDate
                  ? moment(stuff?.sellingDate).format("YYYY-MM-DD")
                  : undefined
              }
              error={errors.sellingDate}
            />
            <SelectGroup
              label="Site de revente"
              nameId="resellWebsiteId"
              data={resellWebsites}
              value={
                stuff?.resellWebsiteId && !isEmpty(stuff?.resellWebsiteId)
                  ? stuff.resellWebsiteId
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
  );
};

export default FormStuff;
