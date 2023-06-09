import { IAddSite, IHandleWebsite, ISite } from "../../../domain/entities/Interface";
import { createRef, useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  addWebsite,
  setWebsites,
} from "../../../domain/usecases/websitesSlice";
import {
  addResellWebsite,
  setResellWebsites,
} from "../../../domain/usecases/resellWebsitesSlice";
import { toast } from "react-toastify";
import {
  addWebsiteAPI,
  getWebsitesAPI,
} from "../../../infrastructure/WebsiteAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import InputGroup from "./InputGroup";

const FormWebsite = ({ type }: IAddSite) => {
  const submitButton = createRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Merci de remplir la marque."),
  });

  const methods = useForm<IHandleWebsite>({
    resolver: yupResolver(validationSchema),
  });
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    isSubmitSuccessful && reset({ name: "" });
  }, [isSubmitSuccessful, reset]);

  const handleWebsite = (data: IHandleWebsite) => {
    data.type = type;
    data.img = "./assets/img/test"

    addWebsiteAPI(data)
      .then((res) => {
        if (type === "website") {
          dispatch(addWebsite(data));
          getWebsitesAPI("websites").then((res) =>
            dispatch(setWebsites(res.data))
          );
        } else {
          dispatch(addResellWebsite(data));
          getWebsitesAPI("resell-websites").then((res) =>
            dispatch(setResellWebsites(res.data))
          );
        }
      })
      .catch((err) =>
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
  };

  return (
    <div className="mt-5 w-11/12 mx-auto border-t-2 text-center">
      <FormProvider {...methods}>
        <form
          action=""
          onSubmit={handleSubmit(handleWebsite)}
          className="grid grid-cols-1 w-3/6 mx-auto mt-3"
        >
          <InputGroup
            nameId="name"
            type="string"
            value=""
            error={errors.name}
          />
          <input
            type="submit"
            value="Ajouter"
            className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md"
            ref={submitButton}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default FormWebsite;
