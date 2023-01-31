import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../../app/hooks";
import { addTracking, setTrackings } from "../../feature/trackingsSlice";
import { ITracking } from "../../interface/Interface";
import InputGroup from "./InputGroup";

const FormTracking = () => {
  const transporters: Array<string> = ["UPS", "Chronopost/Collisimo", "DHL"];
  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    trackingNumber: yup
      .string()
      .required("Merci de remplir le numéro de suivi."),
    transporter: yup.string().required("Merci de choisir un transporteur."),
  });

  const methods = useForm<ITracking>({
    resolver: yupResolver(validationSchema),
  });

  const handleTracking = (data: ITracking) => {
    axios
      .post(`${process.env.REACT_APP_URL_API}api/trackings/add`, data)
      .then(() => {
        dispatch(addTracking(data));
        axios({
          method: "get",
          url: `${process.env.REACT_APP_URL_API}trackings/get`,
        }).then((res) => dispatch(setTrackings(res.data)));
      })
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form
          action=""
          className="grid grid-cols-2 gap-6 text-center"
          onSubmit={handleSubmit(handleTracking)}
        >
          <div className="w-8/12 m-auto">
            <div className="flex items-center">
              <label
                htmlFor="transporter"
                className="text-indigo-500 font-medium pr-4 w-1/3"
              >
                Transporteur
              </label>
              <select
                id="transporter"
                className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
                defaultValue=""
                {...register("transporter")}
              >
                <option disabled value=""></option>
                {transporters.map((transporter, index) => {
                  return (
                    <option key={index} value={transporter}>
                      {transporter}
                    </option>
                  );
                })}
              </select>
            </div>
            {errors.transporter && (
              <p className="text-red-700 text-xs mt-2 text-left">
                {errors.transporter.message}
              </p>
            )}
          </div>
          <InputGroup
            label="Numéro de suivi"
            nameId="trackingNumber"
            type="text"
            value=""
            error={errors.trackingNumber}
          />
          <input
            type="submit"
            value="Ajouter"
            className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
          />
        </form>
      </FormProvider>
    </>
  );
};

export default FormTracking;
