import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hooks";
import { addBrand, setBrands } from "../../../domain/usecases/brandsSlice";
import { addBrandAPI } from "../../../infrastructure/BrandAPI";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IBrand } from "../../../domain/entities/Interface";
import InputGroup from "./InputGroup";
import { useEffect } from "react";

const FormBrand = () => {
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Merci de remplir la marque."),
  });

  const methods = useForm<IBrand>({
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

  const handleBrand = (data: IBrand) => {
    addBrandAPI(data)
      .then((res) => {
        dispatch(addBrand(data));
        axios({
          method: "get",
          url: `${process.env.REACT_APP_URL_API}api/brand/get`,
        }).then((res) => dispatch(setBrands(res.data)));
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
          onSubmit={handleSubmit(handleBrand)}
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
            className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default FormBrand;
