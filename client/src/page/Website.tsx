import { createRef, useLayoutEffect, useState } from "react";
import FormBrand from "../component/Form/FormBrand";
import FormWebsite from "../component/Form/FormWebsite";
import GetBrands from "../component/Brand/GetBrands";
import GetSites from "../component/Site/GetSites";
import { FaTrash } from "react-icons/fa";
import { gsap } from "gsap";
import { duration } from "moment";

const Websites = () => {
  const [typeSelected, setTypeSelected] = useState<string>("retailers");
  const [deleteProduct, setDeleteProduct] = useState<boolean>(false);

  const deleteButton = createRef<HTMLButtonElement>();

  useLayoutEffect(() => {
    let timeline = gsap.timeline({ repeat: -1 });
    if (deleteProduct) {
      timeline.to(deleteButton.current, {
        rotation: 20,
        duration: 0.1,
      });
      timeline.to(deleteButton.current, {
        rotation: -20,
        duration: 0.2,
      });
    } else {
      gsap.killTweensOf(deleteButton.current);
      gsap.to(deleteButton.current, {
        rotation: 0,
        duration: 0.1,
      })
    }
  }, [deleteProduct]);

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
      <div className=" w-11/12 flex justify-end">
        <button
          className={`flex ${
            deleteProduct ? "bg-red-700" : "bg-indigo-500"
          } text-white rounded my-auto hover:scale-110 duration-300 cursor-pointer p-3`}
          onClick={() => setDeleteProduct(!deleteProduct)}
          ref={deleteButton}
        >
          <FaTrash />
        </button>
      </div>
      {typeSelected === "retailers" && (
        <>
          <GetSites
            type={"retailer"}
            deleteProduct={deleteProduct}
            setDeleteProduct={setDeleteProduct}
          />
          <FormWebsite type={"website"} />
        </>
      )}
      {typeSelected === "resellWebsites" && (
        <>
          <GetSites
            type={"reseller"}
            deleteProduct={deleteProduct}
            setDeleteProduct={setDeleteProduct}
          />
          <FormWebsite type={"resell-website"} />
        </>
      )}
      {typeSelected === "brands" && (
        <>
          <GetBrands
            deleteProduct={deleteProduct}
            setDeleteProduct={setDeleteProduct}
          />
          <FormBrand />
        </>
      )}
    </>
  );
};

export default Websites;
