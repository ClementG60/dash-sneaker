import axios from "axios";
import { IBrand, ISite, ISneaker } from "../../../domain/entities/Interface";
import { dateParser } from "../Utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteSneaker, setSneakers } from "../../../domain/usecases/sneakersSlice";
import { useState, useEffect } from "react";
import Modal from "../Part/Modal";
import { FaTrash } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { GoCheck, GoX } from "react-icons/go";
import moment from "moment";
import DateSelector from "../Part/DateSelector";
import TypeSelector from "../Part/TypeSelector";
import AddButton from "../Part/AddButton";
import ArrayLineSkeleton from "../Skeleton/ArrayLineSkeleton";
import SearchBar from "../Part/SearchBar";

const SneakerInventory = () => {
  //redux
  const sneakers = useAppSelector(
    (state: { sneakers: { sneakers: any } }) => state.sneakers.sneakers
  );
  const brands = useAppSelector(
    (state: { brands: { brands: any } }) => state.brands.brands
  );
  const websites = useAppSelector(
    (state: { websites: { websites: any } }) => state.websites.websites
  );
  const resellWebsites = useAppSelector(
    (state: { resellWebsites: { websites: any } }) =>
      state.resellWebsites.websites
  );
  const dispatch = useAppDispatch();

  //state
  const [openFormSneaker, setOpenFormSneaker] = useState<boolean>(false);
  const [date, setDate] = useState<moment.Moment>(moment());
  const [id, setId] = useState<string>();
  const [typeSelected, setTypeSelected] = useState<string>("buying");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);

  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");

  const thsBuying: Array<string> = [
    "Marque",
    "Modèle",
    "Coloris",
    "Taille",
    "Site d'achat",
    "Prix d'achat",
    "Date d'achat",
    "Vendu",
    "Actions",
  ];

  const thsSales: Array<string> = [
    "Marque",
    "Modèle",
    "Coloris",
    "Taille",
    "Site de vente",
    "Prix de vente",
    "Date de vente",
    "Profit",
    "Actions",
  ];

  /* fonction permettant de supprimer une paire
  @id : id de la paire à supprimer
  @return : 
    - message de succès
    - message d'erreur
  */
  const handleDeleteSneaker = (id: string) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_API}api/sneaker/delete/${id}`,
    })
      .then((res) => {
        console.log(res);
        dispatch(deleteSneaker(id));
        toast.success("La paire a bien été supprimé.", {
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
        console.log(err);
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

  /* fonction permettant de mettre à jour une paire (via modal)
  @id : id de la dépense à supprimer
  */
  const handleUpdate = (id: string) => {
    setOpenFormSneaker(!openFormSneaker);
    setId(id);
  };

  /* hook permet de récupérer les paires par mois
  @dépendence : month, year, dispatch
  @return : liste des paires
  */
  useEffect(() => {
    setIsLoading(true);
    !search &&
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_API}api/sneaker/get-by-month/${typeSelected}/${month}/${year}`,
      }).then((res) => {
        dispatch(setSneakers(res.data));
        setIsLoading(false);
      });
    search &&
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_API}api/sneaker/get`,
      }).then((res) => {
        dispatch(setSneakers(res.data));
        setIsLoading(false);
      });
  }, [month, year, typeSelected, search, dispatch]);

  return (
    <>
      <TypeSelector
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
      />
      <div className="mx-12 mb-5 flex justify-between">
        <AddButton
          openForm={openFormSneaker}
          setOpenForm={setOpenFormSneaker}
          setId={setId}
        />
        <DateSelector date={date} setDate={setDate} />
      </div>
      <div
        className="mx-12 mb-5 flex justify-end"
        onClick={() => setSearch(!search)}
      >
        <SearchBar setQuery={setQuery} />
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
            {sneakers.length === 0 || isLoading ? (
              <ArrayLineSkeleton trNumber={5} tdNumber={9} />
            ) : (
              sneakers
                .filter((sneaker: ISneaker) =>
                  sneaker.model.toLowerCase().includes(query)
                )
                .map((sneaker: ISneaker, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="border-b text-sm text-indigo-900 font-medium"
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
                        {typeSelected === "buying"
                          ? websites?.map((website: ISite) => {
                              if (sneaker?.websiteId === website._id)
                                return website.name;
                            })
                          : resellWebsites?.map((resellWebsite: ISite) => {
                              if (sneaker.resellWebsiteId === resellWebsite._id)
                                return resellWebsite.name;
                            })}
                        {}
                      </td>
                      <td>
                        {typeSelected === "buying"
                          ? sneaker?.buyingPrice
                          : sneaker?.resellPrice}{" "}
                        €
                      </td>
                      <td>
                        {typeSelected === "buying"
                          ? dateParser(sneaker?.buyingDate)
                          : dateParser(sneaker?.sellingDate)}
                      </td>
                      {typeSelected === "buying" ? (
                        <td className="py-4">
                          <div
                            className={`flex text-lg justify-center ${
                              sneaker?.sold ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {sneaker?.sold ? <GoCheck /> : <GoX />}
                          </div>
                        </td>
                      ) : (
                        <td
                          className={`py-4 ${
                            sneaker?.resellPrice - sneaker?.buyingPrice < 0
                              ? "text-red-500"
                              : sneaker?.resellPrice - sneaker?.buyingPrice < 20
                              ? "text-amber-500"
                              : sneaker?.resellPrice - sneaker?.buyingPrice < 50
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {sneaker?.resellPrice - sneaker?.buyingPrice} €
                        </td>
                      )}
                      <td className="flex justify-around py-4">
                        <div
                          className="cursor-pointer text-lg px-1"
                          onClick={() =>
                            sneaker._id && handleUpdate(sneaker._id)
                          }
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
                })
            )}
          </tbody>
        </table>
        {openFormSneaker && id && (
          <Modal
            setOpenModal={setOpenFormSneaker}
            model={"sneakers"}
            id={id}
            typeSelected={typeSelected}
          />
        )}
      </div>
    </>
  );
};

export default SneakerInventory;
