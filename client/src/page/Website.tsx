import { useState } from "react";
import FormBrand from "../component/Form/FormBrand";
import AddWebsite from "../component/Form/FormWebsite";
import GetBrands from "../component/GetBrands";
import GetSites from "../component/GetSites";

const Websites = () => {
  const [typeSelected, setTypeSelected] = useState<string>("retailers");
  return (
    <>
      <div className="w-full mb-3">
        <ul className="flex mx-auto w-6/12 justify-around text-indigo-900 font-medium">
          <li
            className={`w-1/2 cursor-pointer text-center border rounded-l-lg text-sm pt-1 pb-1 ${
              typeSelected === "retailers" &&
              "bg-indigo-500 border-indigo-500 text-white font-bold"
            } duration-300 ease-in-out`}
            onClick={() => setTypeSelected("retailers")}
          >
            Sites d'achat
          </li>
          <li
            className={`w-1/2 cursor-pointer text-center border text-sm pt-1 pb-1 ${
              typeSelected === "resellWebsites" &&
              "bg-indigo-500 border-indigo-500 text-white font-bold"
            } duration-300 ease-in-out`}
            onClick={() => setTypeSelected("resellWebsites")}
          >
            Sites de vente
          </li>
          <li
            className={`w-1/2 cursor-pointer text-center border rounded-r-lg text-sm pt-1 pb-1 ${
              typeSelected === "brands" &&
              "bg-indigo-500 border-indigo-500 text-white font-bold"
            } duration-300 ease-in-out`}
            onClick={() => setTypeSelected("brands")}
          >
            Marques
          </li>
        </ul>
      </div>
      {typeSelected === "retailers" && (
        <>
          <GetSites type={"retailer"} />
          <AddWebsite type={"website"} />
        </>
      )}
      {typeSelected === "resellWebsites" && (
        <>
          <GetSites type={"reseller"} />
          <AddWebsite type={"resell-website"} />
        </>
      )}
      {typeSelected === "brands" && (
        <>
          <GetBrands />
          <FormBrand />
        </>
      )}
    </>
  );
};

export default Websites;
