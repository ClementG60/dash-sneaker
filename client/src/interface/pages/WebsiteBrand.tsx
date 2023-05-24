import { createRef, useLayoutEffect, useState } from "react";
import FormBrand from "../componants/Form/FormBrand";
import FormWebsite from "../componants/Form/FormWebsite";
import GetBrands from "../componants/Brand/GetBrands";
import GetSites from "../componants/Site/GetSites";
import { FaTrash } from "react-icons/fa";
import { gsap } from "gsap";

const WebsiteBrand = () => {
  const [typeSelected, setTypeSelected] = useState<string>("website");
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
      });
    }
  }, [deleteProduct, deleteButton]);

  const menu = [
    { name: "Sites d'achat", type: "website" },
    { name: "Sites de vente", type: "resellWebsite" },
    { name: "Marques", type: "brand" },
  ];

  return (
    <>
      <div className="w-full mb-3">
        <ul className="flex mx-auto w-6/12 justify-around text-indigo-900 font-medium">
          {menu.map((item, index) => {
            return (
              <li key={index}
                className={`w-1/2 cursor-pointer text-center border ${
                  index === 0
                    ? "rounded-l-lg"
                    : index === menu.length - 1
                    ? "rounded-r-lg"
                    : null
                } text-sm pt-1 pb-1 ${
                  typeSelected === item.type &&
                  "bg-indigo-500 border-indigo-500 text-white font-bold"
                } duration-300 ease-in-out`}
                onClick={() => setTypeSelected(item.type)}
              >
                {item.name}
              </li>
            );
          })}
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
      {typeSelected === "website" && (
        <>
          <GetSites
            type={"website"}
            deleteProduct={deleteProduct}
            setDeleteProduct={setDeleteProduct}
          />
          <FormWebsite type={"website"} />
        </>
      )}
      {typeSelected === "resellWebsite" && (
        <>
          <GetSites
            type={"resellWebsite"}
            deleteProduct={deleteProduct}
            setDeleteProduct={setDeleteProduct}
          />
          <FormWebsite type={"resellWebsite"} />
        </>
      )}
      {typeSelected === "brand" && (
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

export default WebsiteBrand;
