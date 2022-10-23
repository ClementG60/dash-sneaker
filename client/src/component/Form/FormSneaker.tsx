import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "axios";
import { addSneaker, setSneakers } from "../../feature/sneakersSlice";
import moment from "moment";
import { IFormSneaker } from "../../interface/Interface";

const FormSneaker = ({ update }: IFormSneaker) => {
  const inputName = useRef<HTMLInputElement | null>(null);
  const selectSize = useRef<HTMLSelectElement | null>(null);
  const inputBuyingPrice = useRef<HTMLInputElement | null>(null);
  const inputBuyingDate = useRef<HTMLInputElement | null>(null);
  const selectWebsiteId = useRef<HTMLSelectElement | null>(null);
  const selectSold = useRef<HTMLSelectElement | null>(null);
  const inputSellingDate = useRef<HTMLInputElement | null>(null);
  const inputResellPrice = useRef<HTMLInputElement | null>(null);
  const selectResellWebsiteId = useRef<HTMLSelectElement | null>(null);
  const [sold, setSold] = useState<string>();
  const websites = useAppSelector((state) => state.websites.websites);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();

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

  const handleSneaker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: inputName.current?.value,
      size: selectSize.current?.value,
      buyingPrice: inputBuyingPrice.current?.value,
      buyingDate: inputBuyingDate.current?.value,
      websiteId: selectWebsiteId.current?.value,
      sold: selectSold.current?.value,
      sellingDate: inputSellingDate.current?.value,
      resellPrice: inputResellPrice.current?.value,
      resellWebsiteId: selectResellWebsiteId.current?.value,
    };

    axios
      .post(`${process.env.REACT_APP_URL_API}sneaker/add-sneaker`, data)
      .then((res) => {
        dispatch(addSneaker(data));
        axios({
          method: "get",
          url: `${process.env.REACT_APP_URL_API}sneaker/get-sneakers`,
        }).then((res) => dispatch(setSneakers(res.data)));
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      action=""
      className="grid grid-cols-3 gap-6 text-center"
      onSubmit={(e) => handleSneaker(e)}
    >
      <div className="flex items-center w-full">
        <label htmlFor="name" className="text-indigo-500 font-bold pr-4 w-1/3">
          Paire
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-200 text-gray-700 appearance-none rounded border-2 border-gray-200 w-2/3 h-full py-2 px-4 leading-tight focus:border-indigo-500 focus:outline-none focus:bg-white"
          ref={inputName}
        />
      </div>
      <div className="flex items-center w-full">
        <label htmlFor="size" className="text-indigo-500 font-bold pr-4 w-1/3">
          Taille
        </label>
        <select
          name="size"
          id="size"
          className="bg-gray-200 rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue=""
          ref={selectSize}
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
          className="text-indigo-500 font-bold pr-4 w-1/3"
        >
          Prix d'achat
        </label>
        <input
          type="text"
          name="buyingPrice"
          id="buyingPrice"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          ref={inputBuyingPrice}
        />
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="buyingDate"
          className="text-indigo-500 font-bold pr-4 w-1/3"
        >
          Date d'achat
        </label>
        <input
          type="date"
          name="buyingDate"
          id="buyingDate"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue={moment().format("YYYY-MM-DD")}
          ref={inputBuyingDate}
        />
      </div>
      <div className="flex items-center w-full">
        <label
          htmlFor="website"
          className="text-indigo-500 font-bold pr-4 w-1/3"
        >
          Site
        </label>
        <select
          name="website"
          id="website"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          defaultValue=""
          ref={selectWebsiteId}
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
        <label htmlFor="sold" className="text-indigo-500 font-bold pr-4 w-1/3">
          Vendu ?
        </label>
        <select
          name="sold"
          id="sold"
          className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
          onChange={(e) => setSold(e.target.value)}
          defaultValue=""
          ref={selectSold}
        >
          <option disabled value=""></option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>
      {sold === "true" && (
        <>
          <div className="flex items-center w-full">
            <label
              htmlFor="sellingPrice"
              className="text-indigo-500 font-bold pr-4 w-1/3"
            >
              Prix de vente
            </label>
            <input
              type="text"
              name="sellingPrice"
              id="sellingPrice"
              className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
              ref={inputResellPrice}
            />
          </div>
          <div className="flex items-center w-full">
            <label
              htmlFor="sellingDate"
              className="text-indigo-500 font-bold pr-4 w-1/3"
            >
              Date de vente
            </label>
            <input
              type="date"
              name="sellingDate"
              id="sellingDate"
              className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
              ref={inputSellingDate}
            />
          </div>
          <div className="flex items-center w-full">
            <label
              htmlFor="resellWebsite"
              className="w-1/3 text-indigo-500 font-bold pr-4"
            >
              Site
            </label>
            <select
              name="resellWebsite"
              id="resellWebsite"
              className="bg-gray-200 appearance-none rounded border-2 border-gray-200 w-full h-full py-2 px-4 focus:border-indigo-500 focus:outline-none focus:bg-white"
              ref={selectResellWebsiteId}
            >
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
      )}
      <input
        type="submit"
        value="Ajouter"
        className="cursor-pointer col-span-2 mt-3 rounded-md bg-gradient-to-r from-purple-300 to-purple-200 text-white w-1/6 mx-auto py-3 text-md hover:font-bold"
      />
    </form>
  );
};

export default FormSneaker;
