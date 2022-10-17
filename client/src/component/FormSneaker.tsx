import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "axios";
import { addSneaker, setSneakers } from "../feature/sneakersSlice";
import moment from "moment";
import { IFormSneaker } from "../interface/Interface";

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

  const addNewSneaker = (e: React.FormEvent<HTMLFormElement>) => {
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
      className="grid grid-cols-2 gap-2"
      onSubmit={(e) => addNewSneaker(e)}
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="text-purple-300 py-2">
          Paire
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
          ref={inputName}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="size" className="text-purple-300 py-2">
          Taille
        </label>
        <select
          name="size"
          id="size"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
          defaultValue=""
          ref={selectSize}
        >
          <option disabled value=""></option>
          {sizes.map((size, index) => {
            return <option key={index}>{size}</option>;
          })}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="buyingPrice" className="text-purple-300 py-2">
          Prix d'achat
        </label>
        <input
          type="text"
          name="buyingPrice"
          id="buyingPrice"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
          ref={inputBuyingPrice}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="buyingDate" className="text-purple-300 py-2">
          Date d'achat
        </label>
        <input
          type="date"
          name="buyingDate"
          id="buyingDate"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
          defaultValue={moment().format("YYYY-MM-DD")}
          ref={inputBuyingDate}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="website" className="text-purple-300 py-2">
          Site
        </label>
        <select
          name="website"
          id="website"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
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
      <div className="flex flex-col">
        <label htmlFor="sold" className="text-purple-300 py-2">
          Vendu ?
        </label>
        <select
          name="sold"
          id="sold"
          className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
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
          <div className="flex flex-col">
            <label htmlFor="sellingPrice" className="text-purple-300 py-2">
              Prix de vente
            </label>
            <input
              type="text"
              name="sellingPrice"
              id="sellingPrice"
              className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
              ref={inputResellPrice}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sellingDate" className="text-purple-300 py-2">
              Date de vente
            </label>
            <input
              type="date"
              name="sellingDate"
              id="sellingDate"
              className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
              ref={inputSellingDate}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="resellWebsite" className="text-purple-300 py-2">
              Site
            </label>
            <select
              name="resellWebsite"
              id="resellWebsite"
              className="py-2 px-2 border text-zinc-500 rounded-md focus:outline-none focus:border-purple-300 focus:border-2"
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
