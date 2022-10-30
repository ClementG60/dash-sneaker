import axios from "axios";
import { ISite, ISneaker } from "../interface/Interface";
import { dateParser } from "./Utils";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteSneaker, setSneakers } from "../feature/sneakersSlice";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";
import { FaTrash } from "react-icons/fa";
import moment from "moment";
import "moment/dist/locale/fr";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const SneakerInventory = () => {
  moment.locale("fr");
  const sneakers = useAppSelector((state) => state.sneakers.sneakers);
  const websites = useAppSelector((state) => state.websites.websites);
  const resellWebsites = useAppSelector(
    (state) => state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();

  const [openFormAddSneaker, setOpenFormAddSneaker] = useState<boolean>(false);
  const [updateSneaker, setUpdateSneaker] = useState<boolean>(false);
  const [date, setDate] = useState(moment());

  const ths: Array<string> = [
    "Paire",
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

  /*
    toast.success("La paire a bien été mise à jour.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });*/

  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}sneaker/get-sneakers-by-month/${month}/${year}`,
    }).then((res) => dispatch(setSneakers(res.data)));
  }, [month, year]);

  return (
    <>
      <div className="mx-12 mb-5 flex justify-between">
        <button
          className="flex bg-indigo-500 text-white font-bold rounded my-auto hover:rotate-180 duration-300 cursor-pointer"
          onClick={() => setOpenFormAddSneaker(!openFormAddSneaker)}
        >
          <AddIcon />
        </button>
        <div className="flex w-1/6 items-center justify-around">
          <div className="flex mr-4 text-lg">
            <span className="rounded hover:bg-slate-300 hover:scale-110 cursor-pointer">
              <MdOutlineKeyboardArrowLeft
                onClick={() => setDate(moment(date).subtract(1, "months"))}
              />
            </span>
            <span
              className="rounded hover:bg-slate-300 hover:scale-110 duration-300 cursor-pointer"
              onClick={() => setDate(moment(date).add(1, "months"))}
            >
              <MdOutlineKeyboardArrowRight />
            </span>
          </div>
          <p className="w-10/12">{date.format("MMMM YYYY")}</p>
        </div>
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
                  <td className="py-4">{sneaker.name}</td>
                  <td>{sneaker.size}</td>
                  <td>
                    {websites?.map((website: ISite) => {
                      if (sneaker.websiteId === website._id)
                        return website.name;
                    })}
                  </td>
                  <td>{sneaker.buyingPrice} €</td>
                  <td>{dateParser(sneaker.buyingDate)}</td>
                  <td>{sneaker.sold ? "Oui" : "Non"}</td>
                  <td>
                    {sneaker.sold
                      ? resellWebsites?.map((resellWebsite: ISite) => {
                          if (sneaker.resellWebsiteId === resellWebsite._id)
                            return resellWebsite.name;
                        })
                      : ""}
                  </td>
                  <td>{sneaker.sold ? sneaker.resellPrice : ""}</td>
                  <td>{sneaker.sold ? dateParser(sneaker.sellingDate) : ""}</td>
                  <td className="flex justify-around py-4">
                    <div
                      className="cursor-pointer text-lg"
                      onClick={() => handleDeleteSneaker(sneaker._id)}
                    >
                      <FaTrash />
                      <ToastContainer />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {openFormAddSneaker && (
          <Modal setOpenModal={setOpenFormAddSneaker} type={"sneakers"} />
        )}
      </div>
    </>
  );
};

export default SneakerInventory;
