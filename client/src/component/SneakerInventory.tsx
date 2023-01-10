import axios from "axios";
import { IBrand, ISite, ISneaker } from "../interface/Interface";
import { dateParser } from "./Utils";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteSneaker, setSneakers } from "../feature/sneakersSlice";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import { FaTrash } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import moment from "moment";
import DateSelector from "./DateSelector";

const SneakerInventory = () => {
  moment.locale("fr", {
    months:
      "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split(
        "_"
      ),
  });

  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const brands = useAppSelector((state) => state.brands.brands);
  const websites = useAppSelector((state) => state.websites.websites);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();

  const [openFormSneaker, setOpenFormSneaker] = useState<boolean>(false);
  const [date, setDate] = useState<moment.Moment>(moment());
  const [id, setId] = useState<string>();
  const [typeSelected, setTypeSelected] = useState<string>("buying");

  const ths: Array<string> = [
    "Marque",
    "Modèle",
    "Couleur",
    "Taille",
    "Site d'achat",
    "Prix d'achat",
    "Date d'achat",
    "Vendu ?",
    "Site de vente",
    "Prix de vente",
    "Date de vente",
    "",
  ];

  const handleDeleteSneaker = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}sneaker/delete/${id}`,
    })
      .then((res) => {
        dispatch(deleteSneaker(id));
        toast.success("La paire a bien été supprimé.", {
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
        console.log(err);
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

  const handleUpdate = (id: string) => {
    setOpenFormSneaker(!openFormSneaker);
    setId(id);
  };

  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}sneaker/get-by-month/${month}/${year}`,
    }).then((res) => dispatch(setSneakers(res.data)));
  }, [month, year]);

  return (
    <>
      <div className="w-full mb-3">
        <ul className="flex mx-auto w-4/12 justify-around text-indigo-900 font-medium">
          <li
            className={`w-1/2 cursor-pointer text-center border rounded-l-lg text-sm pt-1 pb-1 ${
              typeSelected === "buying" && "bg-indigo-500 text-white font-bold"
            } duration-300 ease-in-out`}
            onClick={() => setTypeSelected("buying")}
          >
            Achat
          </li>
          <li
            className={`w-1/2 cursor-pointer text-center border rounded-r-lg text-sm pt-1 pb-1 ${
              typeSelected === "sales" && "bg-indigo-500 text-white font-bold"
            } duration-300 ease-in-out`}
            onClick={() => setTypeSelected("sales")}
          >
            Vente
          </li>
        </ul>
      </div>
      <div className="mx-12 mb-5 flex justify-between">
        <button
          className="flex bg-indigo-500 text-white font-bold rounded my-auto hover:rotate-180 duration-300 cursor-pointer"
          onClick={() => {
            setOpenFormSneaker(!openFormSneaker);
            setId("none");
          }}
        >
          <AddIcon />
        </button>
        <DateSelector date={date} setDate={setDate} />
      </div>
      <div>
        <table className="border-collapse table-auto w-11/12 text-center mx-auto">
          <thead className="bg-slate-200 rounded-lg uppercase text-xs tracking-wide">
            <tr>
              {ths.map((th: string, index: number) => {
                return (
                  <th key={index} className="py-4 text-slate-400">
                    {th}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sneakers.map((sneaker: ISneaker, index: number) => {
              return (
                <tr
                  key={index}
                  className="border-b text-xs text-indigo-900 font-medium"
                >
                  <td className="py-4">
                    {brands?.map((brand: IBrand) => {
                      if (sneaker?.brandId === brand._id) return brand.name;
                    })}
                  </td>
                  <td className="py-4">{sneaker?.model}</td>
                  <td className="py-4">{sneaker?.colorway}</td>
                  <td>{sneaker?.size}</td>
                  <td>
                    {websites?.map((website: ISite) => {
                      if (sneaker?.websiteId === website._id)
                        return website.name;
                    })}
                  </td>
                  <td>{sneaker?.buyingPrice} €</td>
                  <td>{dateParser(sneaker?.buyingDate)}</td>
                  <td>{sneaker?.sold ? "Oui" : "Non"}</td>
                  <td>
                    {sneaker?.sold
                      ? resellWebsites?.map((resellWebsite: ISite) => {
                          if (sneaker.resellWebsiteId === resellWebsite._id)
                            return resellWebsite.name;
                        })
                      : ""}
                  </td>
                  <td>{sneaker?.sold ? sneaker?.resellPrice + " €" : ""}</td>
                  <td>
                    {sneaker?.sold ? dateParser(sneaker?.sellingDate) : ""}
                  </td>
                  <td className="flex justify-around py-4">
                    <div
                      className="cursor-pointer text-lg px-1"
                      onClick={() => sneaker._id && handleUpdate(sneaker._id)}
                    >
                      <BsFillPencilFill />
                    </div>
                    <div
                      className="cursor-pointer text-lg px-1"
                      onClick={() =>
                        sneaker._id && handleDeleteSneaker(sneaker._id)
                      }
                    >
                      <FaTrash />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ToastContainer />
        {openFormSneaker && id && (
          <Modal setOpenModal={setOpenFormSneaker} type={"sneakers"} id={id} />
        )}
      </div>
    </>
  );
};

export default SneakerInventory;
