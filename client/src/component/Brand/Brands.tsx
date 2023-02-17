import axios from "axios";
import gsap from "gsap";
import { createRef, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { deleteBrand } from "../../feature/brandsSlice";
import { IBrandMap } from "../../interface/Interface";
import { IoMdClose } from "react-icons/io";

const Brands = ({ brand, deleteProduct }: IBrandMap) => {
  const deleteBrands = createRef<HTMLLIElement>();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}api/brand/delete/${id}`,
    })
      .then((res) => {
        dispatch(deleteBrand(id));
        toast.success("La marque a bien été supprimé.", {
          position: "bottom-right",
          autoClose: 2500,
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
          autoClose: 2500,
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
      timeline.to(deleteBrands.current, {
        rotation: degreeRotation,
        duration: 0.1,
      });
      timeline.to(deleteBrands.current, {
        rotation: -degreeRotation,
        duration: 0.2,
      });
    } else {
      gsap.killTweensOf(deleteBrands.current);
      gsap.to(deleteBrands.current, {
        rotation: 0,
        duration: 0.1,
      });
    }
  }, [deleteProduct, deleteBrands]);

  return (
    <li className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-400 font-bold text-slate-50 rounded-br-lg rounded-tl-lg transition ease-in-out hover:scale-110 duration-300" ref={deleteBrands}>
      {deleteProduct && (
        <span
          className="absolute -top-2 -left-2 bg-slate-300 rounded-full text-slate-600 p-0.5 opacity-90 cursor-pointer"
          onClick={() => handleDelete(brand._id)}
        >
          <IoMdClose />
        </span>
      )}
      {brand.name}
    </li>
  );
};

export default Brands;
