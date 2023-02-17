import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { addBrand, setBrands } from "../../feature/brandsSlice";

const FormBrand = () => {
  const inputBrand = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleBrand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: inputBrand.current?.value,
    };

    axios
      .post(`${process.env.REACT_APP_URL_API}api/brand/add`, data)
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

    if (inputBrand.current) {
      inputBrand.current.value = "";
    }
  };

  return (
    <div className="mt-5 w-11/12 mx-auto border-t-2 text-center">
      <form
        action=""
        onSubmit={(e) => handleBrand(e)}
        className="grid grid-cols-1 w-3/6 mx-auto mt-3"
      >
        <input
          type="text"
          name="website"
          id="website"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          ref={inputBrand}
          placeholder="Marque à ajouter"
        />
        <input
          type="submit"
          value="Ajouter"
          className="cursor-pointer col-span-3 mt-3 rounded-md bg-indigo-500 text-white w-1/6 mx-auto py-3 text-md hover:bg-indigo-400"
        />
      </form>
    </div>
  );
};

export default FormBrand;
