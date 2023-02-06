import { createRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ISiteMap } from "../interface/Interface";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { deleteWebsite } from "../feature/websitesSlice";
import { toast } from "react-toastify";
import { deleteResellWebsite } from "../feature/resellWebsitesSlice";

const Sites = ({ site, deleteProduct, type }: ISiteMap) => {
  const deleteSites = createRef<HTMLLIElement>();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}api/website/delete-website/${id}`,
    })
      .then((res) => {
        dispatch(
          type === "retailer" ? deleteWebsite(id) : deleteResellWebsite(id)
        );
        toast.success("Le site a bien été supprimé.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Une erreur est survenue. Veuillez recommencez.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useLayoutEffect(() => {
    const degreeRotation =
      Math.floor(Math.random() * (20 - 10) + 10) *
      (Math.random() > 0.5 ? 1 : -1);

    let timeline = gsap.timeline({ repeat: -1 });
    if (deleteProduct) {
      timeline.to(deleteSites.current, {
        rotation: degreeRotation,
        duration: 0.1,
      });
      timeline.to(deleteSites.current, {
        rotation: -degreeRotation,
        duration: 0.2,
      });
    } else {
      gsap.killTweensOf(deleteSites.current);
      gsap.to(deleteSites.current, {
        rotation: 0,
        duration: 0.1,
      });
    }
  }, [deleteProduct]);

  return (
    <li
      className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-400 font-bold text-slate-50 rounded-br-lg rounded-tl-lg transition ease-in-out hover:scale-110 duration-300 relative"
      ref={deleteSites}
    >
      {deleteProduct && (
        <span
          className="absolute -top-2 -left-2 bg-slate-300 rounded-full text-slate-600 p-0.5 opacity-90 cursor-pointer"
          onClick={() => handleDelete(site._id)}
        >
          <IoMdClose />
        </span>
      )}
      {site.name}
    </li>
  );
};

export default Sites;
