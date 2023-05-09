import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteStuff, setStuffs } from "../../../domain/usecases/stuffsSlice";
import DateSelector from "../Part/DateSelector";
import TypeSelector from "../Part/TypeSelector";
import AddButton from "../Part/AddButton";
import { ISite, IStuff } from "../../../domain/entities/Interface";
import Modal from "../Part/Modal";
import { FaTrash } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { GoCheck, GoX } from "react-icons/go";
import { dateParser } from "../Utils";
import ArrayLineSkeleton from "../Skeleton/ArrayLineSkeleton";

const StuffInventory = () => {
  const stuffs = useAppSelector(
    (state: { stuffs: { stuffs: any } }) => state.stuffs.stuffs
  );
  const websites = useAppSelector(
    (state: { websites: { websites: any } }) => state.websites.websites
  );
  const resellWebsites = useAppSelector(
    (state: { resellWebsites: { websites: any } }) =>
      state.resellWebsites.websites
  );
  const [openFormStuff, setOpenFormStuff] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  const [typeSelected, setTypeSelected] = useState<string>("buying");
  const [date, setDate] = useState(moment());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");

  const handleDeleteStuff = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}api/stuff/delete/${id}`,
    })
      .then((res) => {
        dispatch(deleteStuff(id));
        toast.success("L'objet a bien été supprimé.", {
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

  const handleUpdate = (id: string) => {
    setOpenFormStuff(!openFormStuff);
    setId(id);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_API}api/stuff/get-by-month/${typeSelected}/${month}/${year}`,
    }).then((res) => {
      dispatch(setStuffs(res.data));
      setIsLoading(false);
    });
  }, [month, year, typeSelected, dispatch]);

  const thsBuying: Array<string> = [
    "Nom",
    "Type",
    "Couleur",
    "Taille",
    "Site d'achat",
    "Prix d'achat",
    "Date d'achat",
    "Vendu",
    "Actions",
  ];

  const thsSales: Array<string> = [
    "Type",
    "Nom",
    "Couleur",
    "Taille",
    "Site de vente",
    "Prix de vente",
    "Date de vente",
    "Profit",
    "Actions",
  ];
  return (
    <>
      <TypeSelector
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
      />
      <div className="mx-12 mb-5 flex justify-between">
        <AddButton
          openForm={openFormStuff}
          setOpenForm={setOpenFormStuff}
          setId={setId}
        />
        <DateSelector date={date} setDate={setDate} />
      </div>
      <div>
        <table className="border-collapse table-auto w-11/12 text-center mx-auto">
          <thead className="bg-slate-200 rounded-lg uppercase text-xs tracking-wide">
            <tr>
              {(typeSelected === "buying" ? thsBuying : thsSales).map(
                (th: string, index: number) => {
                  return (
                    <th key={index} className="py-4 text-slate-400">
                      {th}
                    </th>
                  );
                }
              )}
            </tr>
          </thead>
          <tbody>
            {stuffs.length === 0 || isLoading ? (
              <ArrayLineSkeleton trNumber={3} tdNumber={9} />
            ) : (
              stuffs.map((stuff: IStuff, index: number) => {
                return (
                  <tr
                    key={index}
                    className="border-b text-sm text-indigo-900 font-medium"
                  >
                    <td className="py-4">{stuff?.type}</td>
                    <td className="py-4">{stuff?.description}</td>
                    <td className="py-4">{stuff?.colorway}</td>
                    <td>{stuff?.size}</td>
                    <td>
                      {typeSelected === "buying"
                        ? websites?.map((website: ISite) => {
                            if (stuff?.websiteId === website._id)
                              return website.name;
                          })
                        : resellWebsites?.map((resellWebsite: ISite) => {
                            if (stuff.resellWebsiteId === resellWebsite._id)
                              return resellWebsite.name;
                          })}
                      {}
                    </td>
                    <td>
                      {typeSelected === "buying"
                        ? stuff?.buyingPrice
                        : stuff?.resellPrice}{" "}
                      €
                    </td>
                    <td>
                      {typeSelected === "buying"
                        ? dateParser(stuff?.buyingDate)
                        : dateParser(stuff?.sellingDate)}
                    </td>
                    {typeSelected === "buying" ? (
                      <td className="py-4">
                        <div
                          className={`flex text-lg justify-center ${
                            stuff?.sold ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {stuff?.sold ? <GoCheck /> : <GoX />}
                        </div>
                      </td>
                    ) : (
                      <td
                        className={`py-4 ${
                          stuff?.resellPrice - stuff?.buyingPrice < 0
                            ? "text-red-500"
                            : stuff?.resellPrice - stuff?.buyingPrice < 20
                            ? "text-amber-500"
                            : stuff?.resellPrice - stuff?.buyingPrice < 50
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {stuff?.resellPrice - stuff?.buyingPrice} €
                      </td>
                    )}
                    <td className="flex justify-around py-4">
                      <div
                        className="cursor-pointer text-lg px-1"
                        onClick={() => stuff._id && handleUpdate(stuff._id)}
                      >
                        <BsFillPencilFill />
                      </div>
                      <div
                        className="cursor-pointer text-lg px-1"
                        onClick={() =>
                          stuff._id && handleDeleteStuff(stuff._id)
                        }
                      >
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {openFormStuff && id && (
          <Modal
            setOpenModal={setOpenFormStuff}
            model={"stuffs"}
            id={id}
            typeSelected={typeSelected}
          />
        )}
      </div>
    </>
  );
};

export default StuffInventory;
